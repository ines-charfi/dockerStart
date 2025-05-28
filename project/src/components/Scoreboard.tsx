import React from 'react';
import { Score } from '../utils/gameUtils';
import { Trophy } from 'lucide-react';

interface ScoreboardProps {
  scores: Score[];
}

const Scoreboard: React.FC<ScoreboardProps> = ({ scores }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-4 w-full max-w-md">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="text-yellow-500" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">High Scores</h2>
      </div>
      {scores.length > 0 ? (
        <div className="space-y-2">
          {scores.map((score, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-gray-600">
                  #{index + 1}
                </span>
                <span className="font-medium text-gray-800">
                  {score.playerName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {new Date(score.date).toLocaleDateString()}
                </span>
                <span className="font-semibold text-indigo-600">
                  {score.moves} moves
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No scores yet. Be the first!</p>
      )}
    </div>
  );
};

export default Scoreboard;