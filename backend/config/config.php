<?php
// backend/config/config.php

declare(strict_types=1);

// Load environment variables from .env file
require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

return [
    'db' => [
        'host' => $_ENV['DB_HOST'] ?? '127.0.0.1',
        'port' => (int)($_ENV['DB_PORT'] ?? 3306),
        'name' => $_ENV['DB_NAME'] ?? 'keansburg',
        'user' => $_ENV['DB_USER'] ?? 'root',
        'pass' => $_ENV['DB_PASS'] ?? '123456',
        'charset' => 'utf8mb4',
    ],
    'jwt_secret' => $_ENV['JWT_SECRET'] ?? 'my_super_secret_key_123',
    'server' => [
        'port' => (int)($_ENV['SERVER_PORT'] ?? 8000),
        'host' => $_ENV['SERVER_HOST'] ?? '127.0.0.1',
    ],
    'cors' => [
        'origin' => $_ENV['CORS_ORIGIN'] ?? 'http://localhost:5173',
    ],
    'app' => [
        'env' => $_ENV['APP_ENV'] ?? 'development',
    ],
];