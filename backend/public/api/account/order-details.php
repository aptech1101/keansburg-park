<?php
declare(strict_types=1);

header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . "/../../../config/env.php";
require_once __DIR__ . "/../../../config/db.php";
require_once __DIR__ . "/../../../config/jwt.php";
require_once __DIR__ . "/../../../config/jwt.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

try {
    // Xác thực JWT
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Unauthorized"]);
        exit;
    }

    $token = $matches[1];
    $decoded = JWT::decode($token, new Key($_ENV["JWT_SECRET"], 'HS256'));
    $userId = $decoded->sub ?? null;

    // Kiểm tra user ID hợp lệ
    if (!$userId) {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Invalid token"]);
        exit;
    }

    // Lấy order ID từ query string
    $orderId = $_GET['order_id'] ?? null;
    if (!$orderId) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Order ID is required"]);
        exit;
    }

    $pdo = Database::getInstance();

    // Lấy chi tiết đơn hàng
    $orderSql = "
        SELECT 
            b.id,
            b.visit_date,
            b.grand_total,
            b.status,
            COALESCE(u.full_name, b.guest_name) as full_name,
            COALESCE(u.email, b.guest_email) as email,
            COALESCE(u.phone, b.guest_phone) as phone
        FROM bookings b
        LEFT JOIN users u ON b.user_id = u.id
        WHERE b.id = ? AND b.user_id = ?
    ";

    $orderStmt = $pdo->prepare($orderSql);
    $orderStmt->execute([$orderId, $userId]);
    $order = $orderStmt->fetch(PDO::FETCH_ASSOC);

    // Kiểm tra đơn hàng tồn tại
    if (!$order) {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Order not found"]);
        exit;
    }

    // Lấy danh sách items trong đơn hàng
    $itemsSql = "
        SELECT 
            bd.id,
            bd.quantity,
            bd.unit_price,
            bd.line_total,
            t.description as ticket_name
        FROM bookingdetails bd
        JOIN tickets t ON bd.ticket_id = t.id
        WHERE bd.booking_id = ?
        ORDER BY bd.id
    ";

    $itemsStmt = $pdo->prepare($itemsSql);
    $itemsStmt->execute([$orderId]);
    $items = $itemsStmt->fetchAll(PDO::FETCH_ASSOC);

    // Lấy thông tin thanh toán
    $paymentsSql = "
        SELECT 
            id,
            amount,
            provider,
            paid_at,
            status
        FROM payments
        WHERE booking_id = ?
        ORDER BY id DESC
    ";

    $paymentsStmt = $pdo->prepare($paymentsSql);
    $paymentsStmt->execute([$orderId]);
    $payments = $paymentsStmt->fetchAll(PDO::FETCH_ASSOC);

    // Định dạng dữ liệu response
    $formattedItems = array_map(function($item) {
        return [
            'id' => (int)$item['id'],
            'ticket_name' => $item['ticket_name'],
            'quantity' => (int)$item['quantity'],
            'unit_price' => (float)$item['unit_price'],
            'line_total' => (float)$item['line_total']
        ];
    }, $items);

    $formattedPayments = array_map(function($payment) {
        return [
            'id' => (int)$payment['id'],
            'amount' => (float)$payment['amount'],
            'provider' => $payment['provider'],
            'paid_at' => $payment['paid_at'],
            'status' => $payment['status']
        ];
    }, $payments);

    // Trả về kết quả JSON
    echo json_encode([
        'status' => 'success',
        'order' => [
            'id' => (int)$order['id'],
            'order_date' => $order['visit_date'],
            'total_amount' => (float)$order['grand_total'],
            'status' => $order['status'],
            'customer' => [
                'full_name' => $order['full_name'],
                'email' => $order['email'],
                'phone' => $order['phone']
            ],
            'items' => $formattedItems,
            'payments' => $formattedPayments
        ]
    ]);

} catch (Exception $e) {
    // Xử lý lỗi server
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Server error",
        "error" => $e->getMessage()
    ]);
}
