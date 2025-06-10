<?php
require_once __DIR__ . '/../db.php';

header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Lister les inscriptions de l'utilisateur
    $user_id = $data['user_id'] ?? null;
    if ($user_id) {
        $stmt = $db->prepare("
            SELECT j.*, r.id AS registration_id, r.present
            FROM jpos j
            JOIN registrations r ON j.id = r.jpo_id
            WHERE r.user_id = ?
        ");
        $stmt->execute([$user_id]);
        $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($events);
    } else {
        echo json_encode(['error' => 'Utilisateur non identifié']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // S'inscrire à une JPO
    $user_id = $data['user_id'];
    $jpo_id = $data['jpo_id'];
    $stmt = $db->prepare("INSERT INTO registrations (user_id, jpo_id) VALUES (?, ?)");
    $stmt->execute([$user_id, $jpo_id]);
    echo json_encode(['success' => true]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Se désinscrire d'une JPO
    $user_id = $data['user_id'];
    $jpo_id = $data['jpo_id'];
    $stmt = $db->prepare("DELETE FROM registrations WHERE user_id = ? AND jpo_id = ?");
    $stmt->execute([$user_id, $jpo_id]);
    echo json_encode(['success' => true]);
}
?>
