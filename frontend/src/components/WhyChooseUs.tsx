import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const WhyChooseUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const accomplishments = [
    {
      date: "Early 2024",
      title: "First Major Client",
      description: "We landed our first major client, Figuring Out By Jay, a prominent Telugu YouTuber and influencer, marking a significant step in our journey of working with high-profile digital creators.",
      highlight: "1M+ Combined Reach"
    },
    {
      date: "Mid 2024",
      title: "Sports & Lifestyle Partnerships",
      description: "Later in the year, we marked a milestone with our first-ever collaborations with Decathlon and Futbol Syndicate, showcasing our expertise in sports and lifestyle branding.",
      highlight: "2 Major Sports Brands"
    },
    {
      date: "Late 2024",
      title: "Industry Expansion",
      description: "Over the year, we've successfully landed clients across diverse niches, including real estate, restaurants, and more, while growing our team and expertise to deliver exceptional results for every industry we serve.",
      highlight: "5+ Industry Verticals"
    },
    {
      date: "Present",
      title: "Major Sports Collaborations",
      description: "We are proud to have collaborated with esteemed organizations like Deccan Legion, Hyderabad FC, and our biggest collab to date, the All India Football Federation (AIFF)",
      highlight: "National Level Impact"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden bg-black">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-20 text-white"
        >
          ACCOMPLISHMENTS
        </motion.h2>

        <div className="max-w-6xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-600/20 via-purple-600 to-purple-600/20"></div>

          {/* Timeline Items */}
          {accomplishments.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`flex items-center mb-16 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content Box */}
              <div className="w-1/2 px-6">
                <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 group">
                  <div className="text-purple-400 font-semibold mb-2">{item.date}</div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  <div className="inline-block bg-purple-500/10 px-4 py-2 rounded-full">
                    <span className="text-purple-400 font-semibold">{item.highlight}</span>
                  </div>
                </div>
              </div>

              {/* Timeline Node */}
              <div className="w-4 h-4 bg-purple-600 rounded-full absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-full h-full rounded-full bg-purple-400 animate-ping opacity-25"></div>
                <div className="absolute w-2 h-2 bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;