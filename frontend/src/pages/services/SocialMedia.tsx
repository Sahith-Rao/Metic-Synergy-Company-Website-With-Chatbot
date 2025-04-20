import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import { FAQSchema } from '../../components/StructuredData';

const SocialMedia: React.FC = () => {
  // FAQ data with keyword-rich content for SEO
  const faqItems = [
    {
      question: "Which social media platforms should my business focus on?",
      answer: "The ideal platforms depend on your target audience demographics and business goals. Instagram excels for visual products and younger audiences, LinkedIn is essential for B2B companies, Facebook remains valuable for broad reach and community building, and Twitter/X provides real-time engagement opportunities. Our social media management services include audience analysis to determine the optimal platform mix for your specific business."
    },
    {
      question: "How often should we post on social media platforms?",
      answer: "Posting frequency varies by platform: LinkedIn performs best with 1-2 quality posts daily, Instagram engagement peaks at 3-5 posts weekly plus daily Stories, Facebook business pages benefit from 3-5 weekly posts, and Twitter/X requires more frequent updates (3-5 daily) for visibility. Our social media content calendar strategies balance consistency with quality while avoiding algorithm penalties for low-engagement content."
    },
    {
      question: "What metrics should we track to measure social media ROI?",
      answer: "Key social media ROI metrics include engagement rate (likes, comments, shares), audience growth rate, click-through rates, conversion metrics, customer acquisition cost from social channels, and brand sentiment analysis. Our social media analytics provide comprehensive reporting on these metrics, connecting social performance to business objectives like lead generation, website traffic, and sales conversions."
    },
    {
      question: "How do you approach organic vs. paid social media marketing?",
      answer: "We implement a balanced strategy: organic social media content builds authentic brand voice, community engagement and consistent presence, while paid social advertising delivers targeted reach, accelerated growth, and specific campaign objectives. Our social media management services optimize both approaches, using organic content to establish brand identity and paid amplification for key business initiatives and audience targeting."
    },
    {
      question: "Can social media influencer marketing work for small businesses?",
      answer: "Yes, micro-influencers (1,000-10,000 followers) and nano-influencers (under 1,000 followers) often deliver higher engagement rates and more authentic connections than celebrity partnerships at a fraction of the cost. Our influencer collaboration strategies identify niche content creators whose audiences align with your target market, creating authentic partnerships that drive meaningful engagement for businesses of all sizes."
    }
  ];

  return (
    <>
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
    
    {/* Keyword-rich FAQ Section with structured data */}
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Social Media Management FAQ
          </h2>
          
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-3">{item.question}</h3>
                <p className="text-gray-300">{item.answer}</p>
              </div>
            ))}
          </div>
          
          {/* Social Media Statistics Section with Keywords */}
          <div className="mt-16 bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Social Media Marketing Statistics
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span className="text-gray-300">
                  <strong>Instagram engagement</strong> rates average 1.16% across industries, with highest performance in travel (1.42%) and beauty (1.41%) sectors
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span className="text-gray-300">
                  The average <strong>Facebook page reach</strong> is just 5.2% of a page's total likes, emphasizing the need for strategic content optimization
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span className="text-gray-300">
                  <strong>LinkedIn content strategy</strong> delivers 2.74x more effective lead generation compared to traditional platforms
                </span>
              </li>
              
            </ul>
          </div>
          
          {/* Add an outbound link as requested in requirements */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">
              Want to learn more about effective social media strategies?
            </p>
            <a 
              href="https://sproutsocial.com/insights/social-media-statistics/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors underline"
            >
              Explore the latest social media statistics and best practices from Sprout Social
            </a>
          </div>
        </div>
      </div>
      
      {/* Schema.org structured data for FAQs */}
      <FAQSchema questions={faqItems} />
    </section>
    </>
  );
};

export default SocialMedia; 