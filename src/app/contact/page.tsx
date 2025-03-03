'use client';

import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import AppointmentForm from '@/components/AppointmentForm';

const profiles = [
  {
    name: 'Shiva Saketh',
    designation: 'Chief Technology Officer',
    mobile: '+1234567890',
  },
  {
    name: 'Meher Mani',
    designation: 'Chief Operations Officer',
    mobile: '+1234567891',
  },
  {
    name: 'Manuvardhan',
    designation: 'Chief Product Officer',
    mobile: '+1234567892',
  },
];

export default function ContactPage() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-12 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Get in Touch
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Connect with our team of experts and schedule a consultation to discuss your needs.
          </p>
        </div>

        {/* Profile Cards */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile) => (
            <ProfileCard key={profile.name} {...profile} />
          ))}
        </div>

        {/* Book Appointment Button */}
        <div className="text-center">
          <button
            onClick={() => setIsAppointmentModalOpen(true)}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-0.5 text-lg font-semibold text-white transition-all hover:from-blue-600 hover:to-purple-600"
          >
            <span className="relative flex items-center space-x-2 rounded-full bg-white px-8 py-3.5 text-gray-900 transition-all duration-300 ease-out group-hover:bg-opacity-0 group-hover:text-white dark:bg-gray-900 dark:text-white">
              <span>Book an Appointment</span>
              <svg
                className="h-5 w-5 animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Appointment Form Modal */}
        <AppointmentForm
          isOpen={isAppointmentModalOpen}
          onClose={() => setIsAppointmentModalOpen(false)}
        />
      </div>
    </div>
  );
} 