<?php
require_once '../db.php';


$sql = "SELECT l.*, e.name FROM employee_leaves l JOIN employees e ON l.employee_id = e.id ORDER BY l.submitted_at DESC";
$result = $conn->query($sql);


$leaves = [];
while ($row = $result->fetch_assoc()) {
    $leaves[] = $row;
}


echo json_encode($leaves);
