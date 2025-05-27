<?php
require 'db.php';

$country_id = $_GET['country_id'];
$sql = "SELECT ci.id, ci.item_name, ci.template_url, u.status, u.updated_at, u.file_path
        FROM checklist_items ci
        LEFT JOIN uploads u ON ci.id = u.checklist_item_id
        WHERE ci.country_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $country_id);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
echo json_encode($data);
?>
