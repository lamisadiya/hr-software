<?php
$host = "localhost";       // or your DB host
$username = "root";        // your MySQL username
$password = "";            // your MySQL password
$database = "hr_schema";  // your actual database name


$conn = new mysqli($host, $username, $password, $database);


// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
