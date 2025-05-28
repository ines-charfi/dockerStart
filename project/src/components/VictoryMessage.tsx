import React, { useEffect, useState } from 'react';
import './VictoryMessage.css';
import { saveScore } from '../utils/gameUtils';
import useSound from 'use-sound';

interface VictoryMessageProps {
  moves: number;
  onRestart: () => void;
  onScoreSaved: () => void;
}

const VictoryMessage: React.FC<VictoryMessageProps> = ({ moves, onRestart, onScoreSaved }) => {
  const [playerName, setPlayerName] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [playVictory] = useSound('/sounds/victory.mp3', { volume: 0.5 });

  const handleSubmitScore = () => {
    if (playerName.trim()) {
      saveScore(playerName.trim(), moves);
      setHasSubmitted(true);
      onScoreSaved();
      playVictory();
    }
  };

  useEffect(() => {
    const confetti = () => {
      const container = document.querySelector('.confetti-container');
      if (!container) return;
      
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 5}s`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        container.appendChild(confetti);
      }
      
      setTimeout(() => {
        const elements = document.querySelectorAll('.confetti');
        elements.forEach(el => el.remove());
      }, 5000);
    };
    
    confetti();
    playVictory();
  }, [playVictory]);

  return (
    <div className="victory-overlay">
      <div className="confetti-container"></div>
      <div className="victory-modal">
        <h2 className="text-3xl font-bold mb-2">🎉 Congratulations! 🎉</h2>
        <p className="text-xl mb-4">You've found all pairs in {moves} moves!</p>
        
        {!hasSubmitted ? (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button 
              onClick={handleSubmitScore}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors mb-2"
            >
              Save Score
            </button>
          </div>
        ) : (
          <p className="text-green-600 mb-4">Score saved successfully!</p>
        )}

        <button 
          onClick={onRestart} 
          className="w-full px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default VictoryMessage;