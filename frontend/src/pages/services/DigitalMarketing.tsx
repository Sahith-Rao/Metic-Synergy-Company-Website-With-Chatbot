import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import { FAQSchema } from '../../components/StructuredData';

const DigitalMarketing: React.FC = () => {
  // FAQ data for structured data and display
  const faqItems = [
    {
      question: "What is included in your digital marketing services?",
      answer: "Our digital marketing services include SEO optimization, pay-per-click advertising, social media marketing, content creation, email marketing, analytics tracking, and conversion rate optimization. We create customized strategies based on your business goals and target audience."
    },
    {
      question: "How long does it take to see results from digital marketing?",
      answer: "Results timeline varies based on the specific services and your industry. SEO typically shows meaningful results in 3-6 months, while PPC campaigns can generate immediate traffic. Social media marketing generally builds momentum over 2-3 months. We provide regular reports to track progress throughout the process."
    },
    {
      question: "How do you measure the success of digital marketing campaigns?",
      answer: "We track key performance indicators (KPIs) aligned with your business goals, including website traffic, conversion rates, lead generation, engagement metrics, click-through rates, and ultimately ROI. We use advanced analytics tools and provide transparent reporting dashboards to showcase the impact of our strategies."
    },
    {
      question: "Do you offer industry-specific digital marketing strategies?",
      answer: "Yes, we develop customized strategies for each client based on their industry, competition, target audience, and business objectives. We conduct thorough market research to identify the most effective channels and approaches for your specific sector."
    }
  ];

  return (
    <>
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
      
      {/* FAQ Section with Structured Data */}
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-3">{item.question}</h3>
                <p className="text-gray-300">{item.answer}</p>
              </div>
            ))}
          </div>
          
          {/* Add an outbound link as requested in requirements */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">
              Want to learn more about digital marketing best practices?
            </p>
            <a 
              href="https://moz.com/beginners-guide-to-seo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors underline"
            >
              Check out Moz's Beginner's Guide to SEO for valuable insights
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

export default DigitalMarketing; 