import React, { useEffect, useState, useRef } from 'react';
import { FlickeringGrid } from '../components/FlickeringGrid';
import ProfileCard from '../components/ProfileCard';
import Card from '../components/Card'; // Assuming you create a Card.tsx component

const About: React.FC = () => {
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
    <section ref={sectionRef} id="about" className="py-12 sm:py-16 md:py-20 bg-gray-900 text-white relative"
    style={{
      perspective: '1000px',
    }}>
      <FlickeringGrid color="#000000" className="absolute inset-0 z-[-1]" />
      <div className="container mx-auto px-4 transform-gpu" style={{
        transformStyle: 'preserve-3d',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark background
        boxShadow: '0px 10px 50px rgba(0, 0, 0, 0.8)', // Stronger shadow for depth
      }}>
        <div className="text-center mb-10 sm:mb-16">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 transform transition-all duration-500 text-purple-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            WHO WE ARE
          </h2>
          <div className={`w-16 sm:w-20 h-1 bg-purple-600 mx-auto ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'} transition-all duration-500 delay-100`}></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <p className={`text-base sm:text-lg text-gray-300 text-center mb-8 sm:mb-12 leading-relaxed transform transition-all duration-500  px-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} transition-all duration-500 delay-200`}>
            At Metic Synergy, we specialize in crafting compelling stories and managing digital presence to help brands connect, engage, and grow.
            From social media to SEO, we're your one-stop solution for all things digital marketing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mt-8 sm:mt-16 px-2 justify-items-center">
            <Card>
              <div className="text-center">
                <div className="text-xl font-bold mb-2">Our Mission</div>
                <p className="text-sm">
                  "To empower brands with innovative marketing strategies."
                </p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <div className="text-xl font-bold mb-2">Our Vision</div>
                <p className="text-sm">
                  "To be the go-to partner for businesses looking to thrive in the digital space."
                </p>
              </div>
            </Card>
          </div>
        </div>


        <div className="mt-12 sm:mt-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-purple-400 mb-6">Our Accomplishments</h3>
          <p className="text-center text-gray-300 max-w-3xl mx-auto">
            We have worked with renowned clients such as **Figuring Out By Jay**, **Decathlon**, **Futbol Syndicate**, **Hyderabad FC**, and **AIFF**. Our expertise spans industries including real estate, restaurants, and lifestyle branding.
          </p>
        </div>

        {/* Profile Cards */}
        <div className="mt-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-purple-400 mb-6">Our Team</h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ProfileCard name="Shiva Saketh" designation="Chief Technology Officer" />
            <ProfileCard name="Meher Mani" designation="Chief Operations Officer" />
            <ProfileCard name="Manuvardhan" designation="Chief Product Officer" />
          </div>
        </div>
      </div>
    </section>
  );
};



export default About;
