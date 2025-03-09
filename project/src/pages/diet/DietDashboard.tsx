import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import EmptyState from '../../components/EmptyState';
import { DayLog } from '../../types/meal';
import { analyzeDietBehavior, generateDailyTip } from '../../utils/dietAnalysis';

export default function DietDashboard() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<DayLog[]>([]);
  const [hasCompletedQuestionnaire, setHasCompletedQuestionnaire] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    // Check if user has completed the questionnaire
    const dietUserData = localStorage.getItem('dietUserData');
    const userData = dietUserData ? JSON.parse(dietUserData) : null;
    
    if (!userData?.onboardingCompleted) {
      navigate('/diet/questionnaire');
    } else {
      setHasCompletedQuestionnaire(true);
      setUserData(userData);
      const savedLogs = localStorage.getItem('dietLogs');
      if (savedLogs) {
        const parsedLogs = JSON.parse(savedLogs);
        setLogs(parsedLogs);
        
        // Analyze most recent log if exists
        if (parsedLogs.length > 0) {
          const latestLog = parsedLogs[parsedLogs.length - 1];
          const analysis = analyzeDietBehavior(latestLog, userData);
          setAnalysis(analysis);
        }
      }
    }
  }, [navigate]);

  if (!hasCompletedQuestionnaire) {
    return null;
  }

  if (logs.length === 0) {
    return (
      <EmptyState
        type="diet-dashboard"
        onAction={() => navigate('/diet/log-day')}
        message="Start Your Nutrition Journey!"
        tip="Begin by logging your daily meals. Track your progress and make informed decisions about your diet."
      />
    );
  }

  // Get the last 7 days of logs
  const recentLogs = logs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7)
    .reverse();

  const chartData = {
    labels: recentLogs.map(log => new Date(log.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Calories',
        data: recentLogs.map(log => log.totalCalories),
        borderColor: '#F97316',
        tension: 0.4,
        fill: false
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Weekly Calorie Trend',
        color: '#6B7280'
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: '#374151'
        },
        ticks: {
          color: '#6B7280'
        }
      },
      x: {
        grid: {
          color: '#374151'
        },
        ticks: {
          color: '#6B7280'
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nutrition Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your daily nutrition intake</p>
        </div>
      </div>

      {/* Analysis and Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {analysis && (
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 ${
            analysis.severity === 'success' ? 'border-l-4 border-green-500' :
            analysis.severity === 'warning' ? 'border-l-4 border-yellow-500' :
            'border-l-4 border-red-500'
          }`}>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Nutrition Analysis</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{analysis.message}</p>
            <div className="space-y-2">
              <p className="text-sm"><span className="font-medium">Tip:</span> {analysis.tip}</p>
              <p className="text-sm"><span className="font-medium">Try this:</span> {analysis.example}</p>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Daily Tip</h3>
          <p className="text-gray-600 dark:text-gray-400">{generateDailyTip()}</p>
        </div>
      </div>

      {/* Calorie Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="h-[400px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Target vs Actual */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Today's Progress</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>Calories</span>
              <span>{recentLogs[recentLogs.length - 1]?.totalCalories || 0} / {userData?.targetCalories || 0}</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div 
                className="h-2 bg-orange-500 rounded-full"
                style={{ 
                  width: `${Math.min(100, ((recentLogs[recentLogs.length - 1]?.totalCalories || 0) / (userData?.targetCalories || 1)) * 100)}%` 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}