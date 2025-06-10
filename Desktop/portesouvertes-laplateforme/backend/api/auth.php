<?php
require_once __DIR__ . '/../db.php';

header('Content-Type: application/json');
session_start();

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['email']) && isset($data['password'])) {
    $email = $data['email'];
    $password = $data['password'];

    $stmt = $db->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user'] = $user;
        echo json_encode(['success' => true, 'message' => 'Connexion réussie', 'user' => $user]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Email ou mot de passe incorrect']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Données manquantes']);
}
?>
