<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../../db.php';

// Récupère les données envoyées en POST
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['email']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email ou mot de passe manquant']);
    exit;
}

$email = $data['email'];
$password = $data['password'];

// Prépare et exécute la requête pour vérifier l'utilisateur
$stmt = $db->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    // Succès : retourne l'utilisateur (sans le mot de passe)
    unset($user['password']);
    session_start();
    $_SESSION['user'] = $user;
    echo json_encode(['success' => true, 'message' => 'Connexion réussie', 'user' => $user]);
} else {
    // Échec
    echo json_encode(['success' => false, 'message' => 'Email ou mot de passe incorrect']);
}
?>
