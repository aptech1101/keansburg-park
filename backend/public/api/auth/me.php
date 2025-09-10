<?php
// backend/public/api/auth/me.php

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

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
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

    // Initialize session
    init_session(true);

    // Check if user is authenticated
    if (!isset($_SESSION['uid']) || empty($_SESSION['uid'])) {
        json_out(401, ['error' => 'Not authenticated']);
        exit;
    }

    $user_id = $_SESSION['uid'];

    // Get user profile from database (excluding password)
    $stmt = $pdo->prepare("SELECT id, full_name, email, role, created_at FROM users WHERE id = ? AND is_active = 1 LIMIT 1");
    $stmt->execute([$user_id]);
    $user = $stmt->fetch();

    if (!$user) {
        // User not found or inactive, clear session
        clear_user_session();
        json_out(401, ['error' => 'User not found or inactive']);
        exit;
    }

    // Return user profile (password is excluded from SELECT)
    json_out(200, [
        'id' => (int)$user['id'],
        'full_name' => $user['full_name'],
        'email' => $user['email'],
        'role' => $user['role'] ?? 'user',
        'created_at' => $user['created_at']
    ]);

} catch (PDOException $e) {
    log_error('Me endpoint database error: ' . $e->getMessage(), ['user_id' => $user_id ?? 'unknown']);
    json_out(500, ['error' => 'Failed to get user information']);
} catch (Exception $e) {
    log_error('Me endpoint error: ' . $e->getMessage(), ['user_id' => $user_id ?? 'unknown']);
    json_out(500, ['error' => 'An unexpected error occurred']);
}
?>