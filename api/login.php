<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

// Include database configuration
require_once __DIR__ . '/../backend/config/db.php';

// Check if database connection is available
if (!$GLOBALS['pdo']) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit();
}

$pdo = $GLOBALS['pdo'];

$rawData = file_get_contents("php://input");
$data = json_decode($rawData);

if ($data && isset($data->email) && isset($data->password)) {
    $email    = $conn->real_escape_string($data->email);
    $password = $data->password;
} elseif (isset($_POST['email']) && isset($_POST['password'])) {
    $email    = $conn->real_escape_string($_POST['email']);
    $password = $_POST['password'];
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Email and password required"]);
    exit();
}

$sql = "SELECT user_id, email, password_hash FROM users WHERE email = ? LIMIT 1";
$stmt = $pdo->prepare($sql);
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
    exit();
}

if (!password_verify($password, $user['password_hash'])) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
    exit();
}

http_response_code(200);
echo json_encode([
    "status" => "success",
    "message" => "Login successful",
    "user" => [
        "id"    => $user['user_id'],
        "email" => $user['email']
    ]
]);
?>