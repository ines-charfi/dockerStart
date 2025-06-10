import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/events">Événements</Link></li>
                    {user && <li><Link to="/my-events">Mes inscriptions</Link></li>}
                    {user && <li><Link to="/profile">Profil</Link></li>}
                    {(user?.role === 'admin' || user?.role === 'moderator') && <li><Link to="/admin">Admin</Link></li>}
                    {!user && <li><Link to="/login">Connexion</Link></li>}
                    {!user && <li><Link to="/register">Inscription</Link></li>}
                    {user && <li><button onClick={() => { localStorage.removeItem('user'); window.location.href = '/' }}>Déconnexion</button></li>}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
// This component renders the header with navigation links.
// It conditionally displays links based on the user's authentication status and role.