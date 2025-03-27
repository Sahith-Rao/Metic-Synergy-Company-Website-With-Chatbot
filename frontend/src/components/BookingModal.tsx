import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Mail, Phone, User, Building } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';

const BookingModal: React.FC = () => {
  const { isModalOpen, closeModal, handleBookingSubmit, selectedService, services } = useBooking();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    company: '',
    service: selectedService || ''
  });

  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleBookingSubmit(formData);
    setFormData({ name: '', phone: '', email: '', date: '', time: '', company: '', service: '' });
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900/90 rounded-2xl p-8 max-w-md w-full mx-4 relative border border-purple-500/30
                    shadow-[0_0_30px_rgba(168,85,247,0.2)]">
        <button 
          onClick={closeModal}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Calendar className="mr-2 text-purple-400" />
          Book an Appointment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Full Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white
                       transition-colors duration-300"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white
                       transition-colors duration-300"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white
                       transition-colors duration-300"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
              <Building className="w-4 h-4 mr-2" />
              Company/Business Name
            </label>
            <input
              type="text"
              id="company"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white
                       transition-colors duration-300"
              placeholder="Enter your company name"
            />
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
              Select Service
            </label>
            <select
              id="service"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white
                       transition-colors duration-300"
              required
            >
              <option value="">Choose a service</option>
              {services.map((service, index) => (
                <option key={index} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Date
              </label>
              // In BookingModal.tsx, update the date input:
              <input
                type="date"
                id="date"
                required
                value={formData.date}
                onChange={(e) => {
                  
                  setFormData({ ...formData, date: e.target.value });
                }}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white
                          transition-colors duration-300"
                min={new Date().toLocaleDateString('en-CA')} 
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Time
              </label>
              <input
                type="time"
                id="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white
                         transition-colors duration-300"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600
                     text-white font-bold py-3 px-4 rounded-lg transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900
                     shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          >
            Schedule Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal; 