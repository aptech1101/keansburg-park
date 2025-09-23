<?php
require_once __DIR__ . '/../../../config/env.php';
require_once __DIR__ . '/../../../config/db.php';
require_once __DIR__ . '/../../../middleware/auth.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Nếu là preflight request của CORS thì dừng luôn
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
checkAdmin();

$pdo = Database::getInstance();

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $stmt = $pdo->prepare("SELECT * FROM attractions WHERE id = ?");
            $stmt->execute([$_GET['id']]);
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $pdo->query("
                SELECT a.*, z.name as zone_name 
                FROM attractions a
                JOIN zones z ON a.zone_id = z.id
                ORDER BY a.id DESC
            ");
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode(["status" => "success", "data" => $data]);
        break;

    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);
        $stmt = $pdo->prepare("INSERT INTO attractions (zone_id, name, description, image_url) VALUES (?, ?, ?, ?)");
        $stmt->execute([$input['zone_id'], $input['name'], $input['description'], $input['image_url']]);
        echo json_encode(["status" => "success", "message" => "Attraction created"]);
        break;

    case 'PUT':
        $input = json_decode(file_get_contents("php://input"), true);
        $stmt = $pdo->prepare("UPDATE attractions SET zone_id=?, name=?, description=?, image_url=? WHERE id=?");
        $stmt->execute([$input['zone_id'], $input['name'], $input['description'], $input['image_url'], $input['id']]);
        echo json_encode(["status" => "success", "message" => "Attraction updated"]);
        break;

    case 'DELETE':        
        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = $pdo->prepare("DELETE FROM attractions WHERE id=?");
            $stmt->execute([$id]);
            echo json_encode(["status" => "success", "message" => "Attraction deleted"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Missing id"]);
            }
        break;
        
}
