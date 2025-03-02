import React from 'react';
import { Calendar, Phone, Mail, User } from 'lucide-react';
import BookAppointmentButton from '../components/BookAppointmentButton';

const Contact: React.FC = () => {
  const teamContacts = [
    {
      name: "Mehermani Uttoorwar",
      phone: "+91 XXXXXXXXXX", // Replace with actual phone number
      email: "mehermani@meticsynergy.com" // Replace with actual email
    },
    {
      name: "Shiva Saketh",
      phone: "+91 XXXXXXXXXX", // Replace with actual phone number
      email: "shiva@meticsynergy.com" // Replace with actual email
    },
    {
      name: "Manu Vardhan Reddy",
      phone: "+91 XXXXXXXXXX", // Replace with actual phone number
      email: "manu@meticsynergy.com" // Replace with actual email
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-black" id="booking-section">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-10 text-gray-300">
            Schedule a consultation with our experts and discover how we can help your brand stand out in the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {teamContacts.map((contact, index) => (
            <div 
              key={index}
              className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 group"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <User className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-4 text-white group-hover:text-purple-400 transition-colors">
                {contact.name}
              </h3>
              <div className="space-y-4">
                <a 
                  href={`tel:${contact.phone}`} 
                  className="flex items-center justify-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>{contact.phone}</span>
                </a>
                <a 
                  href={`mailto:${contact.email}`} 
                  className="flex items-center justify-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>{contact.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <BookAppointmentButton className="mx-auto" />
        </div>

        {/* Map or Additional Contact Info */}
        <div className="mt-20 bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-white text-center">
            Visit Our Office
          </h3>
          <div className="text-center text-gray-300">
            <p className="mb-4">123 Digital Marketing Street</p>
            <p className="mb-4">Hyderabad, Telangana 500081</p>
            <p>India</p>
          </div>
          {/* You can add a map iframe here if needed */}
        </div>
      </div>
    </section>
  );
};

export default Contact;