import React from 'react';
import { FlickeringGrid } from '../components/FlickeringGrid';

const Book: React.FC = () => {
  return (
    <div className="pt-20 px-4 bg-cover bg-center min-h-screen flex flex-col items-center justify-center text-white relative"
    style={{
      perspective: '1000px',
    }}>
      <FlickeringGrid color="#000000" className="absolute inset-0 z-[-1]" />
      <div className="transform-gpu" style={{
        transformStyle: 'preserve-3d',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark background
        boxShadow: '0px 10px 50px rgba(0, 0, 0, 0.8)', // Stronger shadow for depth
      }}>
      <h1 className="text-3xl font-bold text-center mb-8">Book Online</h1>
      {/* Add your booking form or content here */}
      </div>
    </div>
  );
};

export default Book;
