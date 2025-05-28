import  { useState, useEffect } from 'react';
import Card from './components/Card';
import Button from './components/Button';
import VictoryMessage from './components/VictoryMessage';
import Scoreboard from './components/Scoreboard';
import WelcomeMessage from './components/WelcomeMessage';
import GoodbyeMessage from './components/GoodbyeMessage';
import AudioController from './components/AudioController';
import { useMemoryGame } from './hooks/useMemoryGame';
import { getScores, Score } from './utils/gameUtils';
import './App.css';
import html from './images/HTML5.svg';
import css from './images/css.svg';
import git from './images/git.svg';
import reactLogo from './images/react.svg';
import tailwind from './images/tailwind.svg';

const Logo = [html, css, git, reactLogo, tailwind];


function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showGoodbye, setShowGoodbye] = useState(false);
  const [difficulty, setDifficulty] = useState<number>(8);
  const { cards, moves, isGameWon, handleCardClick, restartGame } = useMemoryGame(difficulty);
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    setScores(getScores());
  }, [isGameWon]);

  const handleStart = () => {
    setShowWelcome(false);
  };

  const handleRestart = () => {
    restartGame();
  };

  const handleQuit = () => {
    setShowGoodbye(true);
  };

  const handleReturnHome = () => {
    setShowGoodbye(false);
    setShowWelcome(true);
    restartGame();
  };

  const handleDifficultyChange = (newDifficulty: number) => {
    setDifficulty(newDifficulty);
    setTimeout(restartGame, 0);
  };

  if (showWelcome) {
    return (
      <>
        <AudioController />
        <WelcomeMessage onStart={handleStart} />
      </>
    );
  }

  return (
    <div className="app-container">
      <AudioController />
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-7xl mx-auto p-4">
        <div className="game-wrapper md:flex-1">
          <header className="game-header">
            <h1 className="game-title">Memoryines Game</h1>
            <div className="game-controls">
              <div className="difficulty-controls">
                <span className="difficulty-label">Difficulté:</span>
                <div className="difficulty-buttons">
                  <button 
                    className={`difficulty-button ${difficulty === 6 ? 'active' : ''}`}
                    onClick={() => handleDifficultyChange(6)}
                  >
                    Facile
                  </button>
                  <button 
                    className={`difficulty-button ${difficulty === 8 ? 'active' : ''}`}
                    onClick={() => handleDifficultyChange(8)}
                  >
                    Moyen
                  </button>
                  <button 
                    className={`difficulty-button ${difficulty === 12 ? 'active' : ''}`}
                    onClick={() => handleDifficultyChange(12)}
                  >
                    Difficile
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleRestart}>Rejouer</Button>
                <button 
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  onClick={handleQuit}
                >
                  Quitter le jeu
                </button>
              </div>
            </div>
            <div className="game-stats">
              <div className="stat-item">
                <span className="stat-label">Moves:</span>
                <span className="stat-value">{moves}</span>
              </div>
            </div>
          </header>
          <main className="game-board" data-pairs={difficulty}>
            {cards.map((card) => (
              <Card
                key={card.id}
                id={card.id}
                value={card.value}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onClick={handleCardClick}
              />
            ))}
          </main>
        </div>
        <Scoreboard scores={scores} />
      </div>
      {isGameWon && (
        <VictoryMessage
          moves={moves}
          onRestart={handleRestart}
          onScoreSaved={() => {}}
        />
      )}
      {showGoodbye && <GoodbyeMessage onClose={handleReturnHome} />}
    </div>
  );
}

export default App;