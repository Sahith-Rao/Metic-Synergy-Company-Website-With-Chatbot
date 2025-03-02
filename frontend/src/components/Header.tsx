import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Metic Synergy Logo" 
            className="h-10 w-10 sm:h-12 sm:w-12 mr-2 sm:mr-3"
          />
          <h1 className="font-bold text-lg sm:text-xl text-white">
            Metic Synergy
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-4 lg:space-x-8">
            {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase().replace(' ', '-')}`} 
                  className="font-medium text-white hover:text-purple-400 transition-colors text-sm lg:text-base"
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a 
                href="#book-online" 
                className="font-medium bg-purple-600 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded hover:bg-purple-700 transition-colors text-sm lg:text-base"
              >
                Book Online
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black shadow-lg">
          <ul className="py-4">
            {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
              <li key={item} className="px-4 py-2">
                <a 
                  href={`#${item.toLowerCase().replace(' ', '-')}`} 
                  className="block font-medium text-white hover:text-purple-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
            <li className="px-4 py-2">
              <a 
                href="#book-online" 
                className="block font-medium text-purple-400 hover:text-purple-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Online
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;