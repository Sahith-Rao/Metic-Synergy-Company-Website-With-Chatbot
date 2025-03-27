  import React from 'react';
import { Instagram, Mail, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/initial-form');
  };

  
  const cityBackgroundUrl = "https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2800&q=80";

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center text-white pt-16 pb-8 overflow-hidden"
      style={{
        backgroundImage: `url(${cityBackgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/50 z-0"></div>
      
      <div className="z-10 w-full container pl-8 sm:pl-12 md:pl-16">
        <div className="text-left mb-8">
          <h1>
            <span className="text-6xl md:text-7xl lg:text-8xl font-bold text-white" style={{ fontFamily: 'Letterstich plain regular', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              METIC-SYNERGY
            </span>
          </h1>
        </div>
        
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-4xl mb-10 leading-relaxed text-white text-left font-light" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          CRAFTING IMPACTFUL STORIES THROUGH DIGITAL MARKETING, PHOTOGRAPHY AND
          CREATIVE AD SOLUTIONS
        </p>

        <div className="flex flex-col sm:flex-row items-start gap-6 mb-12 text-sm sm:text-base">
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

        <div className="flex justify-start">
          <Button 
            onClick={handleGetStarted} 
            color="white"
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
