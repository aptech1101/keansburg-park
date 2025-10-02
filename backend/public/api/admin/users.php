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

// ✅ Verify admin authentication
checkAdmin();

$pdo = Database::getInstance();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // --- Chi tiết user ---
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);

        $sql = "SELECT id, username, full_name, email, phone, role, is_active, created_at, updated_at
                FROM users 
                WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "User not found"]);
            exit;
        }

        echo json_encode(["status" => "success", "data" => $user]);
        exit;
    }

    // --- Danh sách user ---
    $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 20;
    $offset = ($page - 1) * $limit;

    $search = isset($_GET['search']) ? $_GET['search'] : '';
    $role   = isset($_GET['role']) ? $_GET['role'] : '';
    $active = isset($_GET['is_active']) ? $_GET['is_active'] : '';

    $where = " WHERE 1=1 ";
    $params = [];

    if ($search !== '') {
        $where .= " AND (full_name LIKE :search OR email LIKE :search OR username LIKE :search OR phone LIKE :search) ";
        $params[':search'] = "%$search%";
    }

    if ($role !== '') {
        $where .= " AND role = :role ";
        $params[':role'] = $role;
    }

    if ($active !== '') {
        $where .= " AND is_active = :active ";
        $params[':active'] = intval($active);
    }

    // Tổng
    $countSql = "SELECT COUNT(*) as total FROM users $where";
    $stmt = $pdo->prepare($countSql);
    foreach ($params as $k => $v) {
        $stmt->bindValue($k, $v);
    }
    $stmt->execute();
    $total = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Danh sách
    $sql = "SELECT id, username, full_name, email, phone, role, is_active, created_at, updated_at
            FROM users
            $where
            ORDER BY created_at DESC
            LIMIT :limit OFFSET :offset";
    $stmt = $pdo->prepare($sql);

    foreach ($params as $k => $v) {
        $stmt->bindValue($k, $v);
    }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);

    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "data" => $users,
        "total" => $total,
        "per_page" => $limit,
        "current_page" => $page
    ]);
    exit;
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (empty($data['email']) || empty($data['password']) || empty($data['full_name'])) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing required fields"]);
        exit;
    }

    // Băm mật khẩu
    $passwordHash = password_hash($data['password'], PASSWORD_BCRYPT);

    $sql = "INSERT INTO users (username, full_name, email, phone, password_hash, role, is_active)
            VALUES (:username, :full_name, :email, :phone, :password_hash, :role, :is_active)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':username', $data['username'] ?? null, PDO::PARAM_STR);
    $stmt->bindValue(':full_name', $data['full_name'], PDO::PARAM_STR);
    $stmt->bindValue(':email', $data['email'], PDO::PARAM_STR);
    $stmt->bindValue(':phone', $data['phone'] ?? null, PDO::PARAM_STR);
    $stmt->bindValue(':password_hash', $passwordHash, PDO::PARAM_STR);
    $stmt->bindValue(':role', $data['role'] ?? 'user', PDO::PARAM_STR);
    $stmt->bindValue(':is_active', isset($data['is_active']) ? intval($data['is_active']) : 1, PDO::PARAM_INT);

    try {
        $stmt->execute();
        $newId = $pdo->lastInsertId();
        echo json_encode(["status" => "success", "message" => "User created", "id" => $newId]);
    } catch (PDOException $e) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
    exit;
}

if ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = intval($data['id']);

    $sql = "UPDATE users 
            SET full_name = :full_name,
                phone = :phone,
                role = :role,
                is_active = :is_active,
                updated_at = NOW()
            WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':full_name', $data['full_name'], PDO::PARAM_STR);
    $stmt->bindParam(':phone', $data['phone'], PDO::PARAM_STR);
    $stmt->bindParam(':role', $data['role'], PDO::PARAM_STR);
    $stmt->bindParam(':is_active', $data['is_active'], PDO::PARAM_INT);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode(["status" => "success", "message" => "User updated"]);
    exit;
}

if ($method === 'DELETE') {
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing id"]);
        exit;
    }

    $id = intval($_GET['id']);
    $sql = "DELETE FROM users WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode(["status" => "success", "message" => "User deleted"]);
    exit;
}
