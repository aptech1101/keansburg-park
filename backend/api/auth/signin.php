<?php
header("Content-Type: application/json");

require_once '../config/db.php';   // DB connection
require_once '../utils/jwt.php';  // JWT helper

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

if (empty($username) || empty($password)) {
    echo json_encode([
        "status" => "error",
        "message" => "Username and password are required"
    ]);
    exit;
}

// Query user bằng prepared statement
$sql = "SELECT user_id, username, password_hash, role, full_name, email 
        FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid username or password"
    ]);
    exit;
}

$user = $result->fetch_assoc();

// Verify password
if (!password_verify($password, $user['password_hash'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid username or password"
    ]);
    exit;
}

// Tạo JWT (thêm user_id và role vào payload)
$payload = [
    "user_id" => $user['user_id'],
    "username" => $user['username'],
    "role" => $user['role'],
    "exp" => time() + 3600 // token hết hạn sau 1h
];

$token = createJWT($payload);

echo json_encode([
    "status" => "success",
    "message" => "Login successful",
    "token" => $token,
    "user" => [
        "id" => $user['user_id'],
        "username" => $user['username'],
        "role" => $user['role'],
        "full_name" => $user['full_name'],
        "email" => $user['email']
    ]
]);
?>
