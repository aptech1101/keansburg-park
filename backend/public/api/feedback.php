<?php
declare(strict_types=1);

require_once __DIR__ . '/../../config/db.php';

header('Content-Type: application/json');

function send_json($data, int $status = 200): void {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(['error' => 'Method Not Allowed'], 405);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true) ?: [];
$name = trim((string)($input['name'] ?? ''));
$email = trim((string)($input['email'] ?? ''));
$message = trim((string)($input['message'] ?? ''));
$rating = (int)($input['rating'] ?? 0);

if ($name === '' || $email === '' || $message === '') {
    send_json(['status' => 'error', 'message' => 'Missing required fields'], 422);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    send_json(['status' => 'error', 'message' => 'Invalid email'], 422);
    exit;
}
if ($rating < 1 || $rating > 5) {
    send_json(['status' => 'error', 'message' => 'Rating must be between 1 and 5'], 422);
    exit;
}

$pdo = Database::getInstance();

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

