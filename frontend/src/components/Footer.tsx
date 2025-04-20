import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin } from 'lucide-react';
import { OrganizationSchema } from './StructuredData';

const Footer: React.FC = () => {
  const usefulLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
    { name: 'Book Appointment', path: '/book' }
  ];

  const handleUsefulLinkClick = (path: string) => {
    
    if (path.includes('#')) {
      const sectionId = path.split('#')[1];
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      {/* Schema.org structured data for organization */}
      <OrganizationSchema 
        name="Metic Synergy"
        logo="https://meticsynergy.com/new_logo.png"
        url="https://meticsynergy.com"
        description="Digital marketing, photography and creative advertising agency specializing in brand development, content creation, and social media strategy."
        email="meticsynergy@gmail.com"
        address={{
          city: "Hyderabad",
          country: "India"
        }}
        sameAs={[
          "https://instagram.com/meticsynergy",
          "https://twitter.com/meticsynergy",
          "https://linkedin.com/company/meticsynergy"
        ]}
      />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div>
            <h3 className="text-xl font-bold mb-4">METIC-SYNERGY</h3>
            <p className="text-gray-400 mb-4">
              Crafting impactful stories through digital marketing, photography and creative ad solutions.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/meticsynergy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Follow Metic Synergy on Instagram"
              >
                <Instagram aria-hidden="true" />
              </a>
              <a 
                href="mailto:meticsynergy@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email Metic Synergy"
              >
                <Mail aria-hidden="true" />
              </a>
            </div>
          </div>

      
          <div>
            <h3 className="text-xl font-bold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    onClick={() => handleUsefulLinkClick(link.path)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <p className="flex items-center text-gray-400">
                <MapPin className="mr-2" />
                Hyderabad, India
              </p>
              <a 
                href="mailto:meticsynergy@gmail.com"
                className="flex items-center text-gray-400 hover:text-white transition-colors"
                aria-label="Contact Metic Synergy via email"
              >
                <Mail className="mr-2" aria-hidden="true" />
                meticsynergy@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} METIC-SYNERGY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;