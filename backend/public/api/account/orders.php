<?php
declare(strict_types=1);

header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . "/../../../config/env.php";
require_once __DIR__ . "/../../../config/db.php";
require_once __DIR__ . "/../../../utils/jwt.php";

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

    $pdo = Database::getInstance();

    // Lấy tham số filter từ query string
    $startDate = $_GET['start_date'] ?? null;
    $endDate = $_GET['end_date'] ?? null;
    $status = $_GET['status'] ?? null;
    $page = max(1, (int)($_GET['page'] ?? 1));
    $limit = min(50, max(1, (int)($_GET['limit'] ?? 10)));
    $offset = ($page - 1) * $limit;

    // Xây dựng điều kiện WHERE
    $whereConditions = ["b.user_id = ?"];
    $params = [$userId];

    if ($startDate) {
        $whereConditions[] = "DATE(b.visit_date) >= ?";
        $params[] = $startDate;
    }

    if ($endDate) {
        $whereConditions[] = "DATE(b.visit_date) <= ?";
        $params[] = $endDate;
    }

    if ($status) {
        $whereConditions[] = "b.status = ?";
        $params[] = $status;
    }

    $whereClause = implode(" AND ", $whereConditions);

    // Đếm tổng số đơn hàng
    $countSql = "SELECT COUNT(*) FROM bookings b WHERE $whereClause";
    $countStmt = $pdo->prepare($countSql);
    $countStmt->execute($params);
    $totalOrders = $countStmt->fetchColumn();

    // Lấy danh sách đơn hàng với phân trang
    $sql = "
        SELECT 
            b.id,
            b.visit_date,
            b.grand_total,
            b.status,
            COUNT(bd.id) AS item_count,
            GROUP_CONCAT(t.description SEPARATOR ', ') AS ticket_names
        FROM bookings b
        LEFT JOIN bookingdetails bd ON b.id = bd.booking_id
        LEFT JOIN tickets t ON bd.ticket_id = t.id
        WHERE $whereClause
        GROUP BY b.id, b.visit_date, b.grand_total, b.status
        ORDER BY b.visit_date DESC
        LIMIT $limit OFFSET $offset
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Định dạng dữ liệu đơn hàng
    $formattedOrders = array_map(function($order) {
        return [
            'id'          => (int)$order['id'],
            'order_date'  => $order['visit_date'],
            'total_amount'=> (float)$order['grand_total'],
            'status'      => $order['status'],
            'item_count'  => (int)$order['item_count'],
            'ticket_names'=> $order['ticket_names'] ?: 'No items'
        ];
    }, $orders);

    // Trả về kết quả JSON
    echo json_encode([
        'status' => 'success',
        'orders' => $formattedOrders,
        'pagination' => [
            'current_page' => $page,
            'per_page' => $limit,
            'total_orders' => (int)$totalOrders,
            'total_pages' => ceil($totalOrders / $limit)
        ],
        'filters' => [
            'start_date' => $startDate,
            'end_date'   => $endDate,
            'status'     => $status
        ]
    ]);

} catch (Exception $e) {
    // Xử lý lỗi server
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Server error",
        "error" => $e->getMessage(),
        "file" => $e->getFile(),
        "line" => $e->getLine()
    ]);
}
