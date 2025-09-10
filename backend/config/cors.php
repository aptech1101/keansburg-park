<?php
// backend/config/cors.php

declare(strict_types=1);

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
    'http://localhost:5173',    // Vite dev server
    'http://127.0.0.1:5173',   // Vite dev server (alternative)
    'http://localhost:4173',    // Vite preview server
    // Add Netlify domains here when ready for production
    // 'https://your-app.netlify.app',
    // 'https://your-custom-domain.com',
];

/**
 * Set CORS headers based on allowed origins
 * @param string|null $origin The origin from the request
 * @return void
 */
function set_cors_headers(?string $origin = null): void {
    // Set default headers
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400'); // 24 hours

    // Get origin from request if not provided
    if ($origin === null) {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? null;
    }

    // Check if origin is allowed
    if ($origin && in_array($origin, ALLOWED_ORIGINS, true)) {
        header("Access-Control-Allow-Origin: $origin");
    } else {
        // For development, allow localhost with any port
        if ($origin && preg_match('/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/', $origin)) {
            header("Access-Control-Allow-Origin: $origin");
        } else {
            // Deny access for unauthorized origins
            header('Access-Control-Allow-Origin: null');
        }
    }
}

/**
 * Handle preflight OPTIONS requests
 * @return void
 */
function handle_preflight_request(): void {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        set_cors_headers();
        http_response_code(204);
        exit;
    }
}

/**
 * Initialize CORS for the current request
 * @return void
 */
function init_cors(): void {
    set_cors_headers();
    handle_preflight_request();
}
?>
