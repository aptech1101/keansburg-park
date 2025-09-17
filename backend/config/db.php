<?php
$config  = require __DIR__ . '/config.php';

$host    = $config['db']['host'];
$port    = (int)$config['db']['port'];
$name    = $config['db']['name'];
$user    = $config['db']['user'];
$pass    = $config['db']['pass'];
$charset = $config['db']['charset'];

$dsn = "mysql:host={$host};port={$port};dbname={$name};charset={$charset}";

try {
  $pdo = new PDO($dsn, $user, $pass, [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  ]);
  return $pdo;
} catch (Throwable $e) {
  error_log('[DB] ' . $e->getMessage());
  // Để API còn trả lỗi chi tiết trong DEV (try/catch ở file API sẽ đọc message này)
  throw new RuntimeException('DB_CONNECT_ERROR: ' . $e->getMessage(), 0, $e);
}
