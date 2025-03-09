import React, { useState, useEffect } from 'react';
import { Activity } from '../../types/activity';
import { calculateActivitySummary, getProductivityPercentage } from '../../utils/activityUtils';
import { Line } from 'react-chartjs-2';
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp,
  CheckCircle
} from 'lucide-react';

export default function StudyDashboard() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [productivityScore, setProductivityScore] = useState(0);

  useEffect(() => {
    const savedActivities = localStorage.getItem('activities');
    if (savedActivities) {
      const parsed = JSON.parse(savedActivities);
      setActivities(parsed);
      setSummary(calculateActivitySummary(parsed));
      setProductivityScore(getProductivityPercentage(parsed));
    }
  }, []);

  const chartData = {
    labels: activities.map(a => new Date(a.timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })),
    datasets: [{
      label: 'Focus Level',
      data: activities.map(a => a.focusLevel === 'High' ? 3 : a.focusLevel === 'Medium' ? 2 : 1),
      borderColor: 'rgb(59, 130, 246)',
      tension: 0.4
    }]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Productivity Score</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {productivityScore}%
              </h3>
            </div>
            <Target className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Time Today</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {summary ? Math.round(summary.totalTime / 60) : 0}h
              </h3>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tasks Completed</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {summary?.completedTasks || 0}
              </h3>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Most Productive</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {summary?.mostProductiveTime || '-'}
              </h3>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {activities.length > 0 ? (
        <>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Focus Trend</h3>
            <div className="h-64">
              <Line 
                data={chartData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 3,
                      ticks: {
                        callback: (value) => {
                          return ['Low', 'Medium', 'High'][Number(value) - 1] || '';
                        }
                      }
                    }
                  }
                }} 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Category Breakdown
              </h3>
              {/* Add pie chart for category breakdown */}
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Recent Activities
              </h3>
              {/* Add recent activities list */}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No activities yet</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Start by adding your first activity
          </p>
          <div className="mt-6">
            <button
              onClick={() => {/* Add navigation to activity form */}}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Clock className="mr-2 h-5 w-5" />
              Track Activity
            </button>
          </div>
        </div>
      )}
    </div>
  );
}