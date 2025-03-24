import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FlickeringGrid } from '../components/FlickeringGrid';
import Button from '../components/Button';

const VideoPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate('/book');
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white relative py-20 px-4">
      {/* Background effects */}
      <FlickeringGrid 
        color="#ffffff" 
        className="absolute inset-0 z-0" 
        maxOpacity={0.15}
        flickerChance={0.1}
      />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/90 z-1"></div>
      
      <div className="z-10 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-white">
          Thank You for Your Interest
        </h1>
        
        {/* Video placeholder */}
        <div className="w-full aspect-video bg-gray-800 rounded-xl mb-12 flex items-center justify-center border border-white/20 shadow-lg shadow-white/10">
          <div className="text-center p-8">
            <h2 className="text-2xl font-semibold mb-4">Video Coming Soon</h2>
            <p className="text-gray-400">
              We're preparing an amazing video showcase of our services just for you.
              <br />
              Check back soon to see what we can do for your brand!
            </p>
          </div>
        </div>
        
        {/* User information acknowledgment */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-12 border border-white/20">
          <h3 className="text-xl font-semibold mb-4">Thank you for your information!</h3>
          <p className="text-gray-300">
            We've received your details and are excited to show you how we can transform your digital presence.
            Our team will be in touch with you soon to discuss your specific needs and how we can help.
          </p>
        </div>
        
        {/* CTA Button with Step 2 text */}
        <div className="text-center bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-white">
            STEP 2: LIKE WHAT YOU HEAR? LET'S TALK...
          </h3>
          <p className="text-gray-300 mb-6">
            Have questions? Interested in working together? Click the button below to schedule a call.
          </p>
          <button 
            onClick={handleBookAppointment}
            className="bg-gradient-to-r from-slate-200 to-white text-gray-800 py-3 px-8 rounded-xl 
                     hover:from-white hover:to-slate-100 transition-all duration-300
                     shadow-lg shadow-white/30 hover:shadow-xl hover:shadow-white/40
                     transform hover:scale-105 font-medium text-lg"
          >
            Book an appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;