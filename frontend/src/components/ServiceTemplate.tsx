import React, { useEffect } from 'react';
import BookAppointmentButton from './BookAppointmentButton';
import OptimizedImage from './OptimizedImage';

interface ServiceTemplateProps {
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  image: string;
}

const ServiceTemplate: React.FC<ServiceTemplateProps> = ({
  title,
  description,
  features,
  benefits,
  image
}) => {
  // Add SEO metadata for service pages
  useEffect(() => {
    // Set document title
    document.title = `${title} | Metic Synergy`;
    
    // Create and add meta tags
    const metaTags = [
      {
        name: 'description',
        content: description.substring(0, 160) // Keep meta description under 160 chars
      },
      // Open Graph tags for social sharing
      {
        property: 'og:title',
        content: `${title} | Metic Synergy`
      },
      {
        property: 'og:description',
        content: description.substring(0, 200)
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:url',
        content: `https://meticsynergy.com/services/${title.toLowerCase().replace(/\s+/g, '-')}`
      },
      {
        property: 'og:image',
        content: image
      },
      // Twitter Card tags
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: `${title} | Metic Synergy`
      },
      {
        name: 'twitter:description',
        content: description.substring(0, 200)
      },
      {
        name: 'twitter:image',
        content: image
      }
    ];
    
    // Add canonical URL
    let canonicalLink = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = `https://meticsynergy.com/services/${title.toLowerCase().replace(/\s+/g, '-')}`;
    
    // Add all meta tags
    const addedTags = metaTags.map(tag => {
      const metaTag = document.createElement('meta');
      Object.entries(tag).forEach(([attr, value]) => {
        metaTag.setAttribute(attr, value);
      });
      document.head.appendChild(metaTag);
      return metaTag;
    });
    
    // Clean up function
    return () => {
      // Remove all added meta tags
      addedTags.forEach(tag => {
        if (document.head.contains(tag)) {
          document.head.removeChild(tag);
        }
      });
      
      // Only remove canonical if we created it
      if (document.head.contains(canonicalLink)) {
        document.head.removeChild(canonicalLink);
      }
    };
  }, [title, description, image]);
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">{title}</h1>
          
          <div className="mb-12">
            <OptimizedImage 
              src={image} 
              alt={title}
              width={1170}
              height={384}
              className="w-full h-64 md:h-96 rounded-2xl mb-8"
              objectFit="cover"
              priority={true} // Service image is above the fold
            />
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              {description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold mb-6 text-white">What We Offer</h2>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-white mr-2">•</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold mb-6 text-white">Benefits</h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-white mr-2">•</span>
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceTemplate; 