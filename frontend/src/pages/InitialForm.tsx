import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlickeringGrid } from '../components/FlickeringGrid';

interface FormData {
  name: string;
  email: string;
}

const InitialForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data in localStorage to access it on the survey and video page if needed
    localStorage.setItem('userFormData', JSON.stringify(formData));
    // Navigate to the survey page
    navigate('/survey');
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white relative py-12 px-4">
      {/* Background effects */}
      <FlickeringGrid 
        color="#ffffff" 
        className="absolute inset-0 z-0" 
        maxOpacity={0.15}
        flickerChance={0.1}
      />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/90 z-1"></div>
      
      <div className="z-10 max-w-xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Get Started
        </h1>
        
        <p className="text-center text-gray-300 mb-8">
          Please provide your information to begin your journey with us.
        </p>
        
        <div className="w-full max-w-md mx-auto">
          <form 
            onSubmit={handleSubmit} 
            className="bg-gray-800/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 shadow-lg"
          >
            <div className="mb-4">
              <label htmlFor="name" className="block text-white font-medium mb-2">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-white font-medium mb-2">
                E-mail:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-8 rounded-md hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 shadow-lg shadow-purple-500/30 transform hover:scale-105"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InitialForm;