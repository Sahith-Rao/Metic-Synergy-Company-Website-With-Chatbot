import React, { useEffect, useState } from 'react';
import { Instagram, Mail, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TypingAnimation } from '../registry/magicui/typing-animation';
import Button from './Button';

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

  const handleSurvey = () => {
    navigate('/survey');
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-white pt-16 pb-8 bg-gradient-to-br from-purple-900 to-blue-900 overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>
      <div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 animate-gradient"
      ></div>

      <div className="z-10">
        <div className="container mx-auto px-4 text-center">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 transform transition-all duration-700 hover:scale-105 text-center ${
              isVisible ? "slide-in-right" : "opacity-0"
            }`}
            style={{ textShadow: "0 0 10px rgba(147, 51, 234, 0.8)" }}
          >
            <TypingAnimation className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              METIC-SYNERGY
            </TypingAnimation>
          </h1>
        </div>
        <p
          className={`text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed transform transition-all duration-500 hover:text-purple-300 px-2 ${
            isVisible ? "slide-in-left delay-200" : "opacity-0"
          }`}
          style={{ textShadow: "0 0 8px rgba(147, 51, 234, 0.6)" }}
        >
          "CRAFTING IMPACTFUL STORIES THROUGH DIGITAL MARKETING, PHOTOGRAPHY AND
          CREATIVE AD SOLUTIONS"
        </p>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 mb-8 sm:mb-12 text-sm sm:text-base ${
            isVisible ? "slide-in-bottom delay-400" : "opacity-0"
          }`}
        >
          <a
            href="https://instagram.com/meticsynergy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-purple-400 transition-colors duration-300 hover:scale-105"
          >
            <Instagram className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            <span>meticsynergy-insta</span>
          </a>
          <a
            href="mailto:meticsynergy@gmail.com"
            className="flex items-center hover:text-purple-400 transition-colors duration-300 hover:scale-105"
          >
            <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            <span>meticsynergy@gmail.com</span>
          </a>
          <div className="flex items-center hover:scale-105 transition-transform duration-300">
            <MapPin className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            <span>Hyderabad, India</span>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center mt-4">
          <Button onClick={handleBooking} text="Get Started" color="blue" />
          <Button onClick={handleSurvey} text="Take a Free Survey" color="green" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
