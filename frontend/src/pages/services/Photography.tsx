import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';

const Photography: React.FC = () => {
  return (
    <ServiceTemplate
      title="Photography Services"
      description="Capture your brand's essence with our professional photography services. From product shoots to corporate events, we deliver high-quality visuals that tell your story and engage your audience."
      features={[
        "Product Photography",
        "Corporate Event Coverage",
        "Brand Lifestyle Shoots",
        "Architecture & Real Estate Photography",
        "Sports & Action Photography",
        "Professional Retouching & Editing"
      ]}
      benefits={[
        "High-quality, professional images for your brand",
        "Consistent visual style across all platforms",
        "Quick turnaround times",
        "Customized shooting solutions",
        "Enhanced brand perception",
        "Versatile image library for marketing"
      ]}
      image="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    />
  );
};

export default Photography; 