import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';

const BrandDevelopment: React.FC = () => {
  return (
    <ServiceTemplate
      title="Brand Development Services"
      description="Build a strong, memorable brand identity that resonates with your target audience. Our comprehensive brand development services help you establish a unique market position and create lasting connections with your customers."
      features={[
        "Brand Strategy Development",
        "Visual Identity Design",
        "Brand Guidelines Creation",
        "Brand Voice & Messaging",
        "Brand Architecture",
        "Rebranding Services"
      ]}
      benefits={[
        "Distinctive market positioning",
        "Consistent brand experience",
        "Stronger brand recognition",
        "Improved customer loyalty",
        "Clear brand communication",
        "Long-term brand value"
      ]}
      image="/images/brand-development.jpg"
    />
  );
};

export default BrandDevelopment; 