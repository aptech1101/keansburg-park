<?php
// backend/public/api/auth/logout.php

declare(strict_types=1);

// Include required configuration files
require_once __DIR__ . '/../../../config/cors.php';
require_once __DIR__ . '/../../../config/session.php';
require_once __DIR__ . '/../../../config/utils.php';

// Initialize CORS
init_cors();

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_out(405, ['error' => 'Method not allowed']);
    exit;
}

try {
    // Initialize session
    init_session(true);

    // Check if user is authenticated
    if (!isset($_SESSION['uid']) || empty($_SESSION['uid'])) {
        json_out(401, ['error' => 'Not authenticated']);
        exit;
    }

    // Clear all session data
    clear_user_session();

    // Destroy session completely
    destroy_session();

    // Clear session cookie
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }

    // Return 204 No Content (successful logout)
    json_out(204, null);

} catch (Exception $e) {
    log_error('Logout error: ' . $e->getMessage());
    json_out(500, ['error' => 'Logout failed']);
}
?>