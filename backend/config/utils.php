<?php
// backend/config/utils.php

declare(strict_types=1);

/**
 * Read and decode JSON from request body
 * @return array|null
 */
function read_json(): ?array {
    $rawData = file_get_contents("php://input");
    
    if (empty($rawData)) {
        return null;
    }

    $data = json_decode($rawData, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        return null;
    }

    return $data;
}

/**
 * Output JSON response with status code
 * @param int $status HTTP status code
 * @param mixed $payload Response data
 * @param array $headers Additional headers to set
 * @return void
 */
function json_out(int $status, $payload, array $headers = []): void {
    // Set content type
    header('Content-Type: application/json; charset=UTF-8');
    
    // Set additional headers
    foreach ($headers as $header) {
        header($header);
    }
    
    // Set HTTP status code
    http_response_code($status);
    
    // Output JSON
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}

/**
 * Sanitize and validate email address
 * @param string $email
 * @return string|null Returns sanitized email or null if invalid
 */
function sanitize_email(string $email): ?string {
    $email = trim($email);
    
    if (empty($email)) {
        return null;
    }
    
    // Convert to lowercase
    $email = strtolower($email);
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return null;
    }
    
    // Additional sanitization
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    
    // Double-check after sanitization
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return null;
    }
    
    return $email;
}

/**
 * Sanitize string input
 * @param string $input
 * @param int $max_length Maximum allowed length
 * @return string|null
 */
function sanitize_string(string $input, int $max_length = 255): ?string {
    $input = trim($input);
    
    if (empty($input)) {
        return null;
    }
    
    // Remove null bytes and control characters
    $input = str_replace(["\0", "\r"], '', $input);
    
    // Limit length
    if (strlen($input) > $max_length) {
        return null;
    }
    
    return $input;
}

/**
 * Validate password strength
 * @param string $password
 * @param int $min_length Minimum password length
 * @return array Returns ['valid' => bool, 'errors' => array]
 */
function validate_password(string $password, int $min_length = 6): array {
    $errors = [];
    
    if (strlen($password) < $min_length) {
        $errors[] = "Password must be at least {$min_length} characters long";
    }
    
    if (!preg_match('/[A-Za-z]/', $password)) {
        $errors[] = "Password must contain at least one letter";
    }
    
    if (!preg_match('/[0-9]/', $password)) {
        $errors[] = "Password must contain at least one number";
    }
    
    return [
        'valid' => empty($errors),
        'errors' => $errors
    ];
}

/**
 * Generate a random token
 * @param int $length Token length
 * @return string
 */
function generate_token(int $length = 32): string {
    return bin2hex(random_bytes($length / 2));
}

/**
 * Hash password securely
 * @param string $password
 * @return string
 */
function hash_password(string $password): string {
    return password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
}

/**
 * Verify password against hash
 * @param string $password
 * @param string $hash
 * @return bool
 */
function verify_password(string $password, string $hash): bool {
    return password_verify($password, $hash);
}

/**
 * Log error message
 * @param string $message
 * @param array $context Additional context data
 * @return void
 */
function log_error(string $message, array $context = []): void {
    $timestamp = date('Y-m-d H:i:s');
    $context_str = empty($context) ? '' : ' | Context: ' . json_encode($context);
    error_log("[{$timestamp}] ERROR: {$message}{$context_str}");
}
?>
