import React, { createContext, useContext, useState } from 'react';

interface BookingContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  handleBookingSubmit: (formData: BookingFormData) => void;
  selectedService: string;
  setSelectedService: (service: string) => void;
  services: string[];
}

export interface BookingFormData {
  name: string;
  phone: string;
  date: string;
  service: string;
}

const services = [
  'Digital Marketing',
  'Photography',
  'Videography',
  'Brand Development',
  'Social Media Management',
  'Content Creation'
];

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService('');
  };

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
    <BookingContext.Provider 
      value={{ 
        isModalOpen, 
        openModal, 
        closeModal, 
        handleBookingSubmit, 
        selectedService, 
        setSelectedService,
        services 
      }}
    >
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