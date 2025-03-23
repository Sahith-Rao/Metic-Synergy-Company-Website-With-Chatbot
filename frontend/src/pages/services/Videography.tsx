import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';

const Videography: React.FC = () => {
  return (
    <ServiceTemplate
      title="Videography Services"
      description="Create compelling video content that captivates your audience. Our videography services combine creative storytelling with technical excellence to produce videos that leave a lasting impression."
      features={[
        "Corporate Video Production",
        "Event Coverage",
        "Product Demonstrations",
        "Promotional Videos",
        "Social Media Content",
        "Drone Videography"
      ]}
      benefits={[
        "Engaging visual storytelling",
        "Professional production quality",
        "Increased audience engagement",
        "Versatile content for multiple platforms",
        "Brand message reinforcement",
        "Higher conversion rates"
      ]}
      image="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    />
  );
};

export default Videography; 