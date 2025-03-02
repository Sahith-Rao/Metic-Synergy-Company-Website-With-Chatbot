import React, { useEffect, useState, useRef } from 'react';

const Portfolio: React.FC = () => {
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

  const projects = [
    {
      title: "Brand Identity Redesign",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      title: "Social Media Campaign",
      category: "Digital Marketing",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
    },
    {
      title: "E-commerce Website",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      title: "Product Photography",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1076&q=80"
    },
    {
      title: "SEO Optimization",
      category: "Digital Marketing",
      image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
    },
    {
      title: "Video Production",
      category: "Multimedia",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
    }
  ];

  return (
    <section ref={sectionRef} id="portfolio" className="py-12 sm:py-16 md:py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 transform transition-all duration-500 hover:text-purple-400 ${isVisible ? 'slide-in-right' : 'opacity-0'}`}>
            OUR PORTFOLIO
          </h2>
          <div className={`w-16 sm:w-20 h-1 bg-purple-600 mx-auto ${isVisible ? 'slide-in-bottom delay-100' : 'opacity-0'}`}></div>
          <p className={`text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mt-4 sm:mt-6 px-2 ${isVisible ? 'slide-in-left delay-200' : 'opacity-0'}`}>
            Explore our diverse range of projects that showcase our expertise in digital marketing, creative design, and brand development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={`group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 ${isVisible ? `fade-in delay-${(index + 3) * 100}` : 'opacity-0'}`}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-1">{project.title}</h3>
                <p className="text-purple-400 text-sm sm:text-base">{project.category}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`text-center mt-8 sm:mt-12 ${isVisible ? 'slide-in-bottom delay-500' : 'opacity-0'}`}>
          <button className="bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300 py-2 sm:py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg font-bold transform transition-all duration-500 hover:scale-105">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;