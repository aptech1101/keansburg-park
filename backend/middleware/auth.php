<?php

// CORS headers for all requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Short-circuit preflight requests
    http_response_code(200);
    exit(0);
}


require_once __DIR__ . '/../utils/jwt.php';

function getAuthorizationHeader(): ?string {
    $headers = null;
    if (isset($_SERVER['Authorization'])) {
        $headers = trim($_SERVER["Authorization"]);
    } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) { // Nginx or fast CGI
        $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        // Normalize header keys to handle different casing
        foreach ($requestHeaders as $key => $value) {
            if (strtolower($key) === 'authorization') {
                $headers = trim($value);
                break;
            }
        }
    }
    return $headers;
}

function getBearerToken(): ?string {
    $header = getAuthorizationHeader();
    if (!empty($header) && preg_match('/Bearer\s(\S+)/', $header, $matches)) {
        return $matches[1];
    }
    return null;
}

function checkAuth() {
    $token = getBearerToken();
    if (!$token) {
        http_response_code(401);
        echo json_encode([
            "status" => "error",
            "message" => "Missing Authorization header"
        ]);
        exit;
    }

    $payload = verifyJWT($token);
    if (!$payload) {
        http_response_code(401);
        echo json_encode([
            "status" => "error",
            "message" => "Invalid or expired token"
        ]);
        exit;
    }

    return $payload; // Trả về payload để dùng trong API
}

function checkAdmin() {
    $payload = checkAuth();
    if (!isset($payload['role']) || $payload['role'] !== 'admin') {
        http_response_code(403);
        echo json_encode([
            "status" => "error",
            "message" => "Access denied"
        ]);
        exit;
    }
    return $payload;
}
