import React, { createContext, useContext, useState } from 'react';

interface BookingContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedService: string | null;
  setSelectedService: (service: string | null) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <BookingContext.Provider value={{ isOpen, setIsOpen, selectedService, setSelectedService }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}; 