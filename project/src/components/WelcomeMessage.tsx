import React from 'react';
import { Play } from 'lucide-react';
import './WelcomeMessage.css';

interface WelcomeMessageProps {
  onStart: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onStart }) => {
  return (
    <div className="welcome-overlay">
      <div className="welcome-modal">
        <h1 className="text-3xl font-bold mb-4">Bienvenue au Memorynes Game! 🎮</h1>
        <p className="text-lg text-gray-600 mb-6">
         Jouez et matchez les cartes ensemble. Amusez-vous!
        </p>
        <button 
          onClick={onStart}
          className="start-button"
        >
          <Play size={24} />
          Start Game
        </button>
      </div>
    </div>
  );
};

export default WelcomeMessage;