<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../middleware/auth.php';

$config = require __DIR__ . '/../../config/config.php';
$pdo = new PDO(
    "mysql:host={$config['db']['host']};port={$config['db']['port']};dbname={$config['db']['name']};charset={$config['db']['charset']}",
    $config['db']['user'],
    $config['db']['pass'],
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);

// Verify admin authentication
checkAdmin();

try {
    $response = [];

    // Basic counts
    $stmt = $pdo->query("SELECT COUNT(*) as total_users FROM users");
    $response['total_users'] = $stmt->fetch(PDO::FETCH_ASSOC)['total_users'];

    $stmt = $pdo->query("SELECT COUNT(*) as total_bookings FROM bookings");
    $response['total_bookings'] = $stmt->fetch(PDO::FETCH_ASSOC)['total_bookings'];

    $stmt = $pdo->query("SELECT SUM(quantity) as total_tickets_sold FROM bookingdetails");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $response['total_tickets_sold'] = $result['total_tickets_sold'] ?? 0;

    $stmt = $pdo->query("SELECT SUM(amount) as total_revenue FROM payments WHERE status='SUCCESS'");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $response['total_revenue'] = $result['total_revenue'] ?? 0;

    // Feedback counts
    $stmt = $pdo->query("SELECT COUNT(*) as total_feedbacks FROM feedbacks");
    $response['total_feedbacks'] = $stmt->fetch(PDO::FETCH_ASSOC)['total_feedbacks'];

    $stmt = $pdo->query("SELECT COUNT(*) as pending_feedbacks FROM feedbacks WHERE status='pending'");
    $response['pending_feedbacks'] = $stmt->fetch(PDO::FETCH_ASSOC)['pending_feedbacks'];

    $stmt = $pdo->query("SELECT COUNT(*) as approved_feedbacks FROM feedbacks WHERE status='approved'");
    $response['approved_feedbacks'] = $stmt->fetch(PDO::FETCH_ASSOC)['approved_feedbacks'];

    $stmt = $pdo->query("SELECT COUNT(*) as rejected_feedbacks FROM feedbacks WHERE status='rejected'");
    $response['rejected_feedbacks'] = $stmt->fetch(PDO::FETCH_ASSOC)['rejected_feedbacks'];

    // Revenue by month (last 6 months)
    $stmt = $pdo->query("
        SELECT 
            DATE_FORMAT(p.created_at, '%Y-%m') as month,
            SUM(p.amount) as revenue
        FROM payments p 
        WHERE p.status = 'SUCCESS' 
        AND p.created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
        GROUP BY DATE_FORMAT(p.created_at, '%Y-%m')
        ORDER BY month ASC
    ");
    $revenueData = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Fill missing months with 0
    $months = [];
    for ($i = 5; $i >= 0; $i--) {
        $month = date('Y-m', strtotime("-$i month"));
        $months[] = $month;
    }
    
    $revenueByMonth = [];
    foreach ($months as $month) {
        $found = false;
        foreach ($revenueData as $data) {
            if ($data['month'] === $month) {
                $revenueByMonth[] = [
                    'month' => date('M Y', strtotime($month . '-01')),
                    'revenue' => floatval($data['revenue'])
                ];
                $found = true;
                break;
            }
        }
        if (!$found) {
            $revenueByMonth[] = [
                'month' => date('M Y', strtotime($month . '-01')),
                'revenue' => 0
            ];
        }
    }
    $response['revenue_by_month'] = $revenueByMonth;

    // Bookings by status
    $stmt = $pdo->query("
        SELECT 
            status,
            COUNT(*) as value
        FROM bookings 
        GROUP BY status
    ");
    $bookingsByStatus = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response['bookings_by_status'] = array_map(function($item) {
        return [
            'name' => ucfirst(strtolower($item['status'])),
            'value' => intval($item['value'])
        ];
    }, $bookingsByStatus);

    // Feedbacks by status
    $stmt = $pdo->query("
        SELECT 
            status,
            COUNT(*) as value
        FROM feedbacks 
        GROUP BY status
    ");
    $feedbacksByStatus = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response['feedbacks_by_status'] = array_map(function($item) {
        return [
            'name' => ucfirst($item['status']),
            'value' => intval($item['value'])
        ];
    }, $feedbacksByStatus);

    // Recent bookings (last 10)
    $stmt = $pdo->query("
        SELECT 
            b.id,
            b.booking_code,
            b.guest_name,
            b.guest_email,
            b.visit_date,
            b.grand_total,
            b.status,
            b.created_at,
            u.username,
            u.email
        FROM bookings b
        LEFT JOIN users u ON b.user_id = u.id
        ORDER BY b.created_at DESC
        LIMIT 10
    ");
    $response['recent_bookings'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'status' => 'success',
        'data' => $response
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>