<?php
declare(strict_types=1);

header('Content-Type: application/json');

echo json_encode([
    'status' => 'success',
    'message' => 'API is working',
    'timestamp' => date('Y-m-d H:i:s'),
    'server_time' => time(),
    'php_version' => PHP_VERSION,
    'memory_usage' => memory_get_usage(true),
    'memory_peak' => memory_get_peak_usage(true)
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

