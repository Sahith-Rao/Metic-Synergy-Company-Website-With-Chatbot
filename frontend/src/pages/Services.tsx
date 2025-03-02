import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle } from 'lucide-react';

const Services: React.FC = () => {
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

  const reasons = [
    "Expertise in creating compelling stories that resonate with audiences.",
    "Data-driven strategies for measurable results.",
    "End-to-end digital presence management.",
    "Dedicated account managers for personalized service.",
    "Proven track record of boosting engagement and conversions."
  ];

  return (
    <section ref={sectionRef} id="services" className="py-12 sm:py-16 md:py-20 relative bg-black">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 z-0" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 transform transition-all duration-500 hover:text-purple-400 ${isVisible ? 'slide-in-right' : 'opacity-0'}`}>
            WHY CHOOSE US
          </h2>
          <div className={`w-16 sm:w-20 h-1 bg-purple-600 mx-auto ${isVisible ? 'slide-in-bottom delay-100' : 'opacity-0'}`}></div>
        </div>
        
        <div className={`max-w-4xl mx-auto bg-gray-900 rounded-xl shadow-xl p-6 sm:p-8 md:p-12 transform transition-all duration-700 hover:scale-105 ${isVisible ? 'slide-in-bottom delay-200' : 'opacity-0'}`}>
          <ul className="space-y-4 sm:space-y-6">
            {reasons.map((reason, index) => (
              <li 
                key={index} 
                className={`flex items-start transform transition-all duration-500 hover:translate-x-2 ${isVisible ? `slide-in-left delay-${(index + 3) * 100}` : 'opacity-0'}`}
              >
                <CheckCircle className="text-purple-500 h-5 w-5 sm:h-6 sm:w-6 mt-1 mr-2 sm:mr-3 flex-shrink-0" />
                <p className="text-base sm:text-lg text-gray-300">{reason}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;