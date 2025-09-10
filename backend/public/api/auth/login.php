<?php
// backend/public/api/auth/login.php

declare(strict_types=1);

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include required configuration files
require_once __DIR__ . '/../../../config/cors.php';
require_once __DIR__ . '/../../../config/session.php';
require_once __DIR__ . '/../../../config/db.php';
require_once __DIR__ . '/../../../config/utils.php';

// Initialize CORS
init_cors();

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_out(405, ['error' => 'Method not allowed']);
    exit;
}

try {
    // Check database connection
    $pdo = $GLOBALS['pdo'];
    if (!$pdo) {
        json_out(500, ['error' => 'Database connection failed']);
        exit;
    }

    // Read JSON data from request body
    $data = read_json();
    if (!$data) {
        json_out(400, ['error' => 'Invalid JSON data']);
        exit;
    }

    // Extract and validate required fields
    $email = sanitize_email($data['email'] ?? '');
    $password = $data['password'] ?? '';

    // Validation
    if (empty($email)) {
        json_out(400, ['error' => 'Email is required']);
        exit;
    }

    if (empty($password)) {
        json_out(400, ['error' => 'Password is required']);
        exit;
    }

    // Find user by email and check if active
    $stmt = $pdo->prepare("SELECT id, full_name, email, password_hash FROM users WHERE email = ? AND is_active = 1 LIMIT 1");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user) {
        json_out(401, ['error' => 'Invalid email or password']);
        exit;
    }

    // Verify password
    if (!password_verify($password, $user['password_hash'])) {
        json_out(401, ['error' => 'Invalid email or password']);
        exit;
    }

    // Initialize session
    init_session(true); // true for cross-domain (frontend/backend separation)

    // Regenerate session ID for security
    session_regenerate_id(true);

    // Set session data
    $_SESSION['uid'] = $user['id'];
    $_SESSION['email'] = $user['email'];
    $_SESSION['name'] = $user['full_name'];

    // Return user data (without password)
    json_out(200, [
        'id' => (int)$user['id'],
        'full_name' => $user['full_name'],
        'email' => $user['email'],
        'role' => 'user'
    ]);

} catch (PDOException $e) {
    log_error('Login database error: ' . $e->getMessage(), ['email' => $email ?? 'unknown']);
    json_out(500, ['error' => 'Login failed. Please try again.']);
} catch (Exception $e) {
    log_error('Login error: ' . $e->getMessage(), ['email' => $email ?? 'unknown']);
    json_out(500, ['error' => 'An unexpected error occurred']);
}
?>