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

    if (
        !isset($data["email"], $data["password"], $data["fullName"],
        $data["dob"], $data["gender"])
    ) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing required fields"]);
        exit;
    }

    $email    = trim($data["email"]);
    $password = $data["password"];
    $fullName = trim($data["fullName"]);
    $dob      = $data["dob"];
    $gender   = $data["gender"];
    $phone    = $data["phone"] ?? "";

    $pdo = Database::getInstance();

    // Check if email exists
    $stmt = $pdo->prepare("SELECT user_id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Email already registered"]);
        exit;
    }

    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    $username = explode("@", $email)[0]; 
    $stmt = $pdo->prepare(
        "INSERT INTO users (username, full_name, date_of_birth, gender, email, phone, password_hash, role)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    );
    $username = explode("@", $email)[0]; // auto-generate username
    $role = "member";
    $stmt->execute([$username, $fullName, $dob, $gender, $email, $phone, $passwordHash, $role]);

    $userId = (int) $pdo->lastInsertId();

    // Create JWT
    $payload = [
        "iss" => "your-app",
        "iat" => time(),
        "exp" => time() + 3600,
        "sub" => $userId,
        "email" => $email
    ];
    $token = JWT::encode($payload, $_ENV["JWT_SECRET"], "HS256");

    echo json_encode([
        "status" => "success",
        "message" => "User created successfully",
        "token" => $token,
        "user" => [
            "user_id" => $userId,
            "username" => $username,
            "email" => $email,
            "role" => $role
        ]
    ]);
    
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Server error", "error" => $e->getMessage()]);
}
