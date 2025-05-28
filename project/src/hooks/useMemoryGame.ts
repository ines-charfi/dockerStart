import { useState, useEffect } from 'react';
import { Card, createGameBoard } from '../utils/gameUtils';

interface MemoryGameState {
  cards: Card[];
  flippedCards: number[];
  matchedPairs: number;
  moves: number;
  isGameWon: boolean;
}

export const useMemoryGame = (pairCount: number = 8) => {
  const [gameState, setGameState] = useState<MemoryGameState>({
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    isGameWon: false,
  });

  // Initialize or reset the game
  const initGame = () => {
    setGameState({
      cards: createGameBoard(pairCount),
      flippedCards: [],
      matchedPairs: 0,
      moves: 0,
      isGameWon: false,
    });
  };

  // Initialize the game on first render
  useEffect(() => {
    initGame();
  }, []);

  // Check if the game is won
  useEffect(() => {
    if (gameState.matchedPairs === pairCount && gameState.cards.length > 0) {
      setGameState(prev => ({ ...prev, isGameWon: true }));
    }
  }, [gameState.matchedPairs, pairCount, gameState.cards.length]);

  // Handle card click
  const handleCardClick = (id: number) => {
    // Don't allow clicks when 2 cards are already flipped and being checked
    if (gameState.flippedCards.length === 2) return;
    
    // Don't allow clicking the same card twice
    if (gameState.flippedCards.includes(id)) return;

    // Flip the card
    const newFlippedCards = [...gameState.flippedCards, id];
    const newCards = gameState.cards.map(card => 
      card.id === id ? { ...card, isFlipped: true } : card
    );

    setGameState(prev => ({
      ...prev,
      cards: newCards,
      flippedCards: newFlippedCards,
    }));

    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      setGameState(prev => ({ ...prev, moves: prev.moves + 1 }));
      
      // Get the two flipped cards
      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards.find(card => card.id === firstId);
      const secondCard = newCards.find(card => card.id === secondId);

      // Check if they match
      if (firstCard && secondCard && firstCard.value === secondCard.value) {
        // Mark cards as matched
        const matchedCards = newCards.map(card => 
          card.id === firstId || card.id === secondId 
            ? { ...card, isMatched: true } 
            : card
        );

        // Reset flipped cards and increment match count
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            cards: matchedCards,
            flippedCards: [],
            matchedPairs: prev.matchedPairs + 1,
          }));
        }, 500);
      } else {
        // If no match, flip cards back over after a delay
        setTimeout(() => {
          const resetCards = newCards.map(card => 
            newFlippedCards.includes(card.id) && !card.isMatched
              ? { ...card, isFlipped: false }
              : card
          );

          setGameState(prev => ({
            ...prev,
            cards: resetCards,
            flippedCards: [],
          }));
        }, 1000);
      }
    }
  };

  return {
    cards: gameState.cards,
    moves: gameState.moves,
    isGameWon: gameState.isGameWon,
    handleCardClick,
    restartGame: initGame,
  };
};