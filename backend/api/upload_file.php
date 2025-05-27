<?php
require 'db.php';

$checklist_id = $_POST['checklist_item_id'];
$uploaded_by = $_POST['uploaded_by'];
$file = $_FILES['file'];

$target_dir = "uploads/";
$target_file = $target_dir . basename($file["name"]);
move_uploaded_file($file["tmp_name"], $target_file);

$sql = "REPLACE INTO uploads (checklist_item_id, uploaded_by, file_path, status, updated_at) VALUES (?, ?, ?, 'Completed', NOW())";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iss", $checklist_id, $uploaded_by, $target_file);
$stmt->execute();

echo json_encode(["success" => true]);
?>
