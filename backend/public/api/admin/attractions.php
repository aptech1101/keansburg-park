<?php
require_once __DIR__ . "/../../../config/db.php";
require_once __DIR__ . "/../../../middleware/auth.php";

$pdo = Database::getInstance();

header("Content-Type: application/json");
$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case "GET":
            $stmt = $pdo->query("
                SELECT a.*, z.name AS zone_name 
                FROM attractions a 
                LEFT JOIN zones z ON a.zone_id = z.id
            ");
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(["status" => "success", "data" => $data]);
            break;

        case "POST":
            // Nếu là JSON thì đọc body
            $input = json_decode(file_get_contents("php://input"), true);

            // Nếu thất bại => nghĩa là multipart/form-data
            if (!$input) {
                $input = $_POST;
            }

            $zone_id = $input['zone_id'] ?? null;
            $name = $input['name'] ?? null;
            $description = $input['description'] ?? "";
            $category = $input['category'] ?? null;
            $details = $input['details'] ?? null;
            $features = $input['features'] ?? null; // array | JSON string | null

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

            // Xử lý file upload nếu có
            $imageUrl = $input['image_url'] ?? null;
            if (!empty($_FILES['image']['name'])) {
                $targetDir = __DIR__ . "/../../../uploads/";
                if (!is_dir($targetDir)) {
                    mkdir($targetDir, 0777, true);
                }
                $fileName = time() . "_" . basename($_FILES["image"]["name"]);
                $targetFile = $targetDir . $fileName;

                if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
                    $imageUrl = "/uploads/" . $fileName;
                } else {
                    echo json_encode(["status" => "error", "message" => "Upload failed"]);
                    exit();
                }
            }

            if (!$zone_id || !$name || !$imageUrl) {
                echo json_encode(["status" => "error", "message" => "zone_id, name, and image_url are required"]);
                exit();
            }

            $stmt = $pdo->prepare("INSERT INTO attractions (zone_id, name, description, image_url, category, features, details) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$zone_id, $name, $description, $imageUrl, $category, $featuresJson, $details]);

            echo json_encode(["status" => "success", "message" => "Attraction created"]);
            break;

        case "PUT":
            // PUT không có $_POST, phải tự parse
            if (strpos($_SERVER["CONTENT_TYPE"], "multipart/form-data") !== false) {
                parse_str(file_get_contents("php://input"), $putVars);
                $input = $putVars + $_POST;
            } else {
                $input = json_decode(file_get_contents("php://input"), true);
            }

            $id = $input['id'] ?? null;
            $zone_id = $input['zone_id'] ?? null;
            $name = $input['name'] ?? null;
            $description = $input['description'] ?? "";
            $imageUrl = $input['image_url'] ?? null;
            $category = $input['category'] ?? null;
            $details = $input['details'] ?? null;
            $features = $input['features'] ?? null;

            if (is_array($features)) {
                $featuresJson = json_encode($features, JSON_UNESCAPED_UNICODE);
            } elseif (is_string($features)) {
                $decoded = json_decode($features, true);
                $featuresJson = is_array($decoded) ? json_encode($decoded, JSON_UNESCAPED_UNICODE) : $features;
            } else {
                $featuresJson = null;
            }

            // upload ảnh mới nếu có
            if (!empty($_FILES['image']['name'])) {
                $targetDir = __DIR__ . "/../../../uploads/";
                if (!is_dir($targetDir)) {
                    mkdir($targetDir, 0777, true);
                }
                $fileName = time() . "_" . basename($_FILES["image"]["name"]);
                $targetFile = $targetDir . $fileName;
                if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
                    $imageUrl = "/uploads/" . $fileName;
                }
            }

            if (!$id || !$zone_id || !$name || !$imageUrl) {
                echo json_encode(["status" => "error", "message" => "id, zone_id, name, and image_url are required"]);
                exit();
            }

            $stmt = $pdo->prepare("UPDATE attractions SET zone_id=?, name=?, description=?, image_url=?, category=?, features=?, details=? WHERE id=?");
            $stmt->execute([$zone_id, $name, $description, $imageUrl, $category, $featuresJson, $details, $id]);

            echo json_encode(["status" => "success", "message" => "Attraction updated"]);
            break;

        case "DELETE":
            $id = $_GET['id'] ?? null;
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "id is required"]);
                exit();
            }
            $stmt = $pdo->prepare("DELETE FROM attractions WHERE id=?");
            $stmt->execute([$id]);
            echo json_encode(["status" => "success", "message" => "Attraction deleted"]);
            break;

        default:
            http_response_code(405);
            echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
