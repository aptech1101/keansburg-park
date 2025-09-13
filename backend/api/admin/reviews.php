// api/admin/reviews.php
<?php
require_once '../../config/db.php';
require_once '../../middleware/auth.php';

checkAdmin();

header("Content-Type: application/json");
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $sql = "SELECT r.*, u.username FROM reviews r
            JOIN users u ON r.user_id = u.user_id
            ORDER BY r.created_at DESC";
    $result = $conn->query($sql)->fetch_all(MYSQLI_ASSOC);
    echo json_encode(["status" => "success", "data" => $result]);
}

if ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    $sql = "UPDATE reviews SET status=? WHERE review_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $data['status'], $data['review_id']);
    $stmt->execute();
    echo json_encode(["status" => "success", "message" => "Review updated"]);
}
?>
