import React from 'react';
import { RefreshCw } from 'lucide-react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center gap-2 hover:bg-indigo-700 transition-colors"
      onClick={onClick}
    >
      <RefreshCw size={18} />
      {children}
    </button>
  );
};

export default Button;