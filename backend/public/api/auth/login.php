<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=UTF-8');

require_once __DIR__ . '/../../../config/env.php';
require_once __DIR__ . '/../../../config/db.php';
require_once __DIR__ . '/../../../config/jwt.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$data = json_decode(file_get_contents('php://input'), true) ?: [];
$email = trim((string)($data['email'] ?? ''));
$password = (string)($data['password'] ?? '');

if ($email === '' || $password === '') {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Email and password required']);
    exit;
}

/** @var PDO|null $pdo */
$pdo = $GLOBALS['pdo'] ?? null;
if (!$pdo) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
    exit;
}

$stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user || !password_verify($password, (string)$user['password_hash'])) {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Invalid credentials']);
    exit;
}

$payload = [
    'sub' => (int)$user['id'],
    'username' => $user['username'] ?? '',
    'role' => $user['role'] ?? 'user',
];

$token = JWT::encode([
    'sub' => $payload['sub'],
    'username' => $payload['username'],
    'role' => $payload['role'],
    'iat' => time(),
    'exp' => time() + 60 * 60 * 24 * 7,
], $_ENV['JWT_SECRET'] ?? JWT_SECRET, 'HS256');

echo json_encode([
    'status' => 'success',
    'token' => $token,
    'user' => [
        'id' => (int)$user['id'],
        'username' => $user['username'] ?? '',
        'email' => $user['email'],
        'phone' => $user['phone'] ?? null,
        'role' => $user['role'] ?? 'user',
        'lastProfileUpdate' => null,
    ],
]);


