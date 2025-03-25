import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import AppointmentsTab from '../components/admin/AppointmentsTab';
import SurveyStatsTab from '../components/admin/SurveyStatsTab';

const AdminDashboard: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="flex space-x-1 rounded-lg bg-gray-800 p-1 mb-8">
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm font-medium rounded-md ${
                  selected ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                }`
              }
            >
              Upcoming Appointments
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm font-medium rounded-md ${
                  selected ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                }`
              }
            >
              Survey Database
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <AppointmentsTab />
            </Tab.Panel>
            <Tab.Panel>
              <SurveyStatsTab />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default AdminDashboard;