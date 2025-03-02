import React from 'react';
import BookAppointmentButton from './BookAppointmentButton';

interface ServiceTemplateProps {
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  image: string;
}

const ServiceTemplate: React.FC<ServiceTemplateProps> = ({
  title,
  description,
  features,
  benefits,
  image
}) => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">{title}</h1>
          
          <div className="mb-12">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8"
            />
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              {description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">What We Offer</h2>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">Benefits</h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <BookAppointmentButton className="mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceTemplate; 