<?php
// Moved to backend/public/api/auth/signup.php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

http_response_code(410);
echo json_encode([
    "status" => "error", 
    "message" => "This endpoint has been moved to backend/public/api/auth/signup.php"
]);
?>
