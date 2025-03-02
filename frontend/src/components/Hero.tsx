import React, { useEffect, useState } from 'react';
import { Instagram, Mail, MapPin, Calendar } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Set visible after component mounts to trigger animations
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white pt-16 pb-8">
      <div className="absolute inset-0 bg-black opacity-80 z-0"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center z-[-1]" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          backgroundBlendMode: "overlay"
        }}
      ></div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 transform transition-all duration-700 hover:scale-105 ${isVisible ? 'slide-in-right' : 'opacity-0'}`}>
          METIC-SYNERGY
        </h1>
        <p className={`text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed transform transition-all duration-500 hover:text-purple-300 px-2 ${isVisible ? 'slide-in-left delay-200' : 'opacity-0'}`}>
          "CRAFTING IMPACTFUL STORIES THROUGH DIGITAL MARKETING, PHOTOGRAPHY AND CREATIVE AD SOLUTIONS"
        </p>
        
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 mb-8 sm:mb-12 text-sm sm:text-base ${isVisible ? 'slide-in-bottom delay-400' : 'opacity-0'}`}>
          <a href="https://instagram.com/meticsynergy" className="flex items-center hover:text-purple-400 transition-colors duration-300">
            <Instagram className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            <span>meticsynergy-insta</span>
          </a>
          <a href="mailto:meticsynergy@gmail.com" className="flex items-center hover:text-purple-400 transition-colors duration-300">
            <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            <span>meticsynergy@gmail.com</span>
          </a>
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            <span>Hyderabad, India</span>
          </div>
        </div>
        
        <div className={`mt-6 sm:mt-10 transform transition-all duration-500 hover:scale-105 ${isVisible ? 'slide-in-bottom delay-500' : 'opacity-0'}`} id="book-online">
          <button className="bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300 py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg font-bold flex items-center mx-auto">
            <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Book an Appointment
          </button>
        </div>
        
        <div className={`mt-10 sm:mt-16 animate-bounce hidden sm:block ${isVisible ? 'fade-in delay-500' : 'opacity-0'}`}>
          <a href="#about" className="inline-block">
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;