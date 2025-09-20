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

// Verify admin authentication
checkAdmin();

$config = require __DIR__ . '/../../config/config.php';
$pdo = new PDO(
    "mysql:host={$config['db']['host']};port={$config['db']['port']};dbname={$config['db']['name']};charset={$config['db']['charset']}",
    $config['db']['user'],
    $config['db']['pass'],
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);

try {
    $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
    $limit = isset($_GET['limit']) ? max(1, intval($_GET['limit'])) : 10;
    $offset = ($page - 1) * $limit;

    $search = isset($_GET['search']) ? $_GET['search'] : null;

    $sql = "SELECT f.id, f.name, f.email, f.rating, f.message, f.status, f.created_at,
                   u.username
            FROM feedbacks f
            LEFT JOIN users u ON f.created_by = u.id
            WHERE 1=1";

    $params = [];
    if ($search) {
        $sql .= " AND (f.name LIKE :search OR f.email LIKE :search)";
        $params[':search'] = "%$search%";
    }

    $sql .= " ORDER BY f.created_at DESC LIMIT :limit OFFSET :offset";

    $stmt = $pdo->prepare($sql);

    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value, PDO::PARAM_STR);
    }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);

    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Lấy tổng số feedback (phục vụ phân trang)
    $countSql = "SELECT COUNT(*) FROM feedbacks f LEFT JOIN users u ON f.created_by = u.id WHERE 1=1";
    if ($search) {
        $countSql .= " AND (f.name LIKE :search OR f.email LIKE :search)";
    }
    
    $countStmt = $pdo->prepare($countSql);
    if ($search) {
        $countStmt->bindValue(':search', "%$search%", PDO::PARAM_STR);
    }
    $countStmt->execute();
    $total = $countStmt->fetchColumn();

    echo json_encode([
        'status' => 'success',
        'data' => $data,
        'total' => $total,
        'page' => $page,
        'limit' => $limit
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>