<?php
// backend/api/admin/restaurants.php
require_once __DIR__ . '/../../../config/env.php';
require_once __DIR__ . '/../../../config/db.php';
require_once __DIR__ . '/../../../middleware/auth.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$pdo = Database::getInstance();
$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'GET':
            if (isset($_GET['id'])) {
                $stmt = $pdo->prepare("
                    SELECT r.*, z.name as zone_name 
                    FROM restaurants r 
                    JOIN zones z ON r.zone_id = z.id
                    WHERE r.id = ?
                ");
                $stmt->execute([$_GET['id']]);
                $data = $stmt->fetch(PDO::FETCH_ASSOC);

                if (!$data) {
                    http_response_code(404);
                    echo json_encode(["status" => "error", "message" => "Restaurant not found"]);
                    exit();
                }
            } else {
                $stmt = $pdo->query("
                    SELECT r.*, z.name as zone_name 
                    FROM restaurants r 
                    JOIN zones z ON r.zone_id = z.id
                    ORDER BY r.id DESC
                ");
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }

            echo json_encode(["status" => "success", "data" => $data]);
            break;

        case 'POST':
            checkAdmin();
            $input = json_decode(file_get_contents("php://input"), true);

            if (empty($input['name']) || empty($input['image_url'])) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "name and image_url are required"]);
                exit();
            }

            $category = $input['category'] ?? null;
            $details = $input['details'] ?? null;
            $features = $input['features'] ?? null;

            // Chuẩn hoá features sang JSON lưu DB
            if (is_array($features)) {
                $featuresJson = json_encode($features, JSON_UNESCAPED_UNICODE);
            } elseif (is_string($features)) {
                // nếu là string, thử parse JSON; nếu không được thì lưu nguyên string
                $decoded = json_decode($features, true);
                $featuresJson = is_array($decoded) ? json_encode($decoded, JSON_UNESCAPED_UNICODE) : $features;
            } else {
                $featuresJson = null;
            }

            $stmt = $pdo->prepare("
                INSERT INTO restaurants (zone_id, name, description, image_url, category, features, details) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $input['zone_id'] ?? null, // Default to zone 1 if not provided
                $input['name'],
                $input['description'] ?? '',
                $input['image_url'],
                $category,
                $featuresJson,
                $details
            ]);

            echo json_encode(["status" => "success", "message" => "Restaurant created"]);
            break;

        case 'PUT':
            checkAdmin();
            $input = json_decode(file_get_contents("php://input"), true);

            if (empty($input['id'])) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "ID is required"]);
                exit();
            }

            $fields = [];
            $values = [];

            if (isset($input['zone_id'])) {
                $fields[] = "zone_id=?";
                $values[] = $input['zone_id'];
            }
            if (isset($input['name'])) {
                $fields[] = "name=?";
                $values[] = $input['name'];
            }
            if (isset($input['description'])) {
                $fields[] = "description=?";
                $values[] = $input['description'];
            }
            if (isset($input['image_url'])) {
                $fields[] = "image_url=?";
                $values[] = $input['image_url'];
            }
            if (isset($input['category'])) {
                $fields[] = "category=?";
                $values[] = $input['category'];
            }
            if (isset($input['details'])) {
                $fields[] = "details=?";
                $values[] = $input['details'];
            }
            if (isset($input['features'])) {
                $features = $input['features'];
                if (is_array($features)) {
                    $featuresJson = json_encode($features, JSON_UNESCAPED_UNICODE);
                } elseif (is_string($features)) {
                    $decoded = json_decode($features, true);
                    $featuresJson = is_array($decoded) ? json_encode($decoded, JSON_UNESCAPED_UNICODE) : $features;
                } else {
                    $featuresJson = null;
                }
                $fields[] = "features=?";
                $values[] = $featuresJson;
            }

            if (count($fields) > 0) {
                $values[] = $input['id'];
                $sql = "UPDATE restaurants SET " . implode(", ", $fields) . " WHERE id=?";
                $stmt = $pdo->prepare($sql);
                $stmt->execute($values);
            }

            echo json_encode(["status" => "success", "message" => "Restaurant updated"]);
            break;

        case 'DELETE':
            checkAdmin();
            $id = $_GET['id'] ?? null;

            if (!$id) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "Missing id"]);
                exit();
            }

            // Lấy image_url để xoá file
            $stmt = $pdo->prepare("SELECT image_url FROM restaurants WHERE id=?");
            $stmt->execute([$id]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$row) {
                http_response_code(404);
                echo json_encode(["status" => "error", "message" => "Restaurant not found"]);
                exit();
            }

            $filePath = realpath(__DIR__ . '/../../..' . $row['image_url']);
            if ($filePath && file_exists($filePath)) {
                unlink($filePath);
            }

            $stmt = $pdo->prepare("DELETE FROM restaurants WHERE id=?");
            $stmt->execute([$id]);

            echo json_encode(["status" => "success", "message" => "Restaurant deleted"]);
            break;

        default:
            http_response_code(405);
            echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}
