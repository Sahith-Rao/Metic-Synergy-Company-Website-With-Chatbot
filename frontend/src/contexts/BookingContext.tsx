import React, { createContext, useContext, useState } from 'react';

interface BookingContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  handleBookingSubmit: (formData: BookingFormData) => void;
}

export interface BookingFormData {
  name: string;
  phone: string;
  date: string;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleBookingSubmit = async (formData: BookingFormData) => {
    try {
      // Here you can add your API call to the backend
      // Example:
      // const response = await fetch('/api/bookings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      console.log('Booking submitted:', formData);
      closeModal();
    } catch (error) {
      console.error('Error submitting booking:', error);
    }
  };

  return (
    <BookingContext.Provider value={{ isModalOpen, openModal, closeModal, handleBookingSubmit }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}; 