import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import EmptyState from '../../components/EmptyState';
import { EmotionLog } from '../../types/mental';
import { calculateEmotionStats } from '../../utils/calculateEmotionStats';

export default function MentalDashboard() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<EmotionLog[]>([]);

  useEffect(() => {
    const savedLogs = localStorage.getItem('mentalLogs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  if (logs.length === 0) {
    return (
      <EmptyState
        type="mental-dashboard"
        onAction={() => navigate('/mental/daily-log')}
        message="Track Your Emotional Journey"
        tip="Regular emotion tracking can improve self-awareness and mental well-being. Start your emotional wellness journey today."
      />
    );
  }

  const recentLogs = [...logs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7)
    .reverse();

  const stats = calculateEmotionStats(recentLogs);

  const happinessData = {
    labels: recentLogs.map(log => new Date(log.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Happiness Level',
        data: recentLogs.map(log => log.happinessLevel),
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.5)',
        tension: 0.3
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: '7-Day Happiness Trend',
        color: '#6B7280'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Happiness Level (%)'
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mental Wellness Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Track and understand your emotional well-being</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Current Mood</h3>
          <p className="text-3xl font-bold text-purple-600 capitalize">
            {recentLogs[recentLogs.length - 1]?.emotion || 'N/A'}
          </p>
          <p className="text-sm text-gray-500">Latest recorded emotion</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Average Happiness</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.averageHappiness}%</p>
          <p className="text-sm text-gray-500">7-day average</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="h-[400px]">
          <Line data={happinessData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Entries</h3>
        <div className="space-y-4">
          {recentLogs.map(log => (
            <div key={log.id} className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {new Date(log.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 capitalize">{log.emotion}</p>
              </div>
              <span className="text-purple-600 font-medium">{log.happinessLevel}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}