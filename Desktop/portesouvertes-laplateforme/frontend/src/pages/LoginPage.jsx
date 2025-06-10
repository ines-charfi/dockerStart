import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost/laplateforme-jpo/backend/api/auth.php', { email, password });
      if (res.data.success) {
        // Stocke l'utilisateur dans localStorage
        localStorage.setItem('user', JSON.stringify(res.data.user));
        // Redirige vers la page d'accueil ou le profil
        navigate('/');
      } else {
        setError(res.data.message || 'Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Erreur lors de la connexion');
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      <p>
        Pas encore de compte ? <a href="/register">Inscrivez-vous ici</a>
      </p>
    </div>
  );
}

export default LoginPage;
// Note: This code assumes you have a backend API endpoint at 'http://localhost/laplateforme-jpo/backend/api/auth.php'
// that handles authentication and returns a user object on successful login.