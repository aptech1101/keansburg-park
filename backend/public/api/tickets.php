<?php
declare(strict_types=1);

header('Content-Type: application/json');

echo json_encode([
    ['id' => 'T-001', 'type' => 'Day Pass', 'price' => 49.99],
    ['id' => 'T-002', 'type' => 'Family Pack', 'price' => 149.99],
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

