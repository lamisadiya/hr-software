<?php
require 'db.php';

$checklist_id = $_POST['checklist_item_id'];
$status = $_POST['status'];

$sql = "UPDATE uploads SET status = ?, updated_at = NOW() WHERE checklist_item_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $status, $checklist_id);
$stmt->execute();

echo json_encode(["success" => true]);
?>
