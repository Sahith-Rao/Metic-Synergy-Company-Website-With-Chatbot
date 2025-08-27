import React, { useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import { Check, Sparkles } from 'lucide-react';
import ClientMarquee from '../components/ClientMarquee';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

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
    <div className="flex flex-col text-white relative">
      {/* Hero section with background image */}
      <Hero />
      
      {/* Content container with consistent professional theme */}
      <div className="w-full mx-auto bg-slate-900">

        {/* How We Work Section - With scroll animations */}
        <section ref={sectionRef} className="py-16 px-4 sm:px-6 bg-slate-800">
          <div className="container mx-auto max-w-5xl">

            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-blue-50">
              HOW WE WORK
            </h2>

            {/* Simplified Progress Bar */}
            <div className="max-w-3xl mx-auto mb-10">
              <div className="h-1 bg-slate-700 rounded-full relative">
                <div className="absolute inset-0 flex items-center justify-between w-full z-10">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`relative w-3 h-3 rounded-full ${index <= activeStep ? 'bg-blue-400' : 'bg-slate-600'}`}
                      style={{ transform: 'translateX(-50%)' }}
                    >
                      <span className={`absolute -top-8 text-sm ${index <= activeStep ? 'text-blue-300' : 'text-slate-500'}`}>
                        {index + 1}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  className="h-full bg-blue-500 rounded-full absolute z-0"
                  style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Steps content - simplified */}
            <div className="max-w-3xl mx-auto">
              {steps.map((step, index) => {
                // Create a separate ref for each step item
                const itemRef = useRef<HTMLDivElement>(null);
                const [isItemVisible, setIsItemVisible] = useState(false);

                useEffect(() => {
                  const observer = new IntersectionObserver(
                    ([entry]) => {
                      if (entry.isIntersecting) {
                        setIsItemVisible(true);
                      }
                    },
                    { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
                  );

                  if (itemRef.current) {
                    observer.observe(itemRef.current);
                  }

                  return () => observer.disconnect();
                }, []);

                return (
                <div
                  ref={itemRef}
                  key={index}
                  className={`flex items-center gap-4 mb-6 transition-all duration-700 ${isItemVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index <= activeStep ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'}`}
                  >
                    {index < activeStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="font-bold">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 p-4 rounded-lg bg-slate-700 shadow-md">
                    <h3 className="text-lg font-bold text-blue-100 mb-1">{step.title}</h3>
                    <p className="text-slate-300">{step.description}</p>
                  </div>
                </div>
              );
              })}
            </div>
          </div>
        </section>

        {/* Innovative Solutions Section - Professional theme */}
        <section className="py-16 px-4 sm:px-6 bg-slate-900">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-blue-50">
              OUR INNOVATIVE SOLUTIONS
            </h2>

            {/* Cards - simplified */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-colors shadow-lg border border-slate-700">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Sparkles className="w-6 h-6 text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-blue-100 text-center mb-4">
                  Find Unique Selling Point
                </h3>
                <p className="text-slate-300 text-sm text-center">
                  Help startups identify what makes them unique by understanding their competitors and target audience. Build a clear, standout brand message around that uniqueness.
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-colors shadow-lg border border-slate-700">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Sparkles className="w-6 h-6 text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-blue-100 text-center mb-4">
                  Brand Messaging Guidelines
                </h3>
                <p className="text-slate-300 text-sm text-center">
                  Ensure all marketing materials share the same clear message by setting guidelines and sticking to them.
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-colors shadow-lg border border-slate-700">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Sparkles className="w-6 h-6 text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-blue-100 text-center mb-4">
                  Agile Marketing Approach
                </h3>
                <p className="text-slate-300 text-sm text-center">
                  Stay agile by monitoring market trends, analyzing data, and being open to trying new strategies to keep marketing effective.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Client Marquee */}
        <ClientMarquee />

        {/* CTA Section - Professional theme */}
        <section className="py-16 px-4 sm:px-6 bg-slate-800">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-blue-50">
                Ready to Transform Your Digital Presence?
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                Join the innovative brands that trust us with their digital success
              </p>
              <div className="flex justify-center">
                <Link
                  to="/book"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  Book an Appointment
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
