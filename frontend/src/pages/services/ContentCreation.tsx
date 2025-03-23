import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';

const ContentCreation: React.FC = () => {
  return (
    <ServiceTemplate
      title="Content Creation Services"
      description="Deliver valuable, engaging content that resonates with your target audience. Our content creation services combine strategic thinking with creative execution to produce content that drives results."
      features={[
        "Blog & Article Writing",
        "Video Content Production",
        "Infographic Design",
        "Social Media Content",
        "Email Newsletter Content",
        "Website Copy Creation"
      ]}
      benefits={[
        "Improved audience engagement",
        "Enhanced SEO performance",
        "Established thought leadership",
        "Increased organic traffic",
        "Better lead generation",
        "Stronger content marketing ROI"
      ]}
      image="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    />
  );
};

export default ContentCreation; 