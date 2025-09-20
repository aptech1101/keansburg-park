<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../utils/jwt.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['username'], $data['email'], $data['password'], $data['full_name'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing required fields"
    ]);
    exit;
}

$username = trim($data['username']);
$email = trim($data['email']);
$password = $data['password'];
$full_name = trim($data['full_name']);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid email format"
    ]);
    exit;
}

if (strlen($password) < 6) {
    echo json_encode([
        "status" => "error",
        "message" => "Password must be at least 6 characters"
    ]);
    exit;
}

try {
    $config = require __DIR__ . '/../../config/config.php';
    $pdo = new PDO(
        "mysql:host={$config['db']['host']};port={$config['db']['port']};dbname={$config['db']['name']};charset={$config['db']['charset']}",
        $config['db']['user'],
        $config['db']['pass'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    // Check if email already exists
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetchColumn() > 0) {
        echo json_encode([
            "status" => "error",
            "message" => "Email already exists"
        ]);
        exit;
    }

    // Check if username already exists
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
    $stmt->execute([$username]);
    if ($stmt->fetchColumn() > 0) {
        echo json_encode([
            "status" => "error",
            "message" => "Username already exists"
        ]);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $role = "user";

    $stmt = $pdo->prepare("INSERT INTO users (username, full_name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$username, $full_name, $email, $hashedPassword, $role]);

    $user_id = $pdo->lastInsertId();

    echo json_encode([
        "status" => "success",
        "message" => "User registered successfully",
        "user" => [
            "id" => $user_id,
            "username" => $username,
            "full_name" => $full_name,
            "email" => $email,
            "role" => $role
        ]
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Registration failed: " . $e->getMessage()
    ]);
}
?>