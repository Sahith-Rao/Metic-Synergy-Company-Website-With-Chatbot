import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import UserDetailsModal from './UserDetailsModal';

interface SurveyStat {
  questionId: string;
  questionText: string;
  options: {
    text: string;
    count: number;
  }[];
}

interface UserResponse {
  _id: string;
  name: string;
  email: string;
  answers: Record<string, string>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const SurveyStatsTab: React.FC = () => {
  const [stats, setStats] = useState<SurveyStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<{
    questionId: string;
    option: string;
  } | null>(null);
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/survey-stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error('Failed to fetch stats');
        
        const data = await response.json();
        setStats(data.questionStats);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleOptionClick = async (questionId: string, option: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/survey-responses/${questionId}/${option}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const data = await response.json();
      setUsers(data);
      setSelectedOption({ questionId, option });
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  if (loading) return <div className="text-center py-10">Loading statistics...</div>;
  if (error) return <div className="text-red-500 text-center py-10">Error: {error}</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setChartType(prev => prev === 'bar' ? 'pie' : 'bar')}
          className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
        >
          Switch to {chartType === 'bar' ? 'Pie' : 'Bar'} Charts
        </button>
      </div>

      {stats.map((question) => (
        <div key={question.questionId} className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">{question.questionText}</h3>
          
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? (
                <BarChart data={question.options}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                  <XAxis dataKey="text" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937',
                      borderColor: '#4b5563'
                    }} 
                  />
                  <Legend />
                  <Bar 
                    dataKey="count" 
                    name="Responses" 
                    fill="#6366f1" 
                    onClick={(data) => handleOptionClick(question.questionId, data.text)}
                    cursor="pointer"
                  />
                </BarChart>
              ) : (
                <PieChart>
                  <Pie
                    data={question.options}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="text"
                    onClick={(data) => handleOptionClick(question.questionId, data.text)}
                  >
                    {question.options.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937',
                      borderColor: '#4b5563'
                    }} 
                  />
                  <Legend />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {question.options.map((option, index) => (
              <div 
                key={option.text} 
                className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition cursor-pointer"
                onClick={() => handleOptionClick(question.questionId, option.text)}
              >
                <h4 className="font-medium">{option.text}</h4>
                <p>{option.count} responses</p>
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