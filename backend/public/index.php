<?php
// backend/public/index.php

declare(strict_types=1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = rtrim($uri, '/');

require_once __DIR__ . '/../config/db.php';

function send_json($data, int $status = 200): void {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}

switch ($path) {
    case '':
    case '/':
        send_json(['ok' => true, 'service' => 'KeansburgPark API', 'routes' => ['/api/users', '/api/orders', '/api/tickets']]);
        break;

    case '/api/users':
        send_json([
            ['id' => 1, 'name' => 'Alice'],
            ['id' => 2, 'name' => 'Bob'],
        ]);
        break;

    case '/api/orders':
        send_json([
            ['id' => 101, 'userId' => 1, 'status' => 'pending'],
            ['id' => 102, 'userId' => 2, 'status' => 'completed'],
        ]);
        break;

    case '/api/tickets':
        send_json([
            ['id' => 'T-001', 'type' => 'Day Pass', 'price' => 49.99],
            ['id' => 'T-002', 'type' => 'Family Pack', 'price' => 149.99],
        ]);
        break;

    default:
        send_json(['error' => 'Not Found', 'path' => $path], 404);
}


