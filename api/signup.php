<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

// Include database configuration
require_once __DIR__ . '/../backend/config/db.php';

// Check if database connection is available
if (!$GLOBALS['pdo']) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

$conn = $GLOBALS['pdo'];

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['username'], $data['email'], $data['password'])) {
    echo json_encode(["error" => "Missing required fields"]);
    exit;
}

$username = trim($data['username']);
$email = trim($data['email']);
$password = $data['password'];

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["error" => "Invalid email format"]);
    exit;
}

if (strlen($password) < 6) {
    echo json_encode(["error" => "Password must be at least 6 characters"]);
    exit;
}

$stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
$stmt->execute([$email]);
if ($stmt->fetchColumn() > 0) {
    echo json_encode(["error" => "Email already exists"]);
    exit;
}

$hashedPassword = password_hash($password, PASSWORD_BCRYPT);
$role = "member";

try {
    $stmt = $conn->prepare("INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)");
    $stmt->execute([$username, $email, $hashedPassword, $role]);

    $user_id = $conn->lastInsertId();

    echo json_encode([
        "success" => true,
        "message" => "User registered successfully",
        "user" => [
            "id" => $user_id,
            "username" => $username,
            "email" => $email,
            "role" => $role
        ]
    ]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Registration failed: " . $e->getMessage()]);
}
?>
