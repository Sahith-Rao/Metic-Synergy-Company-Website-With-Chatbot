import React from 'react';

interface ButtonProps {
  onClick: () => void;
  color: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, color, children }) => {
  return (
    <button onClick={onClick} className={`cursor-pointer bg-gradient-to-b from-${color}-500 to-${color}-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-12 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group hover:scale-105 hover:shadow-[0px_8px_64px_0_rgba(99,102,241,.70)] transition-all duration-300`}>
      <div className="relative overflow-hidden">
        {children}
      </div>
    </button>
  );
}

export default Button;
