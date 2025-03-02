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
      image="/images/digital-marketing.jpg"
    />
  );
};

export default DigitalMarketing; 