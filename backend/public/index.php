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
// Hỗ trợ khi deploy dưới subfolder (vd: /keansburg-park/backend/public)
if ($uri !== null) {
    $apiPos = strpos($uri, '/api/');
    if ($apiPos !== false) {
        $path = substr($uri, $apiPos);
    } else {
        $path = rtrim($uri, '/');
    }
} else {
    $path = '/';
}

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

    case '/api/feedback':
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            send_json(['error' => 'Method Not Allowed'], 405);
            break;
        }
        $input = json_decode(file_get_contents('php://input'), true) ?: [];
        $name = trim((string)($input['name'] ?? ''));
        $email = trim((string)($input['email'] ?? ''));
        $message = trim((string)($input['message'] ?? ''));
        $rating = (int)($input['rating'] ?? 0);

        if ($name === '' || $email === '' || $message === '') {
            send_json(['status' => 'error', 'message' => 'Missing required fields'], 422);
            break;
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            send_json(['status' => 'error', 'message' => 'Invalid email'], 422);
            break;
        }
        if ($rating < 1 || $rating > 5) {
            send_json(['status' => 'error', 'message' => 'Rating must be between 1 and 5'], 422);
            break;
        }

        /** @var PDO|null $pdo */
        $pdo = $GLOBALS['pdo'] ?? null;
        if (!$pdo) {
            send_json(['status' => 'error', 'message' => 'Database connection failed'], 500);
            break;
        }

        // Ensure table exists
        $pdo->exec("CREATE TABLE IF NOT EXISTS feedbacks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            rating INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

        $stmt = $pdo->prepare('INSERT INTO feedbacks (name, email, message, rating) VALUES (:name, :email, :message, :rating)');
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':message' => $message,
            ':rating' => $rating,
        ]);
        send_json(['status' => 'success', 'id' => (int)$pdo->lastInsertId()]);
        break;

    case '/api/reviews':
        if (!in_array($_SERVER['REQUEST_METHOD'], ['GET', 'HEAD'], true)) {
            send_json(['error' => 'Method Not Allowed'], 405);
            break;
        }
        /** @var PDO|null $pdo */
        $pdo = $GLOBALS['pdo'] ?? null;
        if (!$pdo) {
            send_json(['status' => 'error', 'message' => 'Database connection failed'], 500);
            break;
        }
        $limit = isset($_GET['limit']) ? max(1, min(50, (int)$_GET['limit'])) : 10;
        $stmt = $pdo->prepare('SELECT id, name, email, message, rating, created_at FROM feedbacks ORDER BY created_at DESC, id DESC LIMIT :limit');
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        $rows = $stmt->fetchAll();
        send_json(['status' => 'success', 'data' => $rows]);
        break;

    default:
        send_json(['error' => 'Not Found', 'path' => $path], 404);
}


