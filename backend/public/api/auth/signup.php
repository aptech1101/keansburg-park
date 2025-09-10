<?php
// backend/public/api/auth/signup.php

declare(strict_types=1);

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include required configuration files
require_once __DIR__ . '/../../../config/cors.php';
require_once __DIR__ . '/../../../config/session.php';
require_once __DIR__ . '/../../../config/db.php';
require_once __DIR__ . '/../../../config/utils.php';

// Initialize CORS
init_cors();

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_out(405, ['error' => 'Method not allowed']);
    exit;
}

try {
    // Check database connection
    $pdo = $GLOBALS['pdo'];
    if (!$pdo) {
        json_out(500, ['error' => 'Database connection failed']);
        exit;
    }

    // Read JSON data from request body
    $data = read_json();
    if (!$data) {
        json_out(400, ['error' => 'Invalid JSON data']);
        exit;
    }

    // Extract and validate required fields
    $full_name = sanitize_string($data['full_name'] ?? '');
    $dob = $data['dob'] ?? '';
    $gender = $data['gender'] ?? null;
    $email = sanitize_email($data['email'] ?? '');
    $phone = sanitize_string($data['phone'] ?? '');
    $password = $data['password'] ?? '';

    // Validation
    $errors = [];

    // Validate full_name (required)
    if (empty($full_name)) {
        $errors[] = 'Full name is required';
    }

    // Validate email (required and unique)
    if (empty($email)) {
        $errors[] = 'Email is required';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Invalid email format';
    }

    // Validate password (required, minimum 6 characters)
    if (empty($password)) {
        $errors[] = 'Password is required';
    } elseif (strlen($password) < 6) {
        $errors[] = 'Password must be at least 6 characters long';
    }

    // Validate date of birth format and convert to YYYY-MM-DD (for future use)
    $formatted_dob = null;
    if (!empty($dob)) {
        // Try yyyy-mm-dd format first
        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $dob)) {
            $formatted_dob = $dob;
        }
        // Try dd/mm/yyyy format
        elseif (preg_match('/^\d{2}\/\d{2}\/\d{4}$/', $dob)) {
            $parts = explode('/', $dob);
            $formatted_dob = $parts[2] . '-' . $parts[1] . '-' . $parts[0];
        }
        // Try dd-mm-yyyy format
        elseif (preg_match('/^\d{2}-\d{2}-\d{4}$/', $dob)) {
            $parts = explode('-', $dob);
            $formatted_dob = $parts[2] . '-' . $parts[1] . '-' . $parts[0];
        }
        
        // Validate the formatted date
        if ($formatted_dob) {
            $date_obj = DateTime::createFromFormat('Y-m-d', $formatted_dob);
            if (!$date_obj || $date_obj->format('Y-m-d') !== $formatted_dob) {
                $errors[] = 'Invalid date format. Use yyyy-mm-dd or dd/mm/yyyy';
            }
        } else {
            $errors[] = 'Invalid date format. Use yyyy-mm-dd or dd/mm/yyyy';
        }
    }

    // Validate gender (optional, but if provided must be valid)
    if ($gender !== null && !in_array($gender, ['male', 'female', 'other'], true)) {
        $errors[] = 'Gender must be male, female, other, or null';
    }

    // Note: dob, gender, and phone fields are validated but not stored in current schema
    // These fields are accepted for API compatibility but will be ignored during database insertion

    // Return validation errors if any
    if (!empty($errors)) {
        json_out(400, ['error' => 'Validation failed', 'details' => $errors]);
        exit;
    }

    // Check if email already exists
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetchColumn() > 0) {
        json_out(409, ['error' => 'Email already exists']);
        exit;
    }

    // Hash password using bcrypt
    $password_hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

    // Insert user data into schema (nullable phone, gender, dob)
    $stmt = $pdo->prepare("INSERT INTO users (full_name, email, phone, gender, dob, password_hash) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $full_name,
        $email,
        $phone ?: null,
        $gender ?: null,
        $formatted_dob,
        $password_hash
    ]);

    // Get the new user ID
    $user_id = $pdo->lastInsertId();

    // Return success response
    json_out(201, [
        'message' => 'Account created',
        'user_id' => (int)$user_id
    ]);

} catch (PDOException $e) {
    log_error('Signup database error: ' . $e->getMessage(), ['email' => $email ?? 'unknown']);
    json_out(500, ['error' => 'Registration failed. Please try again.']);
} catch (Exception $e) {
    log_error('Signup error: ' . $e->getMessage(), ['email' => $email ?? 'unknown']);
    json_out(500, ['error' => 'An unexpected error occurred']);
}
?>