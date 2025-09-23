<?php
declare(strict_types=1);

// Debug: ghi tất cả lỗi vào file log
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-error.log');
error_reporting(E_ALL);

header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../../../config/env.php";
require_once __DIR__ . "/../../../config/db.php";
require_once __DIR__ . "/../../../utils/jwt.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

try {
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


    // Lấy dữ liệu hiện tại của user để ghi nhận các trường thay đổi
    $stmt = $pdo->prepare("SELECT username, email, phone FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    $current = $stmt->fetch(PDO::FETCH_ASSOC) ?: ["username" => null, "email" => null, "phone" => null];

    $changed = [];
    if ($username !== '' && $username !== $current['username']) { $changed['username'] = ["from" => $current['username'], "to" => $username]; }
    if ($email !== '' && $email !== $current['email'])         { $changed['email']    = ["from" => $current['email'],    "to" => $email]; }
    if ($phone !== '' && $phone !== ($current['phone'] ?? '')) { $changed['phone']    = ["from" => $current['phone'] ?? null, "to" => $phone]; }
    if ($newPassword) { $changed['password'] = true; }

    $pdo->beginTransaction();
    try {
        // Cập nhật thông tin người dùng
        if ($newPassword) {
            $passwordHash = password_hash($newPassword, PASSWORD_BCRYPT);
            $stmt = $pdo->prepare("UPDATE users SET username = ?, email = ?, phone = ?, password_hash = ? WHERE id = ?");
            $stmt->execute([$username, $email, $phone, $passwordHash, $userId]);
        } else {
            $stmt = $pdo->prepare("UPDATE users SET username = ?, email = ?, phone = ? WHERE id = ?");
            $stmt->execute([$username, $email, $phone, $userId]);
        }

        // Ghi lịch sử cập nhật 
        $nowTs = (new DateTime())->format('Y-m-d H:i:s');

        $pdo->commit();

        echo json_encode([
            "status" => "success",
            "message" => "Profile updated successfully",
            "logoutRequired" => $newPassword ? true : false,
            "user" => [
                "username" => $username,
                "email" => $email,
                "phone" => $phone,
                "last_profile_update" => $nowTs
            ]
        ]);
    } catch (Throwable $t) {
        $pdo->rollBack();
        throw $t;
    }

} catch (Throwable $e) {
    file_put_contents(__DIR__ . '/php-error.log', $e->getMessage() . "\n" . $e->getTraceAsString() . "\n\n", FILE_APPEND);

    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Server error",
        "error" => $e->getMessage()
    ]);
}


