<?php
declare(strict_types=1);
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../../../config/env.php";
require_once __DIR__ . "/../../../config/db.php";
require_once __DIR__ . "/../../../config/jwt.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$data = json_decode(file_get_contents("php://input"), true);

$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

if (!$email || !$password) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Email and password required"]);
    exit;
}

$pdo = Database::getInstance();

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Email không tồn tại"]);
    exit;
}

if (!password_verify($password, $user['password_hash'])) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Mật khẩu sai"]);
    exit;
}

// Tạo JWT
$payload = [
    "sub" => $user['id'],
    "username" => $user['username'],
    "role" => $user['role'] ?? 'user',
    "iat" => time(),
    "exp" => time() + 60*60*24*7, // 7 ngày
];


$token = JWT::encode($payload, $_ENV["JWT_SECRET"], 'HS256');

// Trả về JSON
echo json_encode([
    "status" => "success",
    "token" => $token,
    "user" => [
        "id" => (int)$user['id'],
        "username" => $user['username'],
        "email" => $user['email'],
        "phone" => $user['phone'] ?? null,
        "role" => $user['role'] ?? 'user',
        "lastProfileUpdate" => null
    ]
]);
