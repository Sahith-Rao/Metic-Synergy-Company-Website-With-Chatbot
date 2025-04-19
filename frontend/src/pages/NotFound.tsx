import React from 'react';
import { Link } from 'react-router-dom';
import { FlickeringGrid } from '../components/FlickeringGrid';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  // This effect ensures proper 404 status is returned
  React.useEffect(() => {
    // Setting the document title for better SEO
    document.title = '404 - Page Not Found | Metic Synergy';
    
    // Add meta description for 404 page
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'The page you are looking for could not be found. Navigate back to Metic Synergy\'s homepage.';
    document.head.appendChild(metaDescription);
    
    // Add canonical URL
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = window.location.origin + '/404';
    document.head.appendChild(canonicalLink);
    
    // Clean up function to remove added meta tags when component unmounts
    return () => {
      document.head.removeChild(metaDescription);
      
      // Only remove canonical if it still exists
      if (document.head.contains(canonicalLink)) {
        document.head.removeChild(canonicalLink);
      }
    };
  }, []);

  return (
    <div className="min-h-screen px-4 sm:px-6 py-24 sm:py-32 relative"
    style={{
      perspective: '1000px',
    }}>
      <FlickeringGrid color="#000000" className="absolute inset-0 z-[-1]" />
      <div className="mx-auto max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl rounded-lg shadow-xl dark:bg-gray-800 transform-gpu bg-black/50 p-8 sm:p-12" style={{
        transformStyle: 'preserve-3d',
        boxShadow: '0px 10px 50px rgba(0, 0, 0, 0.8)',
      }}>
        <div className="text-center">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-white mb-6">404</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">Page Not Found</h2>
          <p className="text-gray-300 text-lg mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300"
            >
              <Home size={20} />
              Back to Home
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="flex items-center gap-2 px-6 py-3 bg-transparent hover:bg-gray-800 text-white border border-gray-600 rounded-lg transition-all duration-300"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;