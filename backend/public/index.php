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
        send_json(['ok' => true, 'service' => 'Keansburg Park API', 'routes' => ['/api/users', '/api/orders', '/api/tickets', '/api/messages']]);
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

    case '/api/ping':
        send_json([
            'status' => 'success',
            'message' => 'API is working',
            'timestamp' => date('Y-m-d H:i:s'),
            'server_time' => time(),
            'php_version' => PHP_VERSION,
            'memory_usage' => memory_get_usage(true),
            'memory_peak' => memory_get_peak_usage(true)
        ]);
        break;

    case '/api/messages':
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            send_json(['error' => 'Method Not Allowed'], 405);
            break;
        }
        $input = json_decode(file_get_contents('php://input'), true) ?: [];
        $name = trim((string)($input['name'] ?? ''));
        $email = trim((string)($input['email'] ?? ''));
        $phone = trim((string)($input['phone'] ?? ''));
        $subject = trim((string)($input['subject'] ?? ''));
        $message = trim((string)($input['message'] ?? ''));

        if ($name === '' || $email === '' || $subject === '' || $message === '') {
            send_json(['status' => 'error', 'message' => 'Missing required fields'], 422);
            break;
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            send_json(['status' => 'error', 'message' => 'Invalid email'], 422);
            break;
        }

        /** @var PDO|null $pdo */
        $pdo = $GLOBALS['pdo'] ?? null;
        if (!$pdo) {
            send_json(['status' => 'error', 'message' => 'Database connection failed'], 500);
            break;
        }

        // Ensure messages table exists
        $pdo->exec("CREATE TABLE IF NOT EXISTS messages (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            name VARCHAR(120) NOT NULL,
            email VARCHAR(190) NOT NULL,
            phone VARCHAR(30) NULL,
            subject VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

        $stmt = $pdo->prepare('INSERT INTO messages (name, email, phone, subject, message) VALUES (:name, :email, :phone, :subject, :message)');
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':phone' => $phone ?: null,
            ':subject' => $subject,
            ':message' => $message,
        ]);
        send_json(['status' => 'success', 'id' => (int)$pdo->lastInsertId(), 'message' => 'Message sent successfully']);
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

        // Ensure table exists with new structure (without foreign key constraint)
        $pdo->exec("CREATE TABLE IF NOT EXISTS feedbacks (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            rating TINYINT NOT NULL,
            status ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
            created_by BIGINT UNSIGNED NULL,
            created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY idx_feedbacks_created_by (created_by),
            CONSTRAINT chk_feedbacks_rating CHECK (rating BETWEEN 1 AND 5)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

        // Get user_id from request if available (for logged-in users)
        $created_by = isset($input['user_id']) ? (int)$input['user_id'] : null;
        
        $stmt = $pdo->prepare('INSERT INTO feedbacks (name, email, message, rating, created_by) VALUES (:name, :email, :message, :rating, :created_by)');
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':message' => $message,
            ':rating' => $rating,
            ':created_by' => $created_by,
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
        $status = $_GET['status'] ?? 'approved'; // Default to approved, admin can request all
        
        $stmt = $pdo->prepare('SELECT id, name, email, message, rating, created_at FROM feedbacks WHERE status = :status ORDER BY created_at DESC, id DESC LIMIT :limit');
        $stmt->bindValue(':status', $status, PDO::PARAM_STR);
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        $rows = $stmt->fetchAll();
        send_json(['status' => 'success', 'data' => $rows]);
        break;

    case '/api/admin/feedbacks':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            // Get all feedbacks for admin management
            $stmt = $pdo->prepare('SELECT id, name, email, message, rating, status, created_at FROM feedbacks ORDER BY created_at DESC');
            $stmt->execute();
            $rows = $stmt->fetchAll();
            send_json(['status' => 'success', 'data' => $rows]);
        } elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            // Update feedback status
            $input = json_decode(file_get_contents('php://input'), true) ?: [];
            $id = (int)($input['id'] ?? 0);
            $status = $input['status'] ?? '';
            
            if (!in_array($status, ['pending', 'approved', 'rejected'])) {
                send_json(['status' => 'error', 'message' => 'Invalid status'], 400);
                break;
            }
            
            $stmt = $pdo->prepare('UPDATE feedbacks SET status = :status WHERE id = :id');
            $stmt->execute([':status' => $status, ':id' => $id]);
            send_json(['status' => 'success', 'message' => 'Feedback status updated']);
        } else {
            send_json(['error' => 'Method Not Allowed'], 405);
        }
        break;

    default:
        send_json(['error' => 'Not Found', 'path' => $path], 404);
}


