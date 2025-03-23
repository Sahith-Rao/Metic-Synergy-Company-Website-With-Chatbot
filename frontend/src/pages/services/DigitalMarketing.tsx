import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';

const DigitalMarketing: React.FC = () => {
  return (
    <ServiceTemplate
      title="Digital Marketing Services"
      description="Transform your online presence with our comprehensive digital marketing solutions. We combine data-driven strategies with creative excellence to deliver measurable results for your business."
      features={[
        "Search Engine Optimization (SEO)",
        "Pay-Per-Click Advertising (PPC)",
        "Social Media Marketing",
        "Email Marketing Campaigns",
        "Content Marketing Strategy",
        "Analytics and Performance Tracking"
      ]}
      benefits={[
        "Increased online visibility and brand awareness",
        "Higher quality leads and conversions",
        "Better ROI on marketing investments",
        "Data-driven decision making",
        "Improved customer engagement",
        "Competitive market positioning"
      ]}
      image="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    />
  );
};

export default DigitalMarketing; 