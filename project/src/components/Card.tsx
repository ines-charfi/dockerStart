import React from 'react';
import './Card.css';

interface CardProps {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ id, value, isFlipped, isMatched, onClick }) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick(id);
    }
  };

  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-front"></div>
        <div className="card-back">
          
          <img src={value} alt="Card" className="card-image" />
        </div>
      </div>
    </div>
  );
};

export default Card;