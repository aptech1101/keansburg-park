<?php
require_once __DIR__ . "/../../../config/db.php";
require_once __DIR__ . "/../../../middleware/auth.php";

$pdo = Database::getInstance();

header("Content-Type: application/json");
$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case "GET":
            $stmt = $pdo->query("SELECT id, title, description, image_url FROM gallery ORDER BY id DESC");
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(["status" => "success", "data" => $data]);
            break;

        case "POST":
            // Nhận dữ liệu
            $input = json_decode(file_get_contents("php://input"), true);
            if (!$input) $input = $_POST;

            $title = $input['title'] ?? null;
            $description = $input['description'] ?? "";
            $imageUrl = $input['image_url'] ?? null;

            // Nếu có file upload thì xử lý
            if (!empty($_FILES['image']['name'])) {
                $targetDir = __DIR__ . "/../../../uploads/gallery/";
                if (!is_dir($targetDir)) {
                    mkdir($targetDir, 0777, true);
                }
                $fileName = time() . "_" . basename($_FILES["image"]["name"]);
                $targetFile = $targetDir . $fileName;

                if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
                    $imageUrl = "/uploads/gallery/" . $fileName;
                } else {
                    echo json_encode(["status" => "error", "message" => "Upload failed"]);
                    exit();
                }
            }

            if (!$title || !$imageUrl) {
                echo json_encode(["status" => "error", "message" => "title and image are required"]);
                exit();
            }

            $stmt = $pdo->prepare("INSERT INTO gallery (title, description, image_url) VALUES (?, ?, ?)");
            $stmt->execute([$title, $description, $imageUrl]);

            echo json_encode(["status" => "success", "message" => "Gallery item created"]);
            break;

        case "PUT":
            // Parse input
            if (strpos($_SERVER["CONTENT_TYPE"], "multipart/form-data") !== false) {
                parse_str(file_get_contents("php://input"), $putVars);
                $input = $putVars + $_POST;
            } else {
                $input = json_decode(file_get_contents("php://input"), true);
            }

            $id = $input['id'] ?? null;
            $title = $input['title'] ?? null;
            $description = $input['description'] ?? "";
            $imageUrl = $input['image_url'] ?? null;

            // Nếu có file upload thì thay ảnh mới
            if (!empty($_FILES['image']['name'])) {
                $targetDir = __DIR__ . "/../../../uploads/gallery/";
                if (!is_dir($targetDir)) {
                    mkdir($targetDir, 0777, true);
                }
                $fileName = time() . "_" . basename($_FILES["image"]["name"]);
                $targetFile = $targetDir . $fileName;

                if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
                    $imageUrl = "/uploads/gallery/" . $fileName;
                }
            }

            if (!$id || !$title || !$imageUrl) {
                echo json_encode(["status" => "error", "message" => "id, title and image are required"]);
                exit();
            }

            $stmt = $pdo->prepare("UPDATE gallery SET title=?, description=?, image_url=? WHERE id=?");
            $stmt->execute([$title, $description, $imageUrl, $id]);

            echo json_encode(["status" => "success", "message" => "Gallery item updated"]);
            break;

        case "DELETE":
            $id = $_GET['id'] ?? null;
            if (!$id) {
                echo json_encode(["status" => "error", "message" => "id is required"]);
                exit();
            }
            $stmt = $pdo->prepare("DELETE FROM gallery WHERE id=?");
            $stmt->execute([$id]);
            echo json_encode(["status" => "success", "message" => "Gallery item deleted"]);
            break;

        default:
            http_response_code(405);
            echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
