<?php
// backend/utils/jwt.php

$config = require __DIR__ . '/../config/config.php';
$JWT_SECRET = $config['jwt_secret'];

function base64UrlEncode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64UrlDecode($data) {
    return base64_decode(strtr($data, '-_', '+/'));
}

function createJWT($payload): string {
    global $JWT_SECRET;

    $header = json_encode(['alg' => 'HS256', 'typ' => 'JWT']);
    $payload = json_encode($payload);

    $base64UrlHeader = base64UrlEncode($header);
    $base64UrlPayload = base64UrlEncode($payload);

    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $JWT_SECRET, true);
    $base64UrlSignature = base64UrlEncode($signature);

    return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
}

function verifyJWT(string $token) {
    global $JWT_SECRET;

    $parts = explode(".", $token);
    if (count($parts) !== 3) return false;

    list($header, $payload, $signature) = $parts;

    $expectedSignature = base64UrlEncode(hash_hmac('sha256', $header . "." . $payload, $JWT_SECRET, true));
    if (!hash_equals($expectedSignature, $signature)) {
        return false;
    }

    $decodedPayload = json_decode(base64UrlDecode($payload), true);

    // Check expiration
    if (isset($decodedPayload['exp']) && time() > $decodedPayload['exp']) {
        return false;
    }

    return $decodedPayload;
}
