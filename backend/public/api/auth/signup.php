<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=UTF-8');

require_once __DIR__ . '/../../../config/env.php';
require_once __DIR__ . '/../../../config/db.php';
require_once __DIR__ . '/../../../config/jwt.php';

use Firebase\JWT\JWT;

try {
    $data = json_decode(file_get_contents('php://input'), true) ?: [];
    $fullName = trim((string)($data['fullName'] ?? ''));
    $email = trim((string)($data['email'] ?? ''));
    $phone = trim((string)($data['phone'] ?? ''));
    $password = (string)($data['password'] ?? '');

    if ($fullName === '' || $email === '' || $password === '') {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
        exit;
    }

    /** @var PDO|null $pdo */
    $pdo = $GLOBALS['pdo'] ?? null;
    if (!$pdo) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
        exit;
    }

    // Check email unique
    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Email already exists']);
        exit;
    }

    // Generate username from email if not provided
    $baseUsername = strtolower(preg_replace('/[^a-z0-9]+/i', '', explode('@', $email)[0] ?? 'user'));
    if ($baseUsername === '') { $baseUsername = 'user'; }
    $username = $baseUsername;
    $suffix = 1;
    while (true) {
        $check = $pdo->prepare('SELECT id FROM users WHERE username = ?');
        $check->execute([$username]);
        if (!$check->fetch()) break;
        $username = $baseUsername . $suffix;
        $suffix++;
    }

    $passwordHash = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $pdo->prepare('INSERT INTO users (full_name, email, password_hash, username, phone, role) VALUES (?, ?, ?, ?, ?, "user")');
    $stmt->execute([$fullName, $email, $passwordHash, $username, $phone]);
    $userId = (int)$pdo->lastInsertId();

    $token = JWT::encode([
        'sub' => $userId,
        'username' => $username,
        'role' => 'user',
        'iat' => time(),
        'exp' => time() + 60 * 60 * 24 * 7,
    ], $_ENV['JWT_SECRET'] ?? JWT_SECRET, 'HS256');

    echo json_encode([
        'status' => 'success',
        'message' => 'Signup successful',
        'token' => $token,
        'user' => [
            'id' => $userId,
            'username' => $username,
            'email' => $email,
            'phone' => $phone,
            'role' => 'user',
            'lastProfileUpdate' => null,
        ],
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Server error', 'error' => $e->getMessage()]);
}


