import React from 'react';

interface ButtonProps {
  onClick: () => void;
  color: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, color, children }) => {
  // Create conditional styling based on color - with updated professional theme
  const getButtonStyles = () => {
    if (color === "white") {
      return `cursor-pointer bg-white px-12 py-3 rounded-lg border-0 text-slate-800 font-medium shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-300`;
    }
    if (color === "blue" || color === "primary") {
      return `cursor-pointer bg-blue-600 px-12 py-3 rounded-lg border-0 text-white font-medium shadow-md hover:shadow-lg hover:bg-blue-700 transition-all duration-300`;
    }
    return `cursor-pointer bg-gradient-to-b from-${color}-500 to-${color}-600 px-12 py-3 rounded-lg border-0 text-white font-medium shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300`;
  };

  return (
    <button onClick={onClick} className={getButtonStyles()}>
      <div className="relative overflow-hidden">
        {children}
      </div>
    </button>
  );
}

export default Button;
