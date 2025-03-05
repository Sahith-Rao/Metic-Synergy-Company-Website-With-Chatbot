'use client';

'use client';

import React, { useState } from 'react';
import AppointmentForm from '../components/AppointmentForm';
import BookAppointmentButton from '../components/BookAppointmentButton';

export default function ContactPage() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-12 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-3xl p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800">
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
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 w-full sm:w-auto"
          >
            Take a Free Survey
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
            Email: <a href="mailto:info@example.com" className="text-blue-500">info@example.com</a>
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
