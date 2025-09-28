<?php
declare(strict_types=1);

// Global headers & CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Resolve path
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
// Normalize to start at /api when present
if (strpos($uri, '/api/') !== false) {
    $path = substr($uri, strpos($uri, '/api/'));
} else {
    $path = rtrim($uri, '/') ?: '/';
}

// Root listing
if ($path === '/' || $path === '') {
    http_response_code(200);
    echo json_encode([
        'ok' => true,
        'service' => 'KeansburgPark API',
        'routes' => [
            '/api/auth/login',
            '/api/auth/signup',
            '/api/account/updateprofile',
            '/api/account/orders',
            '/api/account/order-details',
            '/api/users',
            '/api/orders',
            '/api/tickets',
            '/api/messages',
            '/api/feedback',
            '/api/reviews',
            '/api/admin/feedbacks',
            '/api/ping'
        ]
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

// Map /api/* to files under public/api/
$apiBase = __DIR__ . '/api';
$relative = substr($path, 5); // strip leading 'api/' from '/api/...'
$relative = ltrim($relative, '/');

// Security: prevent directory traversal
$relative = str_replace(['..', "\0"], '', $relative);

// Try exact .php file (e.g., auth/login -> auth/login.php)
$candidate = $apiBase . '/' . $relative;
if (is_dir($candidate) && file_exists($candidate . '/index.php')) {
    require $candidate . '/index.php';
    exit;
}
if (file_exists($candidate . '.php')) {
    require $candidate . '.php';
    exit;
}

// Fallback: special simple data endpoints kept as files
if ($relative === 'users') {
    require __DIR__ . '/api/users.php';
    exit;
}
if ($relative === 'orders') {
    require __DIR__ . '/api/orders.php';
    exit;
}
if ($relative === 'tickets') {
    require __DIR__ . '/api/tickets.php';
    exit;
}

http_response_code(404);
echo json_encode(['error' => 'Not Found', 'path' => $path], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);