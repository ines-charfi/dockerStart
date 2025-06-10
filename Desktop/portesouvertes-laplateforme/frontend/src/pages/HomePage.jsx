import React from 'react';
import JPOList from '../components/JPOList';

function HomePage() {
    return (
        <div>
            <h1>Bienvenue à La Plateforme</h1>
            <section>
                <h2>Notre histoire</h2>
                <p>La Plateforme est une école innovante qui forme aux métiers du numérique à Marseille, Cannes, Martigues et Paris.</p>
            </section>
            <section>
                <h2>Nos événements</h2>
                <JPOList />
            </section>
            <section>
                <h2>Nos spécialités</h2>
                <ul>
                    <li>Développement web</li>
                    <li>Cybersécurité</li>
                    <li>Intelligence artificielle</li>
                </ul>
            </section>
            <section>
                <h2>Localisation</h2>
                <p>Marseille, Cannes, Martigues, Paris</p>
            </section>
        </div>
    );
}

export default HomePage;
