<?php
require_once __DIR__ . '/config/db.php';

try {
    $db = Database::getInstance();
    echo "Database connection successful!";
} catch (Exception $e) {
    echo "Database connection failed: " . $e->getMessage();
}
?>



