import React from 'react';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BookAppointmentButtonProps {
  className?: string;
}

const BookAppointmentButton: React.FC<BookAppointmentButtonProps> = ({ className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/book');
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleClick}
        className="relative bg-gray-100 text-gray-800 px-8 py-4 rounded-full text-lg font-bold 
                 transform transition-all duration-500 hover:scale-105 hover:bg-white
                 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
      >
        <span className="flex items-center justify-center">
          <Calendar className="w-5 h-5 mr-2" />
          Book an Appointment
        </span>
        
        
        <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-full bg-white/40 blur-xl animate-pulse"></div>
        </div>
      </button>
    </div>
  );
};

export default BookAppointmentButton;
