<?php
declare(strict_types=1);
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../../../config/env.php";
require_once __DIR__ . "/../../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);
$email = trim($data['email'] ?? '');

if (!$email) {
    http_response_code(400);
    echo json_encode(["status"=>"error","message"=>"Email is required"]);
    exit;
}

$pdo = Database::getInstance();
$stmt = $pdo->prepare("SELECT id, username FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    echo json_encode(["status"=>"error","message"=>"This email is not registered"]);
    exit;
}

// Email tồn tại → tạo token & expiry
$token = bin2hex(random_bytes(32));
$expires = date("Y-m-d H:i:s", time() + 3600); // 1 giờ
$stmt = $pdo->prepare("UPDATE users SET reset_token = ?, reset_expires = ? WHERE id = ?");
$stmt->execute([$token, $expires, $user['id']]);

// Trả link trực tiếp để demo (không gửi email)
$resetLink = $_ENV['APP_URL'] . "/reset-password?token=$token";

echo json_encode([
    "status" => "success",
    "message" => "Please check your email to confirm your password reset.",
    "link" => $resetLink
]);
