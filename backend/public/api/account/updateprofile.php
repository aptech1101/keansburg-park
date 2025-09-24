<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=UTF-8');

require_once __DIR__ . '/../../../config/env.php';
require_once __DIR__ . '/../../../config/db.php';
require_once __DIR__ . '/../../../config/jwt.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

try {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
        exit;
    }

    $token = $matches[1];
    $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'] ?? JWT_SECRET, 'HS256'));
    $userId = $decoded->sub ?? null;
    if (!$userId) {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Invalid token']);
        exit;
    }

    $data = json_decode(file_get_contents('php://input'), true) ?: [];
    $username = trim((string)($data['username'] ?? ''));
    $email = trim((string)($data['email'] ?? ''));
    $phone = trim((string)($data['phone'] ?? ''));
    $newPassword = (string)($data['password'] ?? '');

    if ($username === '' || $email === '') {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Username and email are required']);
        exit;
    }

    /** @var PDO|null $pdo */
    $pdo = $GLOBALS['pdo'] ?? null;
    if (!$pdo) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
        exit;
    }

    // Unique email check
    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? AND id != ?');
    $stmt->execute([$email, $userId]);
    if ($stmt->fetch()) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Email already in use']);
        exit;
    }

    if ($newPassword !== '') {
        $passwordHash = password_hash($newPassword, PASSWORD_BCRYPT);
        $stmt = $pdo->prepare('UPDATE users SET username = ?, email = ?, phone = ?, password_hash = ? WHERE id = ?');
        $stmt->execute([$username, $email, $phone, $passwordHash, $userId]);
    } else {
        $stmt = $pdo->prepare('UPDATE users SET username = ?, email = ?, phone = ? WHERE id = ?');
        $stmt->execute([$username, $email, $phone, $userId]);
    }

    echo json_encode([
        'status' => 'success',
        'message' => 'Profile updated successfully',
        'logoutRequired' => $newPassword !== ''
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Server error', 'error' => $e->getMessage()]);
}


