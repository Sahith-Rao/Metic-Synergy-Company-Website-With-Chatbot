import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  const services = [
    { name: 'Digital Marketing', path: '/services/digital-marketing' },
    { name: 'Photography', path: '/services/photography' },
    { name: 'Videography', path: '/services/videography' },
    { name: 'Brand Development', path: '/services/brand-development' },
    { name: 'Social Media Management', path: '/services/social-media' },
    { name: 'Content Creation', path: '/services/content-creation' }
  ];

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-white font-bold text-xl">
            METIC-SYNERGY
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <div className="relative group">
              <button 
                className="text-gray-300 hover:text-white transition-colors flex items-center"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                Services
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 rounded-lg shadow-xl border border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {services.map((service, index) => (
                  <Link
                    key={index}
                    to={service.path}
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/portfolio" className="text-gray-300 hover:text-white transition-colors">
              Portfolio
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4">
            <Link to="/" className="block py-2 text-gray-300 hover:text-white">
              Home
            </Link>
            <Link to="/about" className="block py-2 text-gray-300 hover:text-white">
              About
            </Link>
            <div>
              <button 
                className="flex items-center w-full py-2 text-gray-300 hover:text-white"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                Services
                <ChevronDown className={`ml-1 w-4 h-4 transform transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen && (
                <div className="pl-4">
                  {services.map((service, index) => (
                    <Link
                      key={index}
                      to={service.path}
                      className="block py-2 text-gray-400 hover:text-white"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/portfolio" className="block py-2 text-gray-300 hover:text-white">
              Portfolio
            </Link>
            <Link to="/contact" className="block py-2 text-gray-300 hover:text-white">
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;