import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Activity } from '../../types/activity';
import { calculateActivitySummary } from '../../utils/activityUtils';
import DateRangeSelector from '../../components/DateRangeSelector';
import { Brain, Target, Clock, CheckCircle } from 'lucide-react';

export default function StudyStats() {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const savedActivities = localStorage.getItem('activities');
    if (savedActivities) {
      const parsedActivities = JSON.parse(savedActivities);
      if (parsedActivities.length > 0) {
        setActivities(parsedActivities);
        // Set initial start date to earliest activity
        const earliestDate = parsedActivities.reduce((earliest: string, activity: Activity) => 
          activity.timestamp < earliest ? activity.timestamp : earliest
        , parsedActivities[0].timestamp);
        setStartDate(earliestDate.split('T')[0]);
      }
    }
  }, []);

  const filteredActivities = activities.filter(activity => {
    const activityDate = new Date(activity.timestamp);
    return (!startDate || activityDate >= new Date(startDate)) &&
           (!endDate || activityDate <= new Date(endDate));
  });

  const summary = calculateActivitySummary(filteredActivities);

  const focusData = {
    labels: filteredActivities.map(a => new Date(a.timestamp).toLocaleDateString()),
    datasets: [{
      label: 'Focus Level',
      data: filteredActivities.map(a => a.focusLevel === 'High' ? 3 : a.focusLevel === 'Medium' ? 2 : 1),
      borderColor: 'rgb(59, 130, 246)',
      tension: 0.4
    }]
  };

  const categoryData = {
    labels: Object.keys(summary.categoryBreakdown),
    datasets: [{
      label: 'Time Spent (hours)',
      data: Object.values(summary.categoryBreakdown).map(minutes => Math.round(minutes / 60)),
      backgroundColor: [
        'rgba(59, 130, 246, 0.5)',
        'rgba(16, 185, 129, 0.5)',
        'rgba(245, 158, 11, 0.5)',
        'rgba(239, 68, 68, 0.5)',
        'rgba(139, 92, 246, 0.5)',
        'rgba(107, 114, 128, 0.5)'
      ]
    }]
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Activity Statistics</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your productivity trends</p>
        </div>
        <DateRangeSelector
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Time</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(summary.totalTime / 60)}h
              </h3>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">High Focus Sessions</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {summary.focusLevels.High}
              </h3>
            </div>
            <Brain className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tasks Completed</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {summary.completedTasks}
              </h3>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Peak Time</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {summary.mostProductiveTime || '-'}
              </h3>
            </div>
            <Target className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Focus Trend</h3>
          <div className="h-64">
            <Line 
              data={focusData} 
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

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Category Breakdown</h3>
          <div className="h-64">
            <Line 
              data={categoryData}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}