import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [data, setData] = useState({ jpos: [], registrations: [], comments: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost/laplateforme-jpo/backend/api/admin.php', { withCredentials: true });
                setData(res.data);
                setLoading(false);
            } catch (err) {
                alert('Accès refusé ou erreur serveur');
                window.location.href = '/login';
            }
        };
        fetchData();
    }, []);

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost/laplateforme-jpo/backend/api/admin.php?comment_id=${commentId}`, { withCredentials: true });
            setData(prev => ({
                ...prev,
                comments: prev.comments.filter(c => c.id !== commentId)
            }));
        } catch (err) {
            alert('Erreur lors de la suppression');
        }
    };

    if (loading) return <div>Chargement...</div>;

    return (
        <div>
            <h2>Gestion des JPO</h2>
            <ul>
                {data.jpos.map(jpo => (
                    <li key={jpo.id}>
                        {jpo.title} - {jpo.location} ({new Date(jpo.date).toLocaleDateString()})
                    </li>
                ))}
            </ul>

            <h2>Inscriptions</h2>
            <ul>
                {data.registrations.map(reg => (
                    <li key={reg.id}>
                        {reg.name} ({reg.email}) : {reg.title} - {new Date(reg.date).toLocaleDateString()} - {reg.present ? 'Présent' : 'Inscrit'}
                    </li>
                ))}
            </ul>

            <h2>Commentaires</h2>
            <ul>
                {data.comments.map(comment => (
                    <li key={comment.id}>
                        {comment.name} : {comment.title} - {comment.content}
                        <button onClick={() => handleDeleteComment(comment.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminDashboard;
// This component fetches and displays JPOs, registrations, and comments for admin users.
// It allows the admin to delete comments and view details of JPOs and registrations.