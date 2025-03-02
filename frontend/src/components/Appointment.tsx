import React from 'react';
import { Calendar } from 'lucide-react';

const Appointment: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-800 to-purple-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Transform Your Digital Presence?</h2>
        <p className="text-xl max-w-2xl mx-auto mb-10">
          Schedule a consultation with our experts and discover how we can help your brand stand out in the digital landscape.
        </p>
        
        <button className="bg-white text-blue-800 hover:bg-gray-100 transition-colors py-4 px-8 rounded-full text-lg font-bold flex items-center mx-auto">
          <Calendar className="mr-2" />
          Book an Appointment
        </button>
      </div>
    </section>
  );
};

export default Appointment;