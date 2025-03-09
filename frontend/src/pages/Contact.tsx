'use client';

import React, { useState } from 'react';
import AppointmentForm from '../components/AppointmentForm';
import BookAppointmentButton from '../components/BookAppointmentButton';
import { FlickeringGrid } from '../components/FlickeringGrid';
import HomeForm from '../components/HomeForm';
import { FlipText } from '../registry/magicui/flip-text';

export default function ContactPage() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  return (
    <div className="min-h-screen px-4 py-12 relative"
    style={{
      perspective: '1000px',
    }}>
      <FlickeringGrid color="#000000" className="absolute inset-0 z-[-1]" />
      <div className="mx-auto max-w-3xl p-6 rounded-lg shadow-xl dark:bg-gray-800 transform-gpu" style={{
        transformStyle: 'preserve-3d',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark background
        boxShadow: '0px 10px 50px rgba(0, 0, 0, 0.8)', // Stronger shadow for depth
      }}>
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            <FlipText className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Get in Touch
            </FlipText>
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            We'd love to hear from you!
          </p>
        </div>

        <div className="flex flex-col items-center justify-center mt-8">
          <BookAppointmentButton className="w-full sm:w-auto" />
        </div>

        <div className="mt-8">
          <HomeForm />
        </div>

        <div className="mt-12 p-6 rounded-lg shadow-md dark:bg-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            About Metic Synergy
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            We are a team of passionate marketing experts dedicated to helping businesses grow.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Contact us today to learn more about our services!
          </p>
        </div>

        <div className="mt-8 p-6 rounded-lg shadow-md dark:bg-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Contact Information
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Email: <a href="mailto:contact@meticsynergy.com" className="text-blue-500">contact@meticsynergy.com</a>
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Phone: +1234567890
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Address: 123 Main Street, Anytown USA
          </p>
        </div>
      </div>
    </div>
  );
}