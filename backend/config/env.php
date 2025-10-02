<?php
declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

try {
    $dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
    $dotenv->safeLoad(); 
} catch (\Exception $e) {
    // Fallback: set default values if .env file doesn't exist
    $_ENV['DB_HOST'] = 'localhost';
    $_ENV['DB_PORT'] = '3307';
    $_ENV['DB_NAME'] = 'keansburg';
    $_ENV['DB_USER'] = 'root';
    $_ENV['DB_PASS'] = '12345678';
    $_ENV['DB_CHARSET'] = 'utf8mb4';
    $_ENV['JWT_SECRET'] = 'keansburg_park_jwt_secret_key_2024';
    $_ENV['JWT_ISSUER'] = 'keansburg-park.com';
    $_ENV['JWT_EXPIRE_TIME'] = '3600';
    $_ENV['APP_URL'] = 'http://localhost:3000';
}

// Database config
$_ENV['DB_HOST'] = $_ENV['DB_HOST'] ?? 'localhost';
$_ENV['DB_PORT'] = $_ENV['DB_PORT'] ?? '3307';
$_ENV['DB_NAME'] = $_ENV['DB_NAME'] ?? 'keansburg';
$_ENV['DB_USER'] = $_ENV['DB_USER'] ?? 'root';
$_ENV['DB_PASS'] = $_ENV['DB_PASS'] ?? '12345678';
$_ENV['DB_CHARSET'] = $_ENV['DB_CHARSET'] ?? 'utf8mb4';

// JWT config
define('JWT_SECRET', $_ENV['JWT_SECRET'] ?? 'keansburg_park_jwt_secret_key_2024');
define('JWT_ISSUER', $_ENV['JWT_ISSUER'] ?? 'keansburg-park.com');
define('JWT_EXPIRE_TIME', (int)($_ENV['JWT_EXPIRE_TIME'] ?? 3600));

// App config
$_ENV['APP_URL'] = $_ENV['APP_URL'] ?? 'http://localhost:3000';
