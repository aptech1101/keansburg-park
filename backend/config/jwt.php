<?php
declare(strict_types=1);

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once __DIR__ . '/env.php';

function createJWT(array $payload, int $expireSeconds = JWT_EXPIRE_TIME): string {
    $issuedAt = time();
    $expireAt = $issuedAt + $expireSeconds;

    $data = [
        'iss'  => JWT_ISSUER,
        'iat'  => $issuedAt,
        'exp'  => $expireAt,
        'data' => $payload,
    ];

    return JWT::encode($data, JWT_SECRET, 'HS256');
}

function verifyJWT(string $token) {
    try {
        $decoded = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
        return $decoded->data ?? null;
    } catch (Throwable $e) {
        return false;
    }
}


