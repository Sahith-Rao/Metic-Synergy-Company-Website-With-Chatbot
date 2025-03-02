import React, { useEffect, useState, useRef } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
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
    <footer ref={sectionRef} id="contact" className="bg-black text-white pt-12 sm:pt-16 pb-6 sm:pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className={`transform transition-all duration-500 hover:translate-y-[-10px] ${isVisible ? 'slide-in-left' : 'opacity-0'}`}>
            <div className="flex items-center mb-4">
              <img src="/logo.png" alt="Metic Synergy Logo" className="h-8 w-8 sm:h-10 sm:w-10 mr-2 sm:mr-3" />
              <h3 className="text-lg sm:text-xl font-bold">Metic Synergy</h3>
            </div>
            <p className="text-gray-400 mb-4 text-sm sm:text-base">
              Your partner in creating compelling stories and managing digital presence.
            </p>
            <p className="text-xs sm:text-sm text-gray-500 italic">INNOVATIVE SOLUTIONS, CREATIVE VISIONS</p>
          </div>
          
          {/* Useful Links */}
          <div className={`transform transition-all duration-500 hover:translate-y-[-10px] ${isVisible ? 'slide-in-left delay-100' : 'opacity-0'}`}>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 border-b border-gray-700 pb-2 text-purple-400">Useful Links</h4>
            <ul className="space-y-1 sm:space-y-2">
              {['Home', 'About Us', 'Services', 'Portfolio', 'Contact Us'].map((item, index) => (
                <li key={item} className={`transform transition-all duration-300 hover:translate-x-2 ${isVisible ? `slide-in-left delay-${(index + 2) * 100}` : 'opacity-0'}`}>
                  <a 
                    href={`#${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Policies */}
          <div className={`transform transition-all duration-500 hover:translate-y-[-10px] ${isVisible ? 'slide-in-right delay-100' : 'opacity-0'}`}>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 border-b border-gray-700 pb-2 text-purple-400">Policies</h4>
            <ul className="space-y-1 sm:space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Cookie Policy'].map((item, index) => (
                <li key={item} className={`transform transition-all duration-300 hover:translate-x-2 ${isVisible ? `slide-in-right delay-${(index + 2) * 100}` : 'opacity-0'}`}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className={`transform transition-all duration-500 hover:translate-y-[-10px] ${isVisible ? 'slide-in-right' : 'opacity-0'}`}>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 border-b border-gray-700 pb-2 text-purple-400">Contact Us</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className={`flex items-start transform transition-all duration-300 hover:translate-x-2 ${isVisible ? 'slide-in-right delay-200' : 'opacity-0'}`}>
                <MapPin className="text-purple-400 h-4 w-4 sm:h-5 sm:w-5 mt-1 mr-2 sm:mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base">123 Digital Avenue, Hyderabad, India</span>
              </li>
              <li className={`flex items-center transform transition-all duration-300 hover:translate-x-2 ${isVisible ? 'slide-in-right delay-300' : 'opacity-0'}`}>
                <Mail className="text-purple-400 h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                <a href="mailto:meticsynergy@gmail.com" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  meticsynergy@gmail.com
                </a>
              </li>
              <li className={`flex items-center transform transition-all duration-300 hover:translate-x-2 ${isVisible ? 'slide-in-right delay-400' : 'opacity-0'}`}>
                <Phone className="text-purple-400 h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  +91 9876543210
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className={`border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-500 text-xs sm:text-sm ${isVisible ? 'fade-in delay-500' : 'opacity-0'}`}>
          <p>&copy; {new Date().getFullYear()} Metic Synergy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;