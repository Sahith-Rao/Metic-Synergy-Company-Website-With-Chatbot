import React from 'react';
import { Calendar } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';

interface BookAppointmentButtonProps {
  className?: string;
}

const BookAppointmentButton: React.FC<BookAppointmentButtonProps> = ({ className }) => {
  const { setIsOpen, setSelectedService } = useBooking();

  const services = [
    'Digital Marketing',
    'Photography',
    'Videography',
    'Brand Development',
    'Social Media Management',
    'Content Creation'
  ];

  return (
    <div className={`relative group ${className}`}>
      <button
        onClick={() => setIsOpen(true)}
        className="relative bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-bold 
                 transform transition-all duration-500 hover:scale-105 hover:bg-purple-700
                 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
      >
        <span className="flex items-center justify-center">
          <Calendar className="w-5 h-5 mr-2" />
          Book an Appointment
        </span>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl animate-pulse"></div>
        </div>
      </button>

      {/* Service Selection Dropdown */}
      <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 rounded-xl shadow-xl border border-gray-800 
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        {services.map((service, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedService(service);
              setIsOpen(true);
            }}
            className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 
                     first:rounded-t-xl last:rounded-b-xl transition-colors"
          >
            {service}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookAppointmentButton; 