<?php
// backend/public/api/bookings/create.php
declare(strict_types=1);

require_once __DIR__ . '/../_cors.php';
require_once __DIR__ . '/../../../config/db.php';

function send_json($data, int $status = 200): void {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}

if (strtoupper($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    send_json(['error' => 'Method Not Allowed'], 405);
    exit;
}

/** @var PDO|null $pdo */
$pdo = $GLOBALS['pdo'] ?? null;
if (!$pdo) {
    send_json(['ok' => false, 'error' => 'Database connection failed'], 500);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true) ?: [];
$orderCode = trim((string)($input['orderCode'] ?? ''));
$customer = (array)($input['customer'] ?? []);
$cart = (array)($input['cart'] ?? []);

$idemKey = trim((string)($_SERVER['HTTP_IDEMPOTENCY_KEY'] ?? ''));
if ($idemKey === '') {
    send_json(['ok' => false, 'error' => 'Missing Idempotency-Key header'], 400);
    exit;
}

$name = trim((string)($customer['name'] ?? ''));
$email = trim((string)($customer['email'] ?? ''));
$phone = trim((string)($customer['phone'] ?? ''));
$visitDate = trim((string)($customer['visitDate'] ?? ''));

if ($orderCode === '' || $name === '' || $email === '' || $visitDate === '') {
    send_json(['ok' => false, 'error' => 'Missing required fields'], 422);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    send_json(['ok' => false, 'error' => 'Invalid email'], 422);
    exit;
}
if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $visitDate)) {
    send_json(['ok' => false, 'error' => 'Invalid visitDate'], 422);
    exit;
}

// Handle idempotency: return existing booking if same key
$stmt = $pdo->prepare('SELECT * FROM bookings WHERE idempotency_key = :idem LIMIT 1');
$stmt->execute([':idem' => $idemKey]);
$existing = $stmt->fetch(PDO::FETCH_ASSOC);
if ($existing) {
    // Fetch details with zone_code
    $stmt2 = $pdo->prepare('SELECT bd.*, z.code AS zone_code
        FROM bookingdetails bd
        INNER JOIN tickets t ON t.id = bd.ticket_id
        INNER JOIN zones z ON z.id = t.zone_id
        WHERE bd.booking_id = :bid
        ORDER BY bd.id ASC');
    $stmt2->execute([':bid' => (int)$existing['id']]);
    $details = $stmt2->fetchAll(PDO::FETCH_ASSOC);
    send_json(['ok' => true, 'booking' => $existing, 'details' => $details, 'idempotent' => true]);
    exit;
}

// Load zone->ticket pricing
$zoneStmt = $pdo->query('SELECT t.id as ticket_id, z.code as zone_code, t.weekday_price, t.weekend_price
  FROM tickets t INNER JOIN zones z ON z.id = t.zone_id WHERE t.is_active = 1');
$zoneRows = $zoneStmt->fetchAll(PDO::FETCH_ASSOC);
$zonePricing = [];
foreach ($zoneRows as $r) {
    $zonePricing[strtoupper((string)$r['zone_code'])] = [
        'ticket_id' => (int)$r['ticket_id'],
        'weekday' => (float)$r['weekday_price'],
        'weekend' => (float)$r['weekend_price'],
    ];
}

$isWeekend = function (string $iso): bool {
    $ts = strtotime($iso);
    if ($ts === false) return false;
    $d = (int)date('w', $ts); // 0 Sun, 6 Sat
    return $d === 0 || $d === 6;
};

// Normalize cart
$normCart = [];
foreach ($cart as $item) {
    $zoneCode = strtoupper((string)($item['zoneCode'] ?? ''));
    $vdate = trim((string)($item['visitDate'] ?? ''));
    $qty = (int)($item['quantity'] ?? 0);
    if ($zoneCode === '' || $vdate === '' || $qty <= 0) continue;
    if (!isset($zonePricing[$zoneCode])) continue;
    $normCart[] = [
        'zoneCode' => $zoneCode,
        'visitDate' => $vdate,
        'quantity' => $qty,
    ];
}
if (count($normCart) === 0) {
    send_json(['ok' => false, 'error' => 'Empty cart'], 422);
    exit;
}

// Compute totals
$totalQty = 0;
$subtotal = 0.0;
$lines = [];
foreach ($normCart as $it) {
    $totalQty += $it['quantity'];
    $pricing = $zonePricing[$it['zoneCode']];
    $unit = $isWeekend($it['visitDate']) ? $pricing['weekend'] : $pricing['weekday'];
    $lineTotal = $unit * $it['quantity'];
    $lines[] = $lineTotal;
    $subtotal += $lineTotal;
}
// Group discount: >=10 -> 10%
$discount = ($totalQty >= 10) ? ($subtotal * 0.10) : 0.0;
$grand = $subtotal - $discount;

// Persist within transaction
$pdo->beginTransaction();
try {
    // Insert booking
    // booking_code column is VARCHAR(20); ensure we don't exceed
    $bookingCodeDb = substr($orderCode, 0, 20);

    $stmt = $pdo->prepare('INSERT INTO bookings (booking_code, user_id, guest_token, guest_name, guest_email, guest_phone, visit_date, subtotal, discount_total, grand_total, currency, status, payment_method, idempotency_key)
      VALUES (:code, NULL, NULL, :gname, :gemail, :gphone, :vdate, :subtotal, :discount, :grand, :curr, :status, :paym, :idem)');
    $stmt->execute([
        ':code' => $bookingCodeDb,
        ':gname' => $name,
        ':gemail' => $email,
        ':gphone' => $phone ?: null,
        ':vdate' => $visitDate,
        ':subtotal' => $subtotal,
        ':discount' => $discount,
        ':grand' => $grand,
        ':curr' => 'USD',
        ':status' => 'PAID',
        ':paym' => 'OFFLINE',
        ':idem' => $idemKey,
    ]);
    $bookingId = (int)$pdo->lastInsertId();

    // Detail sequences per zone
    $seqPark = 1000;
    $seqWater = 2000;
    $seqOther = 1000;

    // Insert booking details and generate ticket codes
    foreach ($normCart as $it) {
        $zoneCode = $it['zoneCode'];
        $ticket = $zonePricing[$zoneCode];
        $unit = $isWeekend($it['visitDate']) ? $ticket['weekend'] : $ticket['weekday'];

        // effective discount rate distributed equally when threshold met
        $discountRate = ($totalQty >= 10) ? 10.00 : 0.00; // percent

        for ($i = 0; $i < $it['quantity']; $i++) {
            // ticket code YYMMDD-SEQ
            $ts = strtotime($it['visitDate']);
            $yymmdd = $ts ? date('ymd', $ts) : date('ymd');
            if ($zoneCode === 'PARK') {
                $seq = $seqPark++;
            } elseif ($zoneCode === 'WATER') {
                $seq = $seqWater++;
            } else {
                $seq = $seqOther++;
            }
            $ticketCode = $yymmdd . '-' . $seq;

            $lineTotal = $unit * 1 * (1 - ($discountRate / 100));

            $stmt = $pdo->prepare('INSERT INTO bookingdetails (booking_id, ticket_id, using_date, quantity, unit_price, discount_rate, line_total, ticket_code)
              VALUES (:bid, :tid, :udate, :qty, :unit, :dr, :ltotal, :tcode)');
            $stmt->execute([
                ':bid' => $bookingId,
                ':tid' => $ticket['ticket_id'],
                ':udate' => $it['visitDate'],
                ':qty' => 1,
                ':unit' => $unit,
                ':dr' => $discountRate,
                ':ltotal' => $lineTotal,
                ':tcode' => $ticketCode,
            ]);
        }
    }

    // Payment (success)
    $stmt = $pdo->prepare('INSERT INTO payments (booking_id, amount, provider, paid_at, status) VALUES (:bid, :amt, :prov, :paid, :status)');
    $stmt->execute([
        ':bid' => $bookingId,
        ':amt' => $grand,
        ':prov' => 'CASH',
        ':paid' => date('Y-m-d H:i:s'),
        ':status' => 'SUCCESS',
    ]);

    $pdo->commit();

    // Return booking with details
    $bStmt = $pdo->prepare('SELECT * FROM bookings WHERE id = :id');
    $bStmt->execute([':id' => $bookingId]);
    $bookingRow = $bStmt->fetch(PDO::FETCH_ASSOC);
    $dStmt = $pdo->prepare('SELECT bd.*, z.code AS zone_code
        FROM bookingdetails bd
        INNER JOIN tickets t ON t.id = bd.ticket_id
        INNER JOIN zones z ON z.id = t.zone_id
        WHERE bd.booking_id = :id
        ORDER BY bd.id ASC');
    $dStmt->execute([':id' => $bookingId]);
    $detailRows = $dStmt->fetchAll(PDO::FETCH_ASSOC);

    send_json(['ok' => true, 'booking' => $bookingRow, 'details' => $detailRows]);
} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    send_json(['ok' => false, 'error' => 'Failed to create booking', 'message' => $e->getMessage()], 500);
}


