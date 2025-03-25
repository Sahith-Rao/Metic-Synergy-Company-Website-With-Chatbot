import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid, // Make sure this is included
    Tooltip,
    Legend,
    ResponsiveContainer
  } from 'recharts';
import UserDetailsModal from './UserDetailsModal';

interface User {
    _id: string;
    name: string;
    email: string;
    answers: Record<string, string>;
  }

  interface SurveyStats {
    totalResponses: number;
    questionStats: {
      questionId: string;
      questionText: string;
      options: {
        text: string;
        count: number;
      }[];
    }[];
  }

const SurveyStatsTab: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<{questionId: number, option: string} | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleOptionClick = async (questionId: number, option: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users-by-option`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ questionId, option })
      });
      
      if (!response.ok) throw new Error('Failed to fetch users');
      
      const data = await response.json();
      setUsers(data);
      setSelectedOption({ questionId, option });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="space-y-8">
      {stats?.questionStats.map((question: any) => (
        <div key={question.questionId} className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">{question.questionText}</h3>
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={question.options}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                <XAxis dataKey="text" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#4b5563' }} />
                <Legend />
                <Bar 
                  dataKey="count" 
                  name="Responses" 
                  fill="#6366f1" 
                  onClick={(data) => handleOptionClick(question.questionId, data.text)}
                  cursor="pointer"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {question.options.map((option: any) => (
              <div 
                key={option.text} 
                className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition cursor-pointer"
                onClick={() => handleOptionClick(question.questionId, option.text)}
              >
                <h4 className="font-medium">{option.text}</h4>
                <p>{option.count} responses ({Math.round((option.count / stats.totalResponses) * 100)}%)</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <UserDetailsModal 
        isOpen={!!selectedOption}
        onClose={() => setSelectedOption(null)}
        users={users}
        option={selectedOption?.option || ''}
      />
    </div>
  );
};

export default SurveyStatsTab;