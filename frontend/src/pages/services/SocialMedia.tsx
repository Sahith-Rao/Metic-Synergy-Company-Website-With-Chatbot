import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';

const SocialMedia: React.FC = () => {
  return (
    <ServiceTemplate
      title="Social Media Management"
      description="Elevate your social media presence with our comprehensive management services. We create engaging content, maintain consistent posting schedules, and build meaningful connections with your audience across all platforms."
      features={[
        "Content Strategy & Planning",
        "Platform-Specific Content Creation",
        "Community Management",
        "Social Media Analytics",
        "Influencer Collaboration",
        "Paid Social Campaigns"
      ]}
      benefits={[
        "Increased brand awareness",
        "Higher engagement rates",
        "Consistent brand voice",
        "Growing social community",
        "Real-time customer interaction",
        "Measurable ROI on social efforts"
      ]}
      image="https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    />
  );
};

export default SocialMedia; 