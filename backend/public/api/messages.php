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
$phone = trim((string)($input['phone'] ?? ''));
$subject = trim((string)($input['subject'] ?? ''));
$message = trim((string)($input['message'] ?? ''));

if ($name === '' || $email === '' || $subject === '' || $message === '') {
    send_json(['status' => 'error', 'message' => 'Missing required fields'], 422);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    send_json(['status' => 'error', 'message' => 'Invalid email'], 422);
    exit;
}

$pdo = Database::getInstance();

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

