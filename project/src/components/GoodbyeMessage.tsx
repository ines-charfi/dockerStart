import React from 'react';
import { Home } from 'lucide-react';
import './GoodbyeMessage.css';

interface GoodbyeMessageProps {
  onClose: () => void;
}

const GoodbyeMessage: React.FC<GoodbyeMessageProps> = ({ onClose }) => {
  return (
    <div className="goodbye-overlay">
      <div className="goodbye-modal">
        <h2 className="text-3xl font-bold mb-4">Merci d'avoir jouer ! 👋</h2>
        <p className="text-lg text-gray-600 mb-6">
          We hope you enjoyed the game. Come back soon for more memory challenges!
        </p>
        <button 
          onClick={onClose}
          className="home-button"
        >
          <Home size={24} />
         Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default GoodbyeMessage;