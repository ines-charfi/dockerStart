<?php
require_once __DIR__ . '/../db.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['email']) && isset($data['password']) && isset($data['name'])) {
    $email = $data['email'];
    $password = password_hash($data['password'], PASSWORD_DEFAULT);
    $name = $data['name'];

    $stmt = $db->prepare("INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, 'user')");
    $stmt->execute([$email, $password, $name]);

    echo json_encode(['success' => true, 'message' => 'Inscription réussie']);
} else {
    echo json_encode(['success' => false, 'message' => 'Données manquantes']);
}
?>
