import React, { useEffect, useState, useRef } from 'react';
import { Calendar } from 'lucide-react';
import BookAppointmentButton from './BookAppointmentButton';
import OptimizedImage from './OptimizedImage';

const Portfolio: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ years: 0, satisfaction: 0, traffic: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startCounting();
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

  const startCounting = () => {
    const duration = 2000; 
    const steps = 50;
    const stepTime = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      
      setCounts({
        years: 1,
        satisfaction: Math.min(100, Math.floor((100 * currentStep) / steps)),
        traffic: Math.min(90, Math.floor((90 * currentStep) / steps))
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);
  };

  // Project portfolio with optimized responsive images
  const projects = [
    {
      title: "Brand Identity Redesign",
      category: "Branding",
      // Optimized with appropriate dimensions, WebP format, and lower quality for mobile
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fm=webp",
      dimensions: { width: 600, height: 400 },
      // Responsive image srcset for different device sizes
      srcSet: `
        https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=75&fm=webp 400w,
        https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fm=webp 600w,
        https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp 800w
      `,
      sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    },
    {
      title: "Social Media Campaign",
      category: "Digital Marketing",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fm=webp",
      dimensions: { width: 600, height: 400 },
      srcSet: `
        https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=75&fm=webp 400w,
        https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fm=webp 600w,
        https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp 800w
      `,
      sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    },
    {
      title: "E-commerce Website",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fm=webp",
      dimensions: { width: 600, height: 400 },
      srcSet: `
        https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=75&fm=webp 400w,
        https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fm=webp 600w,
        https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp 800w
      `,
      sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    },
    {
      title: "Product Photography",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fm=webp",
      dimensions: { width: 600, height: 400 },
      srcSet: `
        https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=75&fm=webp 400w,
        https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fm=webp 600w,
        https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp 800w
      `,
      sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    },
    {
      title: "SEO Optimization",
      category: "Digital Marketing",
      image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fm=webp",
      dimensions: { width: 600, height: 400 },
      srcSet: `
        https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=75&fm=webp 400w,
        https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fm=webp 600w,
        https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp 800w
      `,
      sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    },
    {
      title: "Video Production",
      category: "Multimedia",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fm=webp",
      dimensions: { width: 600, height: 400 },
      srcSet: `
        https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=75&fm=webp 400w,
        https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fm=webp 600w,
        https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp 800w
      `,
      sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    }
  ];

  // Optimized client reviews with WebP images, explicit dimensions, and responsive sizing
  const clientReviews = [
    {
      name: "FIGURING OUT BY JAY",
      logo: "/FIGURING OUT BY JAY.webp", // WebP version
      logoFallback: "/FIGURING OUT BY JAY (1).png", // Fallback for browsers without WebP support
      dimensions: { width: 80, height: 80 }, // Explicit dimensions
      sizes: "(max-width: 767px) 60px, 80px", // Responsive sizing
      priority: true, // Mark as high priority (above fold)
      rating: 4,
      testimonial: "MeticSynergy's editing and content strategy amplified our reach with algorithm-optimized videos. Their creative approach helped us engage viewers and grow our channel faster."
    },
    {
      name: "RAVRANI DEVELOPERS",
      logo: "/ravrani.webp", // WebP version (optimized to max 40 KiB as specified)
      logoFallback: "/ravrani.png.jpg",
      dimensions: { width: 80, height: 80 },
      sizes: "(max-width: 767px) 60px, 80px",
      priority: true, // Mark as high priority (above fold)
      rating: 5,
      testimonial: "MeticSynergy enhanced our digital presence with expert marketing strategies, making our projects more visible and attracting quality leads. Their approach significantly improved client engagement and brand credibility."
    },
    {
      name: "FUTBOL X DECATHLON",
      logo: "/futbol.webp", // WebP version
      logoFallback: "/futbol.png",
      dimensions: { width: 80, height: 80 },
      sizes: "(max-width: 767px) 60px, 80px", 
      priority: false, // Below fold on mobile
      rating: 5,
      testimonial: "Capturing high-intensity football action, MeticSynergy delivered professional photography for official tournaments. While Futbol Syndicate's events showcased our agility, Decathlon's collaboration demanded precision and specialized expertise, proving our adaptability in sports photography."
    },
    {
      name: "SPHOORTHY RESTAURANT",
      logo: "/SPHOORTHY.webp", // WebP version (optimized to max 100 KiB as specified)
      logoFallback: "/SPHOORTHY (1).jpg",
      dimensions: { width: 80, height: 80 },
      sizes: "(max-width: 767px) 60px, 80px",
      priority: false, // Below fold on mobile
      rating: 5,
      testimonial: "MeticSynergy transformed our online presence with a sleek design and seamless user experience. Their intuitive approach boosted our reservations and strengthened customer engagement."
    }
  ];

  return (
    <section ref={sectionRef} id="portfolio" className="py-16 sm:py-20 md:py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-24 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
          <div className="text-center">
            <h3 className="text-5xl md:text-6xl font-bold text-white mb-2">
              {counts.years}+
            </h3>
            <p className="text-gray-400 text-lg">Years of Experience</p>
          </div>
          <div className="text-center">
            <h3 className="text-5xl md:text-6xl font-bold text-white mb-2">
              {counts.satisfaction}%
            </h3>
            <p className="text-gray-400 text-lg">Client Satisfaction</p>
          </div>
          <div className="text-center">
            <h3 className="text-5xl md:text-6xl font-bold text-white mb-2">
              {counts.traffic}%
            </h3>
            <p className="text-gray-400 text-lg">Traffic Raised</p>
          </div>
        </div>

       
        <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isVisible ? 'slide-in-right' : 'opacity-0'}`}>
          WHAT OUR CLIENTS SAY
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {clientReviews.map((review, index) => (
            <div 
              key={index}
              className={`bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-800 hover:border-white/50 transition-all duration-500 transform hover:scale-105 ${
                isVisible ? `fade-in delay-${(index + 1) * 200}` : 'opacity-0'
              }`}
            >
              <div className="flex items-start gap-6 mb-6">
                {/* Logo container with fixed dimensions to prevent layout shifts */}
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white/10" style={{ aspectRatio: '1/1' }}>
                  <OptimizedImage 
                    src={review.logo}
                    alt={`${review.name} logo`}
                    width={review.dimensions.width}
                    height={review.dimensions.height}
                    className="p-2"
                    objectFit="contain"
                    fallbackSrc={review.logoFallback}
                    webpSrc={review.logo}
                    sizes={review.sizes}
                    priority={review.priority} // Prioritize loading for above-fold images
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">{review.name}</h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i}
                        className={`text-2xl ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                        aria-hidden={i >= review.rating ? 'true' : undefined}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed text-lg">
                "{review.testimonial}"
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <BookAppointmentButton className="mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default Portfolio;