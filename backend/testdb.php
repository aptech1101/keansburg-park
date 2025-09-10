<?php
// backend/testdb.php

declare(strict_types=1);

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json; charset=UTF-8');

try {
    $config = require __DIR__ . '/config/config.php';
    $db = $config['db'];

    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=%s',
        $db['host'],
        $db['port'],
        $db['name'],
        $db['charset']
    );

    $pdo = new PDO($dsn, $db['user'], $db['pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    $serverVersion = $pdo->getAttribute(PDO::ATTR_SERVER_VERSION);
    $clientVersion = $pdo->getAttribute(PDO::ATTR_CLIENT_VERSION);

    echo json_encode([
        'ok' => true,
        'message' => 'Database connection successful',
        'host' => $db['host'],
        'port' => $db['port'],
        'database' => $db['name'],
        'charset' => $db['charset'],
        'server_version' => $serverVersion,
        'client_version' => $clientVersion,
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'message' => 'Database connection failed',
        'error' => $e->getMessage(),
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}

?>


