import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function JPOList() {
    const [jpos, setJpos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/laplateforme-jpo/backend/api/jpo.php')
            .then(res => setJpos(res.data));
    }, []);

    return (
        <div>
            <h2>Nos Journées Portes Ouvertes</h2>
            <ul>
                {jpos.map(jpo => (
                    <li key={jpo.id}>
                        <h3>{jpo.title}</h3>
                        <p>{jpo.location} - {new Date(jpo.date).toLocaleDateString()}</p>
                        <Link to={`/jpo/${jpo.id}`}>Voir détails</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default JPOList;
