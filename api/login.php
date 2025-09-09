<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

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
    echo json_encode(["status" => "error", "message" => "Invalid email or password 111"]);
    exit();
}

$user = $result->fetch_assoc();

if (!password_verify($password, $user['password_hash'])) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Invalid email or password 222"]);
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

$conn->close();
?>