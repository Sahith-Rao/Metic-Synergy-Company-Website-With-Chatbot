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
    <section className="py-20 bg-gradient-to-r from-blue-800 to-purple-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Transform Your Digital Presence?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-10">
            Schedule a consultation with our experts and discover how we can help your brand stand out in the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {teamContacts.map((contact, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">{contact.name}</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <a href={`tel:${contact.phone}`} className="hover:text-purple-400 transition-colors">
                    {contact.phone}
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <a href={`mailto:${contact.email}`} className="hover:text-purple-400 transition-colors">
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <BookAppointmentButton className="mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default Contact;