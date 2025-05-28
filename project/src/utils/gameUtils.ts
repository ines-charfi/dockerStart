// src/utils/gameUtils.ts

import HTML5Logo from '../images/HTML5.svg';
import CSSLogo from '../images/css.svg';
import GitLogo from '../images/git.svg';
import ReactLogo from '../images/react.svg';
import TailwindLogo from '../images/tailwind.svg';

export const cardImages = [
  HTML5Logo,
  CSSLogo,
  GitLogo,
  ReactLogo,
  TailwindLogo,
];

export interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface Score {
  playerName: string;
  moves: number;
  date: string;
}

// Shuffle cards using Fisher-Yates algorithm
export const shuffleCards = (array: any[]): any[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Create a new game board with pairs of cards
export const createGameBoard = (pairCount: number = 5): Card[] => {
  const gameImages = cardImages.slice(0, pairCount);

  const cardPairs = gameImages.flatMap((image, index) => [
    { id: index * 2, value: image, isFlipped: false, isMatched: false },
    { id: index * 2 + 1, value: image, isFlipped: false, isMatched: false }
  ]);

  return shuffleCards(cardPairs);
};

// Save score to localStorage
export const saveScore = (playerName: string, moves: number) => {
  const scores = getScores();
  const newScore: Score = {
    playerName,
    moves,
    date: new Date().toISOString()
  };
  scores.push(newScore);
  scores.sort((a, b) => a.moves - b.moves);
  localStorage.setItem('memoryGameScores', JSON.stringify(scores.slice(0, 10)));
};

// Get scores from localStorage
export const getScores = (): Score[] => {
  const scores = localStorage.getItem('memoryGameScores');
  return scores ? JSON.parse(scores) : [];
};
