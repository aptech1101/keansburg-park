<?php
// backend/public/index.php

declare(strict_types=1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Max-Age: 86400');
    exit;
}

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = rtrim($uri, '/');

require_once __DIR__ . '/../config/config.php';

function send_json($data, int $status = 200): void {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}

// Route API requests to appropriate files
if (strpos($path, '/api/') === 0) {
    $apiPath = substr($path, 4); // Remove '/api' prefix
    
    // Handle auth routes
    if ($apiPath === '/auth/signin') {
        require_once __DIR__ . '/../api/auth/signin.php';
        exit;
    }
    
    if ($apiPath === '/auth/signup') {
        require_once __DIR__ . '/../api/auth/signup.php';
        exit;
    }
    
    // Handle admin routes
    if (strpos($apiPath, '/admin/') === 0) {
        $adminPath = substr($apiPath, 7); // Remove '/admin' prefix
        
        switch ($adminPath) {
            case 'dashboard':
                require_once __DIR__ . '/../api/admin/dashboard.php';
                exit;
            case 'feedback':
                require_once __DIR__ . '/../api/admin/feedback.php';
                exit;
            case 'gallery':
                require_once __DIR__ . '/../api/admin/gallery.php';
                exit;
            case 'orders':
                require_once __DIR__ . '/../api/admin/orders.php';
                exit;
            case 'tickets':
                require_once __DIR__ . '/../api/admin/tickets.php';
                exit;
            case 'attractions':
                require_once __DIR__ . '/../api/admin/attractions.php';
                exit;
            case 'restaurants':
                require_once __DIR__ . '/../api/admin/restaurants.php';
                exit;
            case 'zones':
                require_once __DIR__ . '/../api/admin/zones.php';
                exit;
            default:
                send_json(['error' => 'Admin route not found', 'path' => $path, 'adminPath' => $adminPath], 404);
                exit;
        }
    }
    
    send_json(['error' => 'API route not found', 'path' => $path, 'apiPath' => $apiPath], 404);
    exit;
}

// Default routes
switch ($path) {
    case '':
    case '/':
        send_json(['ok' => true, 'service' => 'KeansburgPark API', 'version' => '1.0.0']);
        exit;

    default:
        send_json(['error' => 'Not Found', 'path' => $path], 404);
        exit;
}


