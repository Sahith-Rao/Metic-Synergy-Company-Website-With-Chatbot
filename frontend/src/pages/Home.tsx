import React, { useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import { DollarSign, Megaphone, TrendingUp, Check } from 'lucide-react';
import ClientMarquee from '../components/ClientMarquee';

const Home: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      title: "Discover",
      description: "Understand your brand, goals, and audience.",
    },
    {
      title: "Strategize",
      description: "Create a tailored marketing plan.",
    },
    {
      title: "Execute",
      description: "Implement campaigns across platforms.",
    },
    {
      title: "Optimize",
      description: "Analyze performance and refine strategies.",
    },
    {
      title: "Grow",
      description: "Deliver consistent results and scale your brand.",
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startStepAnimation();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const startStepAnimation = () => {
    let step = 0;
    const interval = setInterval(() => {
      if (step < steps.length) {
        setActiveStep(step);
        step++;
      } else {
        clearInterval(interval);
      }
    }, 1000); // Change step every second
  };

  return (
    <div className="bg-black">
      <Hero />
      
      {/* How We Work Section */}
      <section ref={sectionRef} className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            HOW WE WORK
          </h2>
          
          {/* Enhanced Progress Bar */}
          <div className="max-w-3xl mx-auto mb-12 relative">
            {/* Background line with dots */}
            <div className="h-1 bg-gray-800 rounded-full flex justify-between items-center">
              {steps.map((_, index) => (
                <div 
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-500 absolute 
                    ${index <= activeStep ? 'bg-purple-500' : 'bg-gray-700'}`}
                  style={{ left: `${(index * 100) / (steps.length - 1)}%`, transform: 'translateX(-50%)' }}
                >
                  {/* Pulse effect for active step */}
                  {index === activeStep && (
                    <span className="absolute w-full h-full rounded-full bg-purple-500 animate-ping opacity-75"></span>
                  )}
                  {/* Step number tooltip */}
                  <span 
                    className={`absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-medium
                      ${index <= activeStep ? 'text-purple-400' : 'text-gray-500'}`}
                  >
                    {index + 1}
                  </span>
                </div>
              ))}
              {/* Animated progress line */}
              <div 
                className="h-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 rounded-full absolute top-0 left-0 transition-all duration-1000"
                style={{ 
                  width: `${(activeStep / (steps.length - 1)) * 100}%`,
                  boxShadow: '0 0 10px rgba(147, 51, 234, 0.5)' 
                }}
              ></div>
            </div>
          </div>

          {/* Steps content - remains the same */}
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-6 mb-8 transition-all duration-500 ${
                  index <= activeStep 
                    ? 'opacity-100 transform translate-x-0' 
                    : 'opacity-0 transform translate-x-[-50px]'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 
                  ${index <= activeStep 
                    ? 'bg-gradient-to-r from-purple-600 to-purple-500 shadow-lg shadow-purple-500/30' 
                    : 'bg-gray-700'
                  }`}
                >
                  {index < activeStep ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <span className="text-white font-bold">{index + 1}</span>
                  )}
                </div>
                <div className={`flex-1 p-6 rounded-xl transition-all duration-300 
                  ${index === activeStep 
                    ? 'bg-gray-900/50 border border-purple-500/20 shadow-lg shadow-purple-500/10' 
                    : ''
                  }`}
                >
                  <h3 className="text-xl font-bold text-purple-400 mb-2">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovative Solutions Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            OUR INNOVATIVE SOLUTIONS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <DollarSign className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">
                Find Unique Selling Point
              </h3>
              <p className="text-gray-300 text-center">
                Help startups identify what makes them unique by understanding their competitors and target audience. Build a clear, standout brand message around that uniqueness.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Megaphone className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">
                Brand Messaging Guidelines
              </h3>
              <p className="text-gray-300 text-center">
                Ensure all marketing materials share the same clear message by setting guidelines and sticking to them.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">
                Agile Marketing Approach
              </h3>
              <p className="text-gray-300 text-center">
                Stay agile by monitoring market trends, analyzing data, and being open to trying new strategies to keep marketing effective.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Marquee at the bottom */}
      <ClientMarquee />
    </div>
  );
};

export default Home; 