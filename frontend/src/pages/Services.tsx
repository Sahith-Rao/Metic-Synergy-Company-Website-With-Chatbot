import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import { FlickeringGrid } from '../components/FlickeringGrid';
import Card from '../components/Card';

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

  const services = ['Digital Marketing', 'Video Marketing', 'Content Marketing', 'Social Media Marketing', 'SEO Services', 'Email Marketing', 'Lead Generation', 'Ad Marketing'];


  return (
    <section ref={sectionRef} id="services" className="py-12 sm:py-16 md:py-20 relative px-4 sm:px-6" style={{
      perspective: '1000px',
    }}>
      <FlickeringGrid color="#000000" className="absolute inset-0 z-[-1]" />

      <div className="container mx-auto relative z-10 bg-black/50 rounded-lg p-4 sm:p-6 md:p-8 transform-gpu" style={{
        transformStyle: 'preserve-3d',
        boxShadow: '0px 10px 50px rgba(0, 0, 0, 0.8)', // Stronger shadow for depth
      }}>
        <div className="text-center mb-10 sm:mb-16">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 transform transition-all duration-500 hover:text-purple-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            WHY CHOOSE US
          </h2>
          <div className={`w-16 sm:w-20 h-1 bg-purple-600 mx-auto ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'} transition-all duration-500 delay-100`}></div>
        </div>

        <div className={`max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto rounded-xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-12 transform transition-all duration-700 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <ul className="space-y-4 sm:space-y-6">
            {reasons.map((reason, index) => (
              <li
                key={index}
                className={`flex items-start transform transition-all duration-500 hover:translate-x-2 ${isVisible ? `opacity-100 translate-y-0 delay-${(index + 3) * 100}` : 'opacity-0 translate-y-5'}`}
              >
                <CheckCircle className="text-purple-500 h-5 w-5 sm:h-6 sm:w-6 mt-1 mr-2 sm:mr-3 flex-shrink-0" />
                <p className="text-base sm:text-lg text-gray-300">{reason}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 sm:mt-12 md:mt-16">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-purple-400 mb-4 sm:mb-6 text-white">Our Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 text-center justify-items-center">
            {services.map((service, index) => (
              <Card key={index}>
                <div className="text-xl font-bold">{service}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
