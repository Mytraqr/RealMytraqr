import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import DateRangeSelector from '../../components/DateRangeSelector';
import EmptyState from '../../components/EmptyState';
import { EmotionLog } from '../../types/mental';
import { calculateEmotionStats } from '../../utils/calculateEmotionStats';

export default function MentalStats() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [logs, setLogs] = useState<EmotionLog[]>([]);

  useEffect(() => {
    const savedLogs = localStorage.getItem('mentalLogs');
    if (savedLogs) {
      const parsedLogs = JSON.parse(savedLogs);
      setLogs(parsedLogs);
      if (parsedLogs.length > 0) {
        const earliestDate = parsedLogs.reduce((earliest: string, log: EmotionLog) => 
          log.date < earliest ? log.date : earliest
        , parsedLogs[0].date);
        setStartDate(earliestDate);
      }
    }
  }, []);

  if (logs.length === 0) {
    return (
      <EmptyState
        type="mental-stats"
        onAction={() => navigate('/mental/daily-log')}
        message="Track Your Mental Well-being"
        tip="Regular tracking helps identify emotional patterns and triggers, leading to better self-awareness."
      />
    );
  }

  const filteredLogs = logs.filter(log => {
    const logDate = new Date(log.date);
    return (!startDate || logDate >= new Date(startDate)) &&
           (!endDate || logDate <= new Date(endDate));
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const stats = calculateEmotionStats(filteredLogs);

  const happinessData = {
    labels: filteredLogs.map(log => new Date(log.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Happiness Level',
        data: filteredLogs.map(log => log.happinessLevel),
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
        text: 'Happiness Level Trend',
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mental Wellness Stats</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your emotional patterns</p>
        </div>
        <div className="flex items-center space-x-4">
          <DateRangeSelector
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
          <button
            onClick={() => navigate('/mental/daily-log')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Start Logging
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Average Happiness</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.averageHappiness}%</p>
          <p className="text-sm text-gray-500">Overall average</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Most Frequent Emotion</h3>
          <p className="text-3xl font-bold text-purple-600 capitalize">{stats.mostFrequent}</p>
          <p className="text-sm text-gray-500">Most common emotional state</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Common Factor</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.commonFactor}</p>
          <p className="text-sm text-gray-500">Most influential factor</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="h-[400px]">
          <Line data={happinessData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Weekly Pattern</h3>
        <div className="grid grid-cols-7 gap-4">
          {stats.weeklyPattern.map((day) => (
            <div key={day.day} className="text-center">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{day.day}</p>
              <p className="text-lg font-bold text-purple-600">{day.averageMood}%</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Wellness Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Based on Your Patterns</h4>
            <p className="text-sm text-purple-800 dark:text-purple-200">
              {stats.mostFrequent === 'stressed' || stats.mostFrequent === 'anxious'
                ? 'Consider incorporating stress-management techniques like deep breathing or meditation.'
                : stats.mostFrequent === 'sad'
                ? 'Try to engage in activities that bring you joy and connect with supportive people.'
                : 'Keep maintaining activities and relationships that contribute to your emotional well-being.'}
            </p>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <h4 className="font-medium text-orange-900 dark:text-orange-100 mb-2">Improvement Focus</h4>
            <p className="text-sm text-orange-800 dark:text-orange-200">
              {stats.commonFactor === 'Sleep'
                ? 'Focus on establishing a consistent sleep schedule and bedtime routine.'
                : stats.commonFactor === 'Work'
                ? 'Try implementing regular breaks and setting clear boundaries.'
                : stats.commonFactor === 'Exercise'
                ? 'Consider starting with short daily walks or gentle stretching.'
                : 'Pay attention to how different factors affect your mood and make adjustments accordingly.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}