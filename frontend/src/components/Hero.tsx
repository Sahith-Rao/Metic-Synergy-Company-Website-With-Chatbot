import React, { useEffect, useState } from 'react';
import { Instagram, Mail, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set visible after component mounts to trigger animations
    setIsVisible(true);
  }, []);

  const handleBooking = () => {
    navigate('/contact');
    // Scroll to booking section after a short delay to ensure the page has loaded
    setTimeout(() => {
      const bookingSection = document.getElementById('booking-section');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center text-white pt-16 pb-8 bg-gradient-to-br from-purple-900 to-blue-900"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 transform transition-all duration-700 hover:scale-105 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 ${isVisible ? 'slide-in-right' : 'opacity-0'}`}
        style={{textShadow: '0 0 10px rgba(147, 51, 234, 0.8)'}}
        >
          METIC-SYNERGY
        </h1>
        <p className={`text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed transform transition-all duration-500 hover:text-purple-300 px-2 ${isVisible ? 'slide-in-left delay-200' : 'opacity-0'}`}
        style={{textShadow: '0 0 8px rgba(147, 51, 234, 0.6)'}}
        >
          "CRAFTING IMPACTFUL STORIES THROUGH DIGITAL MARKETING, PHOTOGRAPHY AND CREATIVE AD SOLUTIONS"
        </p>
        
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 mb-8 sm:mb-12 text-sm sm:text-base ${isVisible ? 'slide-in-bottom delay-400' : 'opacity-0'}`}>
          <a href="https://instagram.com/meticsynergy" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-purple-400 transition-colors duration-300 hover:scale-105">
            <Instagram className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            <span>meticsynergy-insta</span>
          </a>
          <a href="mailto:meticsynergy@gmail.com" className="flex items-center hover:text-purple-400 transition-colors duration-300 hover:scale-105">
            <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            <span>meticsynergy@gmail.com</span>
          </a>
          <div className="flex items-center hover:scale-105 transition-transform duration-300">
            <MapPin className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            <span>Hyderabad, India</span>
          </div>
        </div>
        
        <button
          onClick={handleBooking}
          className={`mt-6 sm:mt-10 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-bold transform transition-all duration-500 hover:scale-105 shadow-lg ${isVisible ? 'slide-in-bottom delay-500' : 'opacity-0'}`}
        >
          Book a Free Consultation
        </button>
      </div>
    </section>
  );
};

export default Hero;
