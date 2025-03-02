import React, { useEffect, useState, useRef } from 'react';

const AboutUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-12 sm:py-16 md:py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 transform transition-all duration-500 hover:text-purple-400 ${isVisible ? 'slide-in-right' : 'opacity-0'}`}>
            WHO WE ARE
          </h2>
          <div className={`w-16 sm:w-20 h-1 bg-purple-600 mx-auto ${isVisible ? 'slide-in-bottom delay-100' : 'opacity-0'}`}></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <p className={`text-base sm:text-lg text-gray-300 text-center mb-8 sm:mb-12 leading-relaxed transform transition-all duration-500 hover:text-white px-2 ${isVisible ? 'slide-in-left delay-200' : 'opacity-0'}`}>
            At Metic Synergy, we specialize in crafting compelling stories and
            managing digital presence to help brands connect, engage, and grow.
            From social media to SEO, we're your one-stop solution for all things
            digital marketing.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mt-8 sm:mt-16 px-2">
            <div className={`bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 hover:bg-gray-700 ${isVisible ? 'slide-in-left delay-300' : 'opacity-0'}`}>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-purple-400">Our Mission</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                "To empower brands with innovative marketing strategies."
              </p>
            </div>
            
            <div className={`bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 hover:bg-gray-700 ${isVisible ? 'slide-in-right delay-300' : 'opacity-0'}`}>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-purple-400">Our Vision</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                "To be the go-to partner for businesses looking to thrive in the digital space."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;