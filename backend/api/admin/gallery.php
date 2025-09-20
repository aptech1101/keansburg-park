<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../middleware/auth.php';

// Verify admin authentication
checkAdmin();

$config = require __DIR__ . '/../../config/config.php';
$pdo = new PDO(
    "mysql:host={$config['db']['host']};port={$config['db']['port']};dbname={$config['db']['name']};charset={$config['db']['charset']}",
    $config['db']['user'],
    $config['db']['pass'],
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'GET':
            if (isset($_GET['id'])) {
                $stmt = $pdo->prepare("SELECT * FROM gallery WHERE id = ?");
                $stmt->execute([$_GET['id']]);
                $data = $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                $stmt = $pdo->query("SELECT * FROM gallery ORDER BY id DESC");
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            echo json_encode(["status" => "success", "data" => $data]);
            break;

        case 'POST':
            $input = json_decode(file_get_contents('php://input'), true);
            if (!isset($input['title']) || !isset($input['image_url'])) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "Title and image_url are required"]);
                break;
            }
            
            $stmt = $pdo->prepare("INSERT INTO gallery (title, description, image_url) VALUES (?, ?, ?)");
            $stmt->execute([
                $input['title'],
                $input['description'] ?? '',
                $input['image_url']
            ]);
            echo json_encode(["status" => "success", "message" => "Gallery item created successfully"]);
            break;

        case 'PUT':
            $input = json_decode(file_get_contents('php://input'), true);
            if (!isset($input['id'])) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "ID is required"]);
                break;
            }
            
            $stmt = $pdo->prepare("UPDATE gallery SET title=?, description=?, image_url=? WHERE id=?");
            $stmt->execute([
                $input['title'],
                $input['description'] ?? '',
                $input['image_url'],
                $input['id']
            ]);
            echo json_encode(["status" => "success", "message" => "Gallery item updated successfully"]);
            break;

        case 'DELETE':
            if (!isset($_GET['id'])) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "ID is required"]);
                break;
            }
            
            $stmt = $pdo->prepare("DELETE FROM gallery WHERE id=?");
            $stmt->execute([$_GET['id']]);
            echo json_encode(["status" => "success", "message" => "Gallery item deleted successfully"]);
            break;

        default:
            http_response_code(405);
            echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}
?>