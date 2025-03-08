import React from 'react';

interface TypingAnimationProps {
  children: React.ReactNode;
  className?: string;
}

export function TypingAnimation({ children, className }: TypingAnimationProps) {
  return (
    <div className={`typing-animation ${className}`} style={{ fontSize: '4rem', overflow: 'hidden', whiteSpace: 'nowrap', animation: 'typing 2s steps(40, end), blink-caret .75s step-end infinite', textAlign: 'center' }}>
      {children}
    </div>
  );
}
