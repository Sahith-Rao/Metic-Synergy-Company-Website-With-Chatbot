import React, { createContext, useContext, useState } from 'react';

interface BookingContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  handleBookingSubmit: (formData: BookingFormData) => void;
  selectedService: string;
  setSelectedService: (service: string) => void;
  services: string[];
  setIsOpen: (open: boolean) => void;
}

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  service: string;
  company?: string; // Optional to maintain backward compatibility
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
      console.log('Booking submitted:', formData);
      
      // Make an API call to the backend
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          company: formData.company || 'Not provided' // Ensure company field exists
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }
      
      alert('Booking submitted successfully!');
      closeModal();
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Error submitting booking. Please try again.');
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
        services,
        setIsOpen: setIsModalOpen
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
