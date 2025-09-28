<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../../config/env.php';
require_once __DIR__ . '/../../../config/db.php';
require_once __DIR__ . '/../../../middleware/auth.php';

$pdo = Database::getInstance();
$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'GET':
            if (isset($_GET['id'])) {
                $stmt = $pdo->prepare("SELECT * FROM gallery WHERE id = ?");
                $stmt->execute([$_GET['id']]);
                $data = $stmt->fetch(PDO::FETCH_ASSOC);

                if (!$data) {
                    http_response_code(404);
                    echo json_encode(["status" => "error", "message" => "Gallery item not found"]);
                    exit();
                }
            } else {
                $stmt = $pdo->query("SELECT * FROM gallery ORDER BY id DESC");
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }

            echo json_encode(["status" => "success", "data" => $data]);
            break;

        case 'POST':
            checkAdmin();

            $input = json_decode(file_get_contents('php://input'), true);
            if (empty($input['title']) || empty($input['image_url'])) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "Title and image_url are required"]);
                exit();
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
            checkAdmin();

            $input = json_decode(file_get_contents('php://input'), true);
            if (empty($input['id'])) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "ID is required"]);
                exit();
            }

            // build dynamic query để tránh overwrite thành null/empty
            $fields = [];
            $values = [];

            if (isset($input['title'])) {
                $fields[] = "title=?";
                $values[] = $input['title'];
            }
            if (isset($input['description'])) {
                $fields[] = "description=?";
                $values[] = $input['description'];
            }
            if (isset($input['image_url'])) {
                $fields[] = "image_url=?";
                $values[] = $input['image_url'];
            }

            if (count($fields) > 0) {
                $values[] = $input['id'];
                $sql = "UPDATE gallery SET " . implode(", ", $fields) . " WHERE id=?";
                $stmt = $pdo->prepare($sql);
                $stmt->execute($values);
            }

            echo json_encode(["status" => "success", "message" => "Gallery item updated successfully"]);
            break;

        case 'DELETE':
            checkAdmin();

            if (!isset($_GET['id'])) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "ID is required"]);
                exit();
            }

            // Lấy ảnh để xoá file vật lý
            $stmt = $pdo->prepare("SELECT image_url FROM gallery WHERE id=?");
            $stmt->execute([$_GET['id']]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$row) {
                http_response_code(404);
                echo json_encode(["status" => "error", "message" => "Gallery item not found"]);
                exit();
            }

            // Xoá file vật lý nếu tồn tại
            $filePath = realpath(__DIR__ . '/../../..' . $row['image_url']);
            if ($filePath && file_exists($filePath)) {
                unlink($filePath);
            }

            // Xoá record DB
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
