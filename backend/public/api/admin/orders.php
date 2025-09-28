<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../../config/env.php';
require_once __DIR__ . '/../../../config/db.php';
require_once __DIR__ . '/../../../middleware/auth.php';

// Verify admin authentication
checkAdmin();

$pdo = Database::getInstance();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Nếu có id => chi tiết đơn
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);

        // Thông tin đơn
        $sql = "SELECT b.*, u.full_name, u.email, u.phone
                FROM bookings b
                LEFT JOIN users u ON b.user_id = u.id
                WHERE b.id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $order = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$order) {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Order not found"]);
            exit;
        }

        // Chi tiết vé trong đơn
        $sql = "SELECT bd.*, t.description 
                FROM bookingdetails bd
                JOIN tickets t ON bd.ticket_id = t.id
                WHERE bd.booking_id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $order['items'] = $items;

        echo json_encode(["status" => "success", "data" => $order]);
        exit;
    }

    // Nếu không có id => danh sách đơn
    $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 20;
    $offset = ($page - 1) * $limit;

    $status = isset($_GET['status']) ? $_GET['status'] : '';
    $search = isset($_GET['search']) ? $_GET['search'] : '';
    $dateFrom = isset($_GET['date_from']) ? $_GET['date_from'] : '';
    $dateTo = isset($_GET['date_to']) ? $_GET['date_to'] : '';

    // Base query
    $where = " WHERE 1=1 ";
    $params = [];

    if ($status !== '') {
        $where .= " AND b.status = :status ";
        $params[':status'] = $status;
    }

    if ($search !== '') {
        $where .= " AND (b.booking_code LIKE :search OR u.email LIKE :search OR u.full_name LIKE :search) ";
        $params[':search'] = "%$search%";
    }

    if ($dateFrom !== '') {
        $where .= " AND DATE(b.created_at) >= :dateFrom ";
        $params[':dateFrom'] = $dateFrom;
    }

    if ($dateTo !== '') {
        $where .= " AND DATE(b.created_at) <= :dateTo ";
        $params[':dateTo'] = $dateTo;
    }

    // Đếm tổng
    $countSql = "SELECT COUNT(*) as total
                 FROM bookings b
                 LEFT JOIN users u ON b.user_id = u.id
                 $where";
    $stmt = $pdo->prepare($countSql);
    foreach ($params as $k => $v) {
        $stmt->bindValue($k, $v);
    }
    $stmt->execute();
    $total = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Lấy danh sách
    $sql = "SELECT b.id, b.booking_code, u.full_name, b.subtotal, b.status, b.created_at
            FROM bookings b
            LEFT JOIN users u ON b.user_id = u.id
            $where
            ORDER BY b.created_at DESC
            LIMIT :limit OFFSET :offset";
    $stmt = $pdo->prepare($sql);

    foreach ($params as $k => $v) {
        $stmt->bindValue($k, $v);
    }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);

    $stmt->execute();
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "data" => $orders,
        "pagination" => [
            "page" => $page,
            "limit" => $limit,
            "total" => $total,
            "total_pages" => ceil($total / $limit)
        ]
    ]);
}

if ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = intval($data['id']);
    $status = $data['status'];

    $sql = "UPDATE bookings SET status = :status WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':status', $status, PDO::PARAM_STR);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode(["status" => "success", "message" => "Order updated"]);
}
?>
