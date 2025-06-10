import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserEvents() {
    const [events, setEvents] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost/laplateforme-jpo/backend/api/user_events.php`, {
                params: { user_id: user.id }
            })
                .then(res => setEvents(res.data));
        }
    }, [user]);

    if (!user) return <div>Veuillez vous connecter</div>;

    return (
        <div>
            <h2>Mes inscriptions</h2>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <h3>{event.title}</h3>
                        <p>{event.location} - {new Date(event.date).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserEvents;
