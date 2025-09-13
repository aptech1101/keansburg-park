// api/admin/orders.php
<?php
require_once '../../config/db.php';
require_once '../../middleware/auth.php';

checkAdmin();

header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['id'])) {
        // Chi tiết đơn
        $id = intval($_GET['id']);
        $sql = "SELECT b.*, u.full_name, u.email, u.phone 
                FROM bookings b
                JOIN users u ON b.user_id = u.user_id
                WHERE b.booking_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_assoc();

        // Chi tiết vé trong đơn
        $sql = "SELECT bd.*, t.description 
                FROM bookingdetails bd
                JOIN tickets t ON bd.ticket_id = t.ticket_id
                WHERE bd.booking_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $items = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

        $result['items'] = $items;

        echo json_encode(["status" => "success", "data" => $result]);
    } else {
        // Danh sách đơn
        $sql = "SELECT b.booking_id, b.booking_code, u.full_name, b.subtotal, b.status, b.created_at
                FROM bookings b
                JOIN users u ON b.user_id = u.user_id
                ORDER BY b.created_at DESC";
        $result = $conn->query($sql)->fetch_all(MYSQLI_ASSOC);
        echo json_encode(["status" => "success", "data" => $result]);
    }
}

if ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = intval($data['id']);
    $status = $data['status'];

    $sql = "UPDATE bookings SET status=? WHERE booking_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $status, $id);
    $stmt->execute();

    echo json_encode(["status" => "success", "message" => "Order updated"]);
}
?>
