import React from 'react';

interface ButtonProps {
  onClick: () => void;
  text: string;
  color: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, color }) => {
  return (
    <button onClick={onClick} className={`cursor-pointer bg-gradient-to-b from-${color}-500 to-${color}-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-12 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group`}>
      <div className="relative overflow-hidden">
        <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
          {text}
        </p>
        <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
          {text}
        </p>
      </div>
    </button>
  );
}

export default Button;
