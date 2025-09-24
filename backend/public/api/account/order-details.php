<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/../../../config/env.php';
require_once __DIR__ . '/../../../config/db.php';
require_once __DIR__ . '/../../../config/jwt.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

try {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
        exit;
    }

    $token = $matches[1];
    $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'] ?? JWT_SECRET, 'HS256'));
    $userId = $decoded->sub ?? null;
    if (!$userId) {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Invalid token']);
        exit;
    }

    $orderId = isset($_GET['order_id']) ? (int)$_GET['order_id'] : 0;
    if ($orderId <= 0) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Order ID is required']);
        exit;
    }

    /** @var PDO|null $pdo */
    $pdo = $GLOBALS['pdo'] ?? null;
    if (!$pdo) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
        exit;
    }

    $orderSql = "
        SELECT 
            b.id,
            b.visit_date,
            b.grand_total,
            b.status,
            COALESCE(u.full_name, b.guest_name) AS full_name,
            COALESCE(u.email, b.guest_email) AS email,
            COALESCE(u.phone, b.guest_phone) AS phone
        FROM bookings b
        LEFT JOIN users u ON b.user_id = u.id
        WHERE b.id = ? AND b.user_id = ?
    ";
    $orderStmt = $pdo->prepare($orderSql);
    $orderStmt->execute([$orderId, $userId]);
    $order = $orderStmt->fetch(PDO::FETCH_ASSOC);

    if (!$order) {
        http_response_code(404);
        echo json_encode(['status' => 'error', 'message' => 'Order not found']);
        exit;
    }

    $itemsSql = "
        SELECT 
            bd.id,
            bd.quantity,
            bd.unit_price,
            bd.line_total,
            t.description AS ticket_name
        FROM bookingdetails bd
        JOIN tickets t ON bd.ticket_id = t.id
        WHERE bd.booking_id = ?
        ORDER BY bd.id
    ";
    $itemsStmt = $pdo->prepare($itemsSql);
    $itemsStmt->execute([$orderId]);
    $items = $itemsStmt->fetchAll(PDO::FETCH_ASSOC);

    $paymentsSql = "
        SELECT id, amount, provider, paid_at, status
        FROM payments
        WHERE booking_id = ?
        ORDER BY id DESC
    ";
    $paymentsStmt = $pdo->prepare($paymentsSql);
    $paymentsStmt->execute([$orderId]);
    $payments = $paymentsStmt->fetchAll(PDO::FETCH_ASSOC);

    $formattedItems = array_map(function($item) {
        return [
            'id' => (int)$item['id'],
            'ticket_name' => $item['ticket_name'],
            'quantity' => (int)$item['quantity'],
            'unit_price' => (float)$item['unit_price'],
            'line_total' => (float)$item['line_total'],
        ];
    }, $items);

    $formattedPayments = array_map(function($payment) {
        return [
            'id' => (int)$payment['id'],
            'amount' => (float)$payment['amount'],
            'provider' => $payment['provider'],
            'paid_at' => $payment['paid_at'],
            'status' => $payment['status'],
        ];
    }, $payments);

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
                'phone' => $order['phone'],
            ],
            'items' => $formattedItems,
            'payments' => $formattedPayments,
        ],
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Server error', 'error' => $e->getMessage()]);
}


