import React, { useState } from 'react';
import { Phone, Mail, Building, Calendar, User, Instagram, MapPin, ArrowRight, Globe } from 'lucide-react';
import BookAppointmentButton from '../components/BookAppointmentButton';
import { motion } from 'framer-motion';

interface TeamMember {
  name: string;
  designation: string;
  mobile: string;
  email: string;
  image: string;
  instagram?: string;
  expertise: string[];
}

const Contact: React.FC = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  const teamMembers: TeamMember[] = [
    {
      name: "Shiva Saketh",
      designation: "Creative Director",
      mobile: "+91 9876543210",
      email: "shiva@meticsynergy.com",
      image: "/team/shiva.jpg",
      instagram: "@shivasaketh",
      expertise: ["Brand Strategy", "Creative Direction", "Digital Marketing"]
    },
    {
      name: "Meher Mani",
      designation: "Business Development Manager",
      mobile: "+91 9876543211",
      email: "meher@meticsynergy.com",
      image: "/team/meher.jpg",
      instagram: "@mehermani",
      expertise: ["Business Strategy", "Client Relations", "Project Management"]
    },
    {
      name: "Manuvardhan",
      designation: "Technical Director",
      mobile: "+91 9876543212",
      email: "manu@meticsynergy.com",
      image: "/team/manu.jpg",
      instagram: "@manuvardhan",
      expertise: ["Technical Planning", "Development", "Innovation"]
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 animate-gradient"></div>
        <div className="absolute inset-0 bg-[url('/grid.png')] opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Get in Touch
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Connect with our expert team to transform your digital presence and take your brand to new heights
          </p>
        </motion.div>

        {/* Office Location Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-20 bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Visit Our Office
              </h2>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-3 text-purple-400" />
                <span>Hyderabad, Telangana, India</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Globe className="w-5 h-5 mr-3 text-purple-400" />
                <span>www.meticsynergy.com</span>
              </div>
            </div>
            <div className="relative w-64 h-64 rounded-xl overflow-hidden">
              <img 
                src="/office-image.jpg" 
                alt="Office Location" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Team Members Section */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onHoverStart={() => setHoveredMember(index)}
              onHoverEnd={() => setHoveredMember(null)}
              className="group relative bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 
                       hover:border-purple-500/50 transition-all duration-500 
                       hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl opacity-0 
                           group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <motion.div 
                  className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-purple-500/50 
                           group-hover:border-purple-500 transition-all duration-300"
                  animate={hoveredMember === index ? { scale: 1.1 } : { scale: 1 }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                <h3 className="text-xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r 
                             from-purple-400 to-blue-400">
                  {member.name}
                </h3>
                <p className="text-gray-400 text-center mb-4">{member.designation}</p>
                
                {/* Expertise Tags */}
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {member.expertise.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="text-xs bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="space-y-3">
                  <a href={`tel:${member.mobile}`} 
                     className="flex items-center text-gray-300 hover:text-purple-400 transition-colors">
                    <Phone className="w-4 h-4 mr-2" />
                    {member.mobile}
                  </a>
                  <a href={`mailto:${member.email}`} 
                     className="flex items-center text-gray-300 hover:text-purple-400 transition-colors">
                    <Mail className="w-4 h-4 mr-2" />
                    {member.email}
                  </a>
                  {member.instagram && (
                    <a href={`https://instagram.com/${member.instagram}`}
                       target="_blank"
                       rel="noopener noreferrer" 
                       className="flex items-center text-gray-300 hover:text-purple-400 transition-colors">
                      <Instagram className="w-4 h-4 mr-2" />
                      {member.instagram}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Booking Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20 
                       hover:border-purple-500/50 transition-all duration-500">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="text-gray-300 mb-8">
              Schedule a consultation with our experts and discover how we can help your brand stand out in the digital landscape.
            </p>
            <BookAppointmentButton className="mx-auto" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;