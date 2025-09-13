// api/admin/tickets.php
<?php
require_once '../../config/db.php';
require_once '../../middleware/auth.php';

checkAdmin();

header("Content-Type: application/json");
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $sql = "SELECT * FROM tickets";
    $result = $conn->query($sql)->fetch_all(MYSQLI_ASSOC);
    echo json_encode(["status" => "success", "data" => $result]);
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $sql = "INSERT INTO tickets (zone_id, weekday_price, weekend_price, description) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("idds", $data['zone_id'], $data['weekday_price'], $data['weekend_price'], $data['description']);
    $stmt->execute();
    echo json_encode(["status" => "success", "message" => "Ticket created"]);
}

if ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    $sql = "UPDATE tickets SET zone_id=?, weekday_price=?, weekend_price=?, description=? WHERE ticket_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iddsi", $data['zone_id'], $data['weekday_price'], $data['weekend_price'], $data['description'], $data['ticket_id']);
    $stmt->execute();
    echo json_encode(["status" => "success", "message" => "Ticket updated"]);
}

if ($method === 'DELETE') {
    parse_str(file_get_contents("php://input"), $_DELETE);
    $id = intval($_DELETE['id']);
    $sql = "DELETE FROM tickets WHERE ticket_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    echo json_encode(["status" => "success", "message" => "Ticket deleted"]);
}
?>
