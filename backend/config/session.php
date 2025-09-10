<?php
// backend/config/session.php

declare(strict_types=1);

/**
 * Initialize PHP session with secure settings
 * @param bool $cross_domain Set to true when frontend and backend are on different domains
 * @return void
 */
function init_session(bool $cross_domain = false): void {
    // Prevent session fixation attacks
    if (session_status() === PHP_SESSION_ACTIVE) {
        session_regenerate_id(true);
    }

    // Set session name
    session_name('KEANSBURGSESSID');

    // Configure session cookie settings
    $cookie_params = [
        'lifetime' => 0, // Session cookie expires when browser closes
        'path' => '/',
        'domain' => '', // Use current domain
        'secure' => $cross_domain, // Set to true for HTTPS in production
        'httponly' => true, // Prevent XSS attacks
        'samesite' => $cross_domain ? 'None' : 'Lax' // CSRF protection
    ];

    // Apply cookie parameters
    session_set_cookie_params($cookie_params);

    // Start the session
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    // Regenerate session ID periodically for security
    if (!isset($_SESSION['last_regeneration'])) {
        $_SESSION['last_regeneration'] = time();
    } elseif (time() - $_SESSION['last_regeneration'] > 300) { // 5 minutes
        session_regenerate_id(true);
        $_SESSION['last_regeneration'] = time();
    }
}

/**
 * Check if user is authenticated
 * @return bool
 */
function is_authenticated(): bool {
    return isset($_SESSION['user_id']) && !empty($_SESSION['user_id']);
}

/**
 * Get current user ID from session
 * @return int|null
 */
function get_current_user_id(): ?int {
    return $_SESSION['user_id'] ?? null;
}

/**
 * Set user session data
 * @param int $user_id
 * @param string $email
 * @param string $username
 * @param string $role
 * @return void
 */
function set_user_session(int $user_id, string $email, string $username, string $role): void {
    $_SESSION['user_id'] = $user_id;
    $_SESSION['email'] = $email;
    $_SESSION['username'] = $username;
    $_SESSION['role'] = $role;
    $_SESSION['login_time'] = time();
}

/**
 * Clear user session data
 * @return void
 */
function clear_user_session(): void {
    unset($_SESSION['user_id']);
    unset($_SESSION['email']);
    unset($_SESSION['username']);
    unset($_SESSION['role']);
    unset($_SESSION['login_time']);
    unset($_SESSION['last_regeneration']);
}

/**
 * Destroy session completely
 * @return void
 */
function destroy_session(): void {
    clear_user_session();
    session_destroy();
}
?>
