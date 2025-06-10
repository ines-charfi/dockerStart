<?php
require_once __DIR__ . '/../db.php';

header('Content-Type: application/json');
session_start();

// Vérification du rôle admin/moderateur
if (!isset($_SESSION['user']) || ($_SESSION['user']['role'] !== 'admin' && $_SESSION['user']['role'] !== 'moderator')) {
    http_response_code(403);
    echo json_encode(['error' => 'Accès interdit']);
    exit;
}

// Lister toutes les JPO
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $db->prepare("SELECT * FROM jpos");
    $stmt->execute();
    $jpos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Lister toutes les inscriptions
    $stmt = $db->prepare("
        SELECT r.id, u.name, u.email, j.title, j.date, r.present
        FROM registrations r
        JOIN users u ON r.user_id = u.id
        JOIN jpos j ON r.jpo_id = j.id
    ");
    $stmt->execute();
    $registrations = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Lister tous les commentaires
    $stmt = $db->prepare("
        SELECT c.id, u.name, j.title, c.content, c.created_at
        FROM comments c
        JOIN users u ON c.user_id = u.id
        JOIN jpos j ON c.jpo_id = j.id
    ");
    $stmt->execute();
    $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'jpos' => $jpos,
        'registrations' => $registrations,
        'comments' => $comments
    ]);
}

// Supprimer un commentaire (admin/moderator)
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['comment_id'])) {
    $commentId = $_GET['comment_id'];
    $stmt = $db->prepare("DELETE FROM comments WHERE id = ?");
    $stmt->execute([$commentId]);
    echo json_encode(['success' => true]);
}

// Ajouter/modifier/supprimer une JPO (admin)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SESSION['user']['role'] === 'admin') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['action']) && $data['action'] === 'add') {
        $stmt = $db->prepare("INSERT INTO jpos (title, description, location, date, capacity) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$data['title'], $data['description'], $data['location'], $data['date'], $data['capacity']]);
        echo json_encode(['success' => true]);
    } elseif (isset($data['action']) && $data['action'] === 'update') {
        $stmt = $db->prepare("UPDATE jpos SET title=?, description=?, location=?, date=?, capacity=? WHERE id=?");
        $stmt->execute([$data['title'], $data['description'], $data['location'], $data['date'], $data['capacity'], $data['id']]);
        echo json_encode(['success' => true]);
    } elseif (isset($data['action']) && $data['action'] === 'delete') {
        $stmt = $db->prepare("DELETE FROM jpos WHERE id=?");
        $stmt->execute([$data['id']]);
        echo json_encode(['success' => true]);
    }
}
?>
// Ajouter un commentaire (admin/moderator)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['jpo_id'])) {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['content']) && !empty($data['content'])) {
        $stmt = $db->prepare("INSERT INTO comments (user_id, jpo_id, content) VALUES (?, ?, ?)");
        $stmt->execute([$_SESSION['user']['id'], $_GET['jpo_id'], $data['content']]);
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Contenu du commentaire requis']);
    }
}