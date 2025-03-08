'use client';

import React, { useState } from 'react';
import AppointmentForm from '../components/AppointmentForm';
import BookAppointmentButton from '../components/BookAppointmentButton';
import { FlickeringGrid } from '../components/FlickeringGrid';

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Get in Touch
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            We'd love to hear from you!
          </p>
        </div>

        <div className="flex flex-col items-center justify-center space-y-6 sm:flex-row sm:space-x-4 sm:space-y-0 mt-8">
          <BookAppointmentButton className="w-full sm:w-auto" />

          <a
            href="/survey"
            className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-purple-500 rounded-full group"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
              Take a Free Survey
            </span>
            <span className="relative invisible">Take a Free Survey</span>
          </a>
        </div>

        <div className="mt-8">
          <AppointmentForm
            isOpen={isAppointmentModalOpen}
            onClose={() => setIsAppointmentModalOpen(false)}
          />
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
