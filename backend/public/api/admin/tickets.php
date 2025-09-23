<?php
// backend/api/admin/tickets.php
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

$method = $_SERVER['REQUEST_METHOD'];
checkAdmin();

$pdo = Database::getInstance();


try {
    switch ($method) {
        case 'GET':
            if (isset($_GET['id'])) {
                $stmt = $pdo->prepare("SELECT * FROM tickets WHERE id=?");
                $stmt->execute([$_GET['id']]);
                $data = $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                $stmt = $pdo->query("
                    SELECT t.*, z.name as zone_name 
                    FROM tickets t 
                    JOIN zones z ON t.zone_id = z.id 
                    ORDER BY t.id DESC
                ");
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            echo json_encode(["status" => "success", "data" => $data]);
            break;

        case 'POST':
            $input = json_decode(file_get_contents("php://input"), true);
            $stmt = $pdo->prepare("
                INSERT INTO tickets (zone_id, weekday_price, weekend_price, description) 
                VALUES (?, ?, ?, ?)
            ");
            $stmt->execute([
                $input['zone_id'],
                $input['weekday_price'],
                $input['weekend_price'],
                $input['description']
            ]);
            echo json_encode(["status" => "success", "message" => "Ticket created"]);
            break;

        case 'PUT':
            $input = json_decode(file_get_contents("php://input"), true);
            $stmt = $pdo->prepare("
                UPDATE tickets 
                SET zone_id=?, weekday_price=?, weekend_price=?, description=? 
                WHERE id=?
            ");
            $stmt->execute([
                $input['zone_id'],
                $input['weekday_price'],
                $input['weekend_price'],
                $input['description'],
                $input['id']
            ]);
            echo json_encode(["status" => "success", "message" => "Ticket updated"]);
            break;

        case 'DELETE':        
            $id = $_GET['id'] ?? null;
            if ($id) {
                $stmt = $pdo->prepare("DELETE FROM tickets WHERE id=?");
                $stmt->execute([$id]);
                echo json_encode(["status" => "success", "message" => "Ticket deleted"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Missing id"]);
                }
            break;

        default:
            http_response_code(405);
            echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
