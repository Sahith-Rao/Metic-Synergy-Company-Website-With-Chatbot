import React from 'react';
import { Calendar } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';

interface BookAppointmentButtonProps {
  className?: string;
}

const BookAppointmentButton: React.FC<BookAppointmentButtonProps> = ({ className }) => {
  const { openModal } = useBooking();

  return (
    <button 
      onClick={openModal}
      className={`bg-purple-600 hover:bg-purple-700 text-white transition-colors py-4 px-8 rounded-full text-lg font-bold flex items-center ${className}`}
    >
      <Calendar className="mr-2" />
      Book an Appointment
    </button>
  );
};

export default BookAppointmentButton; 