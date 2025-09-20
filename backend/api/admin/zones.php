<?php
// backend/api/admin/zones.php
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
                // Chi tiết 1 zone + attractions, restaurants, tickets
                $zoneId = intval($_GET['id']);

                // Zone info
                $stmt = $pdo->prepare("SELECT * FROM zones WHERE id = ?");
                $stmt->execute([$zoneId]);
                $zone = $stmt->fetch(PDO::FETCH_ASSOC);

                if (!$zone) {
                    echo json_encode(["status" => "error", "message" => "Zone not found"]);
                    exit;
                }

                // Attractions
                $stmt = $pdo->prepare("SELECT * FROM attractions WHERE id = ?");
                $stmt->execute([$zoneId]);
                $zone['attractions'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

                // Restaurants
                $stmt = $pdo->prepare("SELECT * FROM restaurants WHERE id = ?");
                $stmt->execute([$zoneId]);
                $zone['restaurants'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

                // Tickets
                $stmt = $pdo->prepare("SELECT * FROM tickets WHERE id = ?");
                $stmt->execute([$zoneId]);
                $zone['tickets'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

                echo json_encode(["status" => "success", "data" => $zone]);
            } else {
                // Danh sách zones + phân trang + search
                $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
                $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 20;
                $offset = ($page - 1) * $limit;
                $search = isset($_GET['search']) ? "%" . $_GET['search'] . "%" : null;

                if ($search) {
                    $stmt = $pdo->prepare("SELECT * FROM zones WHERE name LIKE :search ORDER BY id DESC LIMIT :limit OFFSET :offset");
                    $stmt->bindParam(':search', $search, PDO::PARAM_STR);
                } else {
                    $stmt = $pdo->prepare("SELECT * FROM zones ORDER BY id DESC LIMIT :limit OFFSET :offset");
                }
                $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
                $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
                $stmt->execute();
                $zones = $stmt->fetchAll(PDO::FETCH_ASSOC);

                // Đếm tổng để hỗ trợ phân trang
                if ($search) {
                    $countStmt = $pdo->prepare("SELECT COUNT(*) FROM zones WHERE name LIKE ?");
                    $countStmt->execute(["%".$_GET['search']."%"]);
                } else {
                    $countStmt = $pdo->query("SELECT COUNT(*) FROM zones");
                }
                $total = $countStmt->fetchColumn();

                echo json_encode([
                    "status" => "success",
                    "data" => $zones,
                    "pagination" => [
                        "page" => $page,
                        "limit" => $limit,
                        "total" => intval($total)
                    ]
                ]);
            }
            break;

        case 'POST':
            $input = json_decode(file_get_contents("php://input"), true);

            if (!isset($input['name'], $input['description'], $input['code'])) {
                echo json_encode(["status" => "error", "message" => "Missing required fields"]);
                exit;
            }

            $stmt = $pdo->prepare("INSERT INTO zones (name, description, code) VALUES (?, ?, ?)");
            $stmt->execute([$input['name'], $input['description'], $input['code']]);

            echo json_encode(["status" => "success", "message" => "Zone created"]);
            break;

        case 'PUT':
            $input = json_decode(file_get_contents("php://input"), true);

            if (!isset($input['id'])) {
                echo json_encode(["status" => "error", "message" => "Zone ID is required"]);
                exit;
            }

            $stmt = $pdo->prepare("UPDATE zones SET name=?, description=?, code=? WHERE id=?");
            $stmt->execute([$input['name'], $input['description'], $input['code'], $input['id']]);

            echo json_encode(["status" => "success", "message" => "Zone updated"]);
            break;

        case 'DELETE':
            $id = $_GET['id'] ?? null;
            if ($id) {
                $stmt = $pdo->prepare("DELETE FROM zones WHERE id=?");
                $stmt->execute([$id]);
                echo json_encode(["status" => "success", "message" => "Zone deleted"]);
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
