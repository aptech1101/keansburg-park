<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../../config/env.php';
require_once __DIR__ . '/../../../middleware/auth.php';

// Kiểm tra admin
checkAdmin();

// Kiểm tra file
if (!isset($_FILES['file'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'No file uploaded']);
    exit();
}

// Kiểm tra type (gallery, attraction, restaurant…)
$type = $_POST['type'] ?? 'gallery'; // mặc định là gallery
$allowedTypes = ['gallery', 'attraction', 'restaurant'];

if (!in_array($type, $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid type']);
    exit();
}

$file = $_FILES['file'];

// Thư mục upload theo type
$uploadDir = __DIR__ . "/../../uploads/$type/";

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// Đặt tên file mới
$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = uniqid('img_', true) . '.' . $ext;
$targetPath = $uploadDir . $filename;

// Move file
if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    $url = "/uploads/$type/" . $filename; // URL public cho frontend
    echo json_encode(['status' => 'success', 'url' => $url]);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Upload failed']);
}
?>
