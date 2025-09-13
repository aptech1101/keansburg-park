// api/admin/dashboard.php
<?php
require_once '../../config/db.php';
require_once '../../middleware/auth.php';

checkAdmin(); // Middleware check role

header("Content-Type: application/json");

$response = [];

// Tổng số user
$sql = "SELECT COUNT(*) as total_users FROM users";
$res = $conn->query($sql);
$response['total_users'] = $res->fetch_assoc()['total_users'];

// Tổng số booking
$sql = "SELECT COUNT(*) as total_bookings FROM bookings";
$res = $conn->query($sql);
$response['total_bookings'] = $res->fetch_assoc()['total_bookings'];

// Tổng doanh thu
$sql = "SELECT SUM(amount) as total_revenue FROM payments WHERE status='paid'";
$res = $conn->query($sql);
$response['total_revenue'] = $res->fetch_assoc()['total_revenue'] ?? 0;

// Tổng số review
$sql = "SELECT COUNT(*) as total_reviews FROM reviews";
$res = $conn->query($sql);
$response['total_reviews'] = $res->fetch_assoc()['total_reviews'];

echo json_encode([
    "status" => "success",
    "data" => $response
]);
?>
