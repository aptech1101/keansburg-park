<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../../config/env.php';
require_once __DIR__ . '/../../../config/db.php';
require_once __DIR__ . '/../../../middleware/auth.php';

$pdo = Database::getInstance();

// ⚡ Chỉ admin mới được phép
checkAdmin();

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'GET':
            handleGetMessages($pdo);
            break;
        case 'DELETE':
            handleDeleteMessage($pdo);
            break;
        default:
            http_response_code(405);
            echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

function handleGetMessages($pdo) {
    $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
    $limit = isset($_GET['limit']) ? max(1, intval($_GET['limit'])) : 10;
    $search = $_GET['search'] ?? '';

    $offset = ($page - 1) * $limit;

    // Build WHERE clause
    $whereConditions = [];
    $params = [];

    if ($search) {
        $whereConditions[] = "(m.name LIKE :search OR m.email LIKE :search OR m.subject LIKE :search)";
        $params[':search'] = "%$search%";
    }

    $whereClause = $whereConditions ? 'WHERE ' . implode(' AND ', $whereConditions) : '';

    // Count total
    $countSql = "SELECT COUNT(*) as total FROM messages m $whereClause";
    $countStmt = $pdo->prepare($countSql);
    $countStmt->execute($params);
    $total = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Get messages
    $sql = "SELECT m.* 
            FROM messages m
            $whereClause 
            ORDER BY m.created_at DESC 
            LIMIT :limit OFFSET :offset";

    $stmt = $pdo->prepare($sql);
    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'status' => 'success',
        'data' => $messages,
        'total' => $total,
        'page' => $page,
        'limit' => $limit
    ]);
}

function handleDeleteMessage($pdo) {
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if (!$id) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Missing message ID']);
        return;
    }

    $sql = "DELETE FROM messages WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Message deleted successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Failed to delete message']);
    }
}
