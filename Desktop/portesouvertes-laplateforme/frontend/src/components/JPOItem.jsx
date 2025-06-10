import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function JPOItem() {
    const { id } = useParams();
    const [jpo, setJpo] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        axios.get(`http://localhost/laplateforme-jpo/backend/api/jpo.php?id=${id}`)
            .then(res => setJpo(res.data[0]));

        if (user) {
            axios.get(`http://localhost/laplateforme-jpo/backend/api/user_events.php?user_id=${user.id}`)
                .then(res => {
                    const isReg = res.data.some(e => e.id == id);
                    setIsRegistered(isReg);
                });
        }
    }, [id, user]);

    const handleRegister = () => {
        axios.post('http://localhost/laplateforme-jpo/backend/api/user_events.php', {
            user_id: user.id,
            jpo_id: id
        }).then(() => setIsRegistered(true));
    };

    const handleUnregister = () => {
        axios.delete('http://localhost/laplateforme-jpo/backend/api/user_events.php', {
            data: { user_id: user.id, jpo_id: id }
        }).then(() => setIsRegistered(false));
    };

    if (!jpo) return <div>Chargement...</div>;

    return (
        <div>
            <h2>{jpo.title}</h2>
            <p>{jpo.location} - {new Date(jpo.date).toLocaleDateString()}</p>
            <p>{jpo.description}</p>
            {user && (
                isRegistered
                    ? <button onClick={handleUnregister}>Se désinscrire</button>
                    : <button onClick={handleRegister}>S'inscrire</button>
            )}
        </div>
    );
}

export default JPOItem;
