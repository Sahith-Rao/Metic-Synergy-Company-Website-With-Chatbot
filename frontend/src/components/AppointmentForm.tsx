'use client';

import React, { useState } from 'react';

interface AppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted', {
      name,
      contactNumber,
      dateTime,
      email,
      company,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50">
      <div className="relative mx-auto mt-10 max-w-lg rounded-lg bg-white p-8">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </label>
          <label>
            Contact Number:
            <input
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </label>
          <label>
            Date and Time:
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </label>
          <label>
            Email Address:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </label>
          <label>
            Company/Startup/Business Name:
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </label>
          <button type="submit" className="bg-blue-500 text-white py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
