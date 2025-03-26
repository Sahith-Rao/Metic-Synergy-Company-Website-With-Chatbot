'use client';

import React, { useState } from 'react';
import { FlickeringGrid } from '../components/FlickeringGrid';
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from 'lucide-react';
import { FlipText } from '../registry/magicui/flip-text';

export default function ContactPage() {

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 sm:py-12 relative"
    style={{
      perspective: '1000px',
    }}>
      <FlickeringGrid color="#000000" className="absolute inset-0 z-[-1]" />
      <div className="mx-auto max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl rounded-lg shadow-xl dark:bg-gray-800 transform-gpu bg-black/50 p-4 sm:p-6" style={{
        transformStyle: 'preserve-3d',
        boxShadow: '0px 10px 50px rgba(0, 0, 0, 0.8)', // Stronger shadow for depth
      }}>
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            <FlipText className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">
              Get in Touch
            </FlipText>
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            We'd love to hear from you!
          </p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="p-6 rounded-lg bg-gray-800 shadow-md">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us Directly</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-white mr-3" />
                <a href="mailto:meticsynergy@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  meticsynergy@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-white mr-3" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors">
                +91 93988 87054
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-white mr-3" />
                <span className="text-gray-300">
                 
                  Hyderabad, India
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-gray-800 shadow-md">
            <h2 className="text-2xl font-bold text-white mb-4">Business Hours</h2>
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="font-medium text-white">Monday - Friday:</span> 9:00 AM - 6:00 PM
              </p>
             
              <p className="mt-4 text-gray-300">
                We typically respond to all inquiries within 24 hours during business days.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-lg bg-gray-800 shadow-md">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            About Metic Synergy
          </h2>
          <p className="text-gray-300 text-center mb-4">
            We are a full-service digital marketing and creative agency specializing in helping businesses establish their brand presence and grow their digital footprint.
          </p>
          <p className="text-gray-300 text-center">
            Our team of experts combines strategic thinking with creative execution to deliver exceptional results for our clients across various industries.
          </p>
        </div>

        <div className="mt-8 p-6 rounded-lg bg-gray-800 shadow-md">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            Connect With Us
          </h2>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="https://instagram.com/meticsynergy" className="text-gray-300 hover:text-white transition-colors">
              <Instagram className="w-8 h-8" />
            </a>
            <a href="https://twitter.com/meticsynergy" className="text-gray-300 hover:text-white transition-colors">
              <Twitter className="w-8 h-8" />
            </a>
            <a href="https://linkedin.com/company/meticsynergy" className="text-gray-300 hover:text-white transition-colors">
              <Linkedin className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}