<?php
declare(strict_types=1);

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once __DIR__ . '/../config/env.php';

// Tạo JWT token
function createJWT(array $payload, int $expireSeconds = JWT_EXPIRE_TIME): string {
    $issuedAt = time();
    $expireAt = $issuedAt + $expireSeconds;

    $data = [
        "iss"  => JWT_ISSUER,
        "iat"  => $issuedAt,
        "exp"  => $expireAt,
        "data" => $payload,
    ];

    return JWT::encode($data, JWT_SECRET, "HS256");
}

// Xác thực JWT token
function verifyJWT(string $token) {
    try {
        $decoded = JWT::decode($token, new Key(JWT_SECRET, "HS256"));
        // Chuẩn hóa về mảng để truy cập an toàn
        $arr = json_decode(json_encode($decoded), true);
        // Hỗ trợ cả 2 kiểu token: có bọc trong 'data' hoặc để claim ở top-level
        if (isset($arr['data']) && is_array($arr['data'])) {
            return $arr['data'];
        }
        return $arr;
    } catch (\Exception $e) {
        return false;
    }
}
