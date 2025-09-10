<?php
$host = "localhost";
$db_name = "Keansburg_park";
$username = "root";
$password = "12345678";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die(json_encode(["error" => "Lỗi kết nối: " . $e->getMessage()]));
}

header("Content-Type: application/json");

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

$stmt = $conn->prepare("SELECT COUNT(*) FROM Users WHERE email = ?");
$stmt->execute([$email]);
if ($stmt->fetchColumn() > 0) {
    echo json_encode(["error" => "Email already exists"]);
    exit;
}

$hashedPassword = password_hash($password, PASSWORD_BCRYPT);
$role = "member";

try {
    $stmt = $conn->prepare("INSERT INTO Users (username, email, password_hash, role) VALUES (?, ?, ?, ?)");
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
