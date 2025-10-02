<?php
declare(strict_types=1);
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../../../config/env.php";
require_once __DIR__ . "/../../../config/db.php";
require_once __DIR__ . "/../../../utils/jwt.php";

use Firebase\JWT\JWT;

$data = json_decode(file_get_contents("php://input"), true);

$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$remember = isset($data['remember']) ? (bool)$data['remember'] : false; // xử lý remember

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
    echo json_encode(["status" => "error", "message" => "Incorrect username or password"]);
    exit;
}

if (!password_verify($password, $user['password_hash'])) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Incorrect username or password"]);
    exit;
}

// Tạo JWT với thời gian sống dựa trên remember
$exp = $remember ? time() + 60*60*24*30 : time() + 60*60*24*7; // 30 ngày nếu remember = true, 7 ngày nếu false

$payload = [
    "sub" => $user['id'],
    "username" => $user['username'],
    "role" => $user['role'] ?? 'user',
    "iat" => time(),
    "exp" => $exp,
];

$token = JWT::encode($payload, JWT_SECRET, 'HS256');

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