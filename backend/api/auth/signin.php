<?php
header("Content-Type: application/json");

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../utils/jwt.php';

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode([
        "status" => "error",
        "message" => "Email and password are required"
    ]);
    exit;
}

$sql = "SELECT id, username, password_hash, role, full_name, email 
        FROM users WHERE email = :email";

try {
    $config = require __DIR__ . '/../../config/config.php';
    $pdo = new PDO(
        "mysql:host={$config['db']['host']};port={$config['db']['port']};dbname={$config['db']['name']};charset={$config['db']['charset']}",
        $config['db']['user'],
        $config['db']['pass'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode([
            "status" => "error",
            "message" => "Invalid email or password"
        ]);
        exit;
    }

    if (!password_verify($password, $user['password_hash'])) {
        echo json_encode([
            "status" => "error",
            "message" => "Invalid email or password"
        ]);
        exit;
    }

    // Tạo JWT
    $payload = [
        "user_id" => $user['id'],
        "username" => $user['username'],
        "role" => $user['role'],
        "exp" => time() + 3600 // 1 giờ hết hạn
    ];

    $token = createJWT($payload);

    echo json_encode([
        "status" => "success",
        "message" => "Login successful",
        "token" => $token,
        "user" => [
            "id" => $user['id'],
            "username" => $user['username'],
            "role" => $user['role'],
            "full_name" => $user['full_name'],
            "email" => $user['email']
        ]
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Database error: " . $e->getMessage()
    ]);
    exit;
}
?>
