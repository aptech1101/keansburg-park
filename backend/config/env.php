<?php
declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

try {
    $dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
    $dotenv->safeLoad();
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to load environment variables',
    ]);
    exit;
}

define('JWT_SECRET', $_ENV['JWT_SECRET'] ?? 'changeme');
define('JWT_ISSUER', $_ENV['JWT_ISSUER'] ?? 'keansburg.local');
define('JWT_EXPIRE_TIME', (int)($_ENV['JWT_EXPIRE_TIME'] ?? 3600));


