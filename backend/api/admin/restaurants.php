<?php
// backend/api/admin/restaurants.php
require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../middleware/auth.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
checkAdmin();

$config = require __DIR__ . '/../../config/config.php';
$pdo = new PDO(
    "mysql:host={$config['db']['host']};port={$config['db']['port']};dbname={$config['db']['name']};charset={$config['db']['charset']}",
    $config['db']['user'],
    $config['db']['pass'],
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);


try {
    switch ($method) {
        case 'GET':
            if (isset($_GET['id'])) {
                $stmt = $pdo->prepare("SELECT * FROM restaurants WHERE id=?");
                $stmt->execute([$_GET['id']]);
                $data = $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                $stmt = $pdo->query("SELECT r.*, z.name as zone_name 
                                      FROM restaurants r 
                                      JOIN zones z ON r.zone_id = z.id
                                      ORDER BY r.id DESC");
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            echo json_encode(["status" => "success", "data" => $data]);
            break;

        case 'POST':
            $input = json_decode(file_get_contents("php://input"), true);
            $stmt = $pdo->prepare("INSERT INTO restaurants (zone_id, name, description, image_url) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                $input['zone_id'],
                $input['name'],
                $input['description'],
                $input['image_url']
            ]);
            echo json_encode(["status" => "success", "message" => "Restaurant created"]);
            break;

        case 'PUT':
            $input = json_decode(file_get_contents("php://input"), true);
            $stmt = $pdo->prepare("UPDATE restaurants SET zone_id=?, name=?, description=?, image_url=? WHERE id=?");
            $stmt->execute([
                $input['zone_id'],
                $input['name'],
                $input['description'],
                $input['image_url'],
                $input['id']
            ]);
            echo json_encode(["status" => "success", "message" => "Restaurant updated"]);
            break;

        case 'DELETE':        
            $id = $_GET['id'] ?? null;
            if ($id) {
                $stmt = $pdo->prepare("DELETE FROM restaurants WHERE id=?");
                $stmt->execute([$id]);
                echo json_encode(["status" => "success", "message" => "Restaurant deleted"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Missing id"]);
                }
            break;

        default:
            echo json_encode(["status" => "error", "message" => "Method not allowed"]);
            break;
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
