<?php
declare(strict_types=1);

header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../../../config/env.php";
require_once __DIR__ . "/../../../config/db.php";
require_once __DIR__ . "/../../../config/jwt.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

try {
    // Lấy token từ header Authorization: Bearer <token>
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Unauthorized"]);
        exit;
    }

    $token = $matches[1];
    $decoded = JWT::decode($token, new Key($_ENV["JWT_SECRET"], 'HS256'));
    $userId = $decoded->sub ?? null;

    if (!$userId) {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Invalid token"]);
        exit;
    }

    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid request"]);
        exit;
    }

    $username = trim($data["username"] ?? "");
    $email = trim($data["email"] ?? "");
    $phone = trim($data["phone"] ?? "");
    $newPassword = $data["password"] ?? "";

    if (!$username || !$email) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Username and email are required"]);
        exit;
    }

    $pdo = Database::getInstance();

    // Kiểm tra email trùng với user khác
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ? AND id != ?");
    $stmt->execute([$email, $userId]);
    if ($stmt->fetch()) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Email already in use"]);
        exit;
    }

    if ($newPassword) {
        $passwordHash = password_hash($newPassword, PASSWORD_BCRYPT);
        $stmt = $pdo->prepare("UPDATE users SET username = ?, email = ?, phone = ?, password_hash = ? WHERE id = ?");
        $stmt->execute([$username, $email, $phone, $passwordHash, $userId]);
    } else {
        $stmt = $pdo->prepare("UPDATE users SET username = ?, email = ?, phone = ? WHERE id = ?");
        $stmt->execute([$username, $email, $phone, $userId]);
    }

    echo json_encode([
        "status" => "success",
        "message" => "Profile updated successfully",
        "logoutRequired" => $newPassword ? true : false
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Server error",
        "error" => $e->getMessage()
    ]);
}
