<?php
declare(strict_types=1);

require_once __DIR__ . '/../../config/env.php';
require_once __DIR__ . '/../../config/db.php';

header('Content-Type: application/json');

function send_json($data, int $status = 200): void {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}

if (!in_array($_SERVER['REQUEST_METHOD'], ['GET', 'HEAD'], true)) {
    send_json(['error' => 'Method Not Allowed'], 405);
    exit;
}

$pdo = Database::getInstance();

$limit = isset($_GET['limit']) ? max(1, min(50, (int)$_GET['limit'])) : 10;
$status = $_GET['status'] ?? 'approved';

$stmt = $pdo->prepare('SELECT id, name, email, message, rating, created_at FROM feedbacks WHERE status = :status ORDER BY created_at DESC, id DESC LIMIT :limit');
$stmt->bindValue(':status', $status, PDO::PARAM_STR);
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->execute();
$rows = $stmt->fetchAll();
send_json(['status' => 'success', 'data' => $rows]);

