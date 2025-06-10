<?php
require_once __DIR__ . '/../db.php';

header('Content-Type: application/json');

$stmt = $db->prepare("SELECT * FROM jpos");
$stmt->execute();
$jpos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($jpos);
?>
