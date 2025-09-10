<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

require __DIR__ . '/../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


$secret_key = "keansburg_secret_key";
$issuer     = "http://localhost";
$audience   = "http://localhost";
$issued_at  = time();
$expire     = $issued_at + (60 * 60);


$servername = "localhost";
$username   = "root";
$password   = "123456";
$dbname     = "keansburg_park";

$conn = new mysqli($servername, $username, $password, $dbname, "3306");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit();
}

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

$sql = "SELECT user_id, email, password_hash FROM users WHERE email = '$email' LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
    exit();
}

$user = $result->fetch_assoc();

if (!password_verify($password, $user['password_hash'])) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
    exit();
}

$payload = [
    "iss"  => $issuer,
    "aud"  => $audience,
    "iat"  => $issued_at,
    "exp"  => $expire,
    "data" => [
        "id"    => $user['user_id'],
        "email" => $user['email']
    ]
];

$jwt = JWT::encode($payload, $secret_key, 'HS256');

http_response_code(200);
echo json_encode([
    "status"  => "success",
    "message" => "Login successful",
    "token"   => $jwt,
    "user"    => [
        "id"    => $user['user_id'],
        "email" => $user['email']
    ]
]);

$conn->close();