<?php
// backend/config/db.php

declare(strict_types=1);

$config = require __DIR__ . '/config.php';
$db = $config['db'];

$dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=%s', $db['host'], $db['port'], $db['name'], $db['charset']);

try {
    $GLOBALS['pdo'] = new PDO($dsn, $db['user'], $db['pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (Throwable $e) {
    $GLOBALS['pdo'] = null;
}


