<?php
declare(strict_types=1);

header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../../../config/env.php";
require_once __DIR__ . "/../../../config/db.php";
require_once __DIR__ . "/../../../config/jwt.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["email"], $data["password"])) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing email or password"]);
        exit;
    }

    $email    = trim($data["email"]);
    $password = $data["password"];

    $pdo = Database::getInstance();
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? LIMIT 1");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, $user["password_hash"])) {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
        exit;
    }

    // Create JWT
    $payload = [
        "iss" => "your-app",
        "iat" => time(),
        "exp" => time() + 3600,
        "sub" => $user["user_id"],
        "email" => $user["email"]
    ];
    $token = JWT::encode($payload, $_ENV["JWT_SECRET"], "HS256");

    echo json_encode([
        "status"  => "success",
        "message" => "Login successful",
        "token"   => $token,
        "user"    => [
            "user_id"  => (int) $user["user_id"],
            "email"    => $user["email"],
            "username" => $user["username"],
            "role"     => $user["role"] ?? "member"
        ]
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Server error", "error" => $e->getMessage()]);
}
