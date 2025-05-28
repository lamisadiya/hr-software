<?php
require_once '../db.php';


$data = json_decode(file_get_contents("php://input"));


$employee_id = $data->employee_id;
$leave_type = $data->leave_type;
$from_date = $data->from_date;
$to_date = $data->to_date;
$reason = $data->reason;


$sql = "INSERT INTO employee_leaves (employee_id, leave_type, from_date, to_date, reason)
        VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("issss", $employee_id, $leave_type, $from_date, $to_date, $reason);


if ($stmt->execute()) {
    echo json_encode(["message" => "Leave saved"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Failed to save leave"]);
}
