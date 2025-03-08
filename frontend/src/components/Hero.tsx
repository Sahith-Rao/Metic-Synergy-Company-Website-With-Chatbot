import React, { useEffect, useState } from 'react';
import { Instagram, Mail, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TypingAnimation } from '../registry/magicui/typing-animation';
import Button from './Button';
import { FlickeringGrid } from './FlickeringGrid';
import HomeForm from './HomeForm';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set visible after component mounts to trigger animations
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
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

  const handleSurvey = () => {
    navigate('/survey');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white pt-16 pb-8 bg-black overflow-hidden">
      {/* Flickering grid background with black color */}
      <FlickeringGrid 
        color="#ffffff" 
        className="absolute inset-0 z-0" 
        maxOpacity={0.15}
        flickerChance={0.1}
      />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/90 z-1"></div>
      
      <div className="z-10 max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className={`transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <TypingAnimation 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif"
              duration={100}
              delay={200}
              startOnView={true}
            >
              METIC-SYNERGY
            </TypingAnimation>
          </h1>
        </div>
        
        <p className={`text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed text-gray-200 transition-opacity duration-500 px-2 text-center ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          "CRAFTING IMPACTFUL STORIES THROUGH DIGITAL MARKETING, PHOTOGRAPHY AND
          CREATIVE AD SOLUTIONS"
        </p>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 text-sm sm:text-base transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <a
            href="https://instagram.com/meticsynergy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-300 hover:text-white transition-colors duration-300"
          >
            <Instagram className="mr-2 h-5 w-5" />
            <span>meticsynergy-insta</span>
          </a>
          <a
            href="mailto:meticsynergy@gmail.com"
            className="flex items-center text-gray-300 hover:text-white transition-colors duration-300"
          >
            <Mail className="mr-2 h-5 w-5" />
            <span>meticsynergy@gmail.com</span>
          </a>
          <div className="flex items-center text-gray-300">
            <MapPin className="mr-2 h-5 w-5" />
            <span>Hyderabad, India</span>
          </div>
        </div>

        <div className={`flex flex-col md:flex-row justify-center items-center gap-6 transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <div className="w-full md:w-auto">
            <HomeForm />
          </div>
          <div className="w-full md:w-auto mt-6 md:mt-0">
            <Button onClick={handleSurvey} color="gray">Take a Free Survey</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
