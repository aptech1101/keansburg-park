<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

require_once __DIR__ . '/../config/env.php';

// Raw socket test to check if port is reachable
$host = $_ENV['DB_HOST'] ?? '127.0.0.1';
$port = (int)($_ENV['DB_PORT'] ?? 3306);
$sockOk = false;
$sockErr = null;
$start = microtime(true);
$fp = @fsockopen($host, $port, $errno, $errstr, 2.0);
if ($fp) {
    $sockOk = true;
    fclose($fp);
} else {
    $sockErr = "[$errno] $errstr";
}
$sockMs = (int) ((microtime(true) - $start) * 1000);

// Try PDO directly (avoid app's Database class which exits on failure)
$pdoResult = null;
$pdoError = null;
try {
    $charset = $_ENV['DB_CHARSET'] ?? 'utf8mb4';
    $dsn = "mysql:host={$host};port={$port};dbname=" . ($_ENV['DB_NAME'] ?? '') . ";charset={$charset}";
    $pdo = new PDO($dsn, $_ENV['DB_USER'] ?? '', $_ENV['DB_PASS'] ?? '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_TIMEOUT => 3,
    ]);
    $stmt = $pdo->query('SELECT 1 AS ok');
    $pdoResult = $stmt->fetch();
} catch (Throwable $e) {
    $pdoError = $e->getMessage();
}

// Try mysqli if available
$mysqliResult = null;
$mysqliError = null;
if (function_exists('mysqli_init')) {
    try {
        $mysqli = @mysqli_init();
        @mysqli_real_connect($mysqli, $host, $_ENV['DB_USER'] ?? '', $_ENV['DB_PASS'] ?? '', $_ENV['DB_NAME'] ?? '', $port, null, 0);
        if ($mysqli && !mysqli_connect_errno()) {
            $res = $mysqli->query('SELECT 1 AS ok');
            if ($res) { $mysqliResult = $res->fetch_assoc(); }
            $mysqli->close();
        } else {
            $mysqliError = mysqli_connect_error();
        }
    } catch (Throwable $e) {
        $mysqliError = $e->getMessage();
    }
} else {
    $mysqliError = 'mysqli extension not available';
}

$ok = $sockOk && ($pdoResult !== null || $mysqliResult !== null);
http_response_code($ok ? 200 : 500);
echo json_encode([
    'status' => $ok ? 'success' : 'error',
    'message' => $ok ? 'Database connection OK' : 'Database connection failed',
    'details' => [
        'host' => $host,
        'port' => $port,
        'name' => $_ENV['DB_NAME'] ?? null,
        'user' => $_ENV['DB_USER'] ?? null,
        'charset' => $_ENV['DB_CHARSET'] ?? null,
    ],
    'raw_socket' => [
        'reachable' => $sockOk,
        'latency_ms' => $sockMs,
        'error' => $sockErr,
    ],
    'pdo' => [
        'result' => $pdoResult,
        'error' => $pdoError,
    ],
    'mysqli' => [
        'result' => $mysqliResult,
        'error' => $mysqliError,
    ],
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);


