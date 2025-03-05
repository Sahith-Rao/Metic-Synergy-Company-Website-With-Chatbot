'use client';

import React, { useState, useEffect } from 'react';

interface Question {
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    question: 'What is your primary marketing goal?',
    options: ['Brand Awareness', 'Lead Generation', 'Sales Increase', 'Customer Engagement'],
  },
  {
    question: 'What is your budget?',
    options: ['Less than $1000', '$1000 - $5000', '$5000 - $10000', 'More than $10000'],
  },
  {
    question: 'What is your target audience?',
    options: ['Small Business', 'Enterprise', 'Startups', 'Individuals'],
  },
  {
    question: 'What marketing channels are you currently using?',
    options: ['Social Media', 'Email Marketing', 'SEO', 'Paid Advertising'],
  },
  {
    question: 'What is your preferred content format?',
    options: ['Video', 'Images', 'Blog Posts', 'Infographics'],
  },
  {
    question: 'What is your biggest challenge in marketing?',
    options: ['Reaching Target Audience', 'Generating Leads', 'Measuring ROI', 'Creating Engaging Content'],
  },
  {
    question: 'What is your brand personality?',
    options: ['Professional', 'Fun', 'Innovative', 'Reliable'],
  },
];

export default function SurveyPage() {
  console.log('SurveyPage component rendered');
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    // Randomly select 3 questions
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffled.slice(0, 3));
  }, []);

  const handleAnswerChange = (question: string, answer: string) => {
    setAnswers({ ...answers, [question]: answer });
  };

  const handleSubmit = () => {
    console.log('Survey answers', answers);
    // Logic to determine which service is best based on answers
    // and display the "Book an Appointment" button
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-12 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-3xl p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Free Service Survey
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Help us determine the best service for your needs!
          </p>
        </div>

        <div className="space-y-6">
          {selectedQuestions.map((q: Question) => (
            <div key={q.question} className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {q.question}
              </h2>
              {q.options.map((option) => (
                <label key={option} className="block text-gray-700 dark:text-gray-300">
                  <input
                    type="radio"
                    name={q.question}
                    value={option}
                    onChange={(e) => handleAnswerChange(q.question, e.target.value)}
                    className="mr-2 leading-tight"
                  />
                  <span className="text-sm">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
          >
            See Recommended Service
          </button>
        </div>

        {/* Conditionally render "Book an Appointment" button based on survey results */}
      </div>
    </div>
  );
}
