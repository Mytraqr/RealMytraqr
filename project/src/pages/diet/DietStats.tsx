import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import DateRangeSelector from '../../components/DateRangeSelector';
import EmptyState from '../../components/EmptyState';
import { DayLog } from '../../types/meal';
import { calculateAverages } from '../../utils/calculateNutrition';

interface UserData {
  bmr: number;
  tdee: number;
  targetCalories: number;
  goal: string;
}

export default function DietStats() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [logs, setLogs] = useState<DayLog[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const savedLogs = localStorage.getItem('dietLogs');
    const savedUserData = localStorage.getItem('dietUserData');
    
    if (savedLogs) {
      const parsedLogs = JSON.parse(savedLogs);
      setLogs(parsedLogs);
      if (parsedLogs.length > 0) {
        const earliestDate = parsedLogs.reduce((earliest: string, log: DayLog) => 
          log.date < earliest ? log.date : earliest
        , parsedLogs[0].date);
        setStartDate(earliestDate);
      }
    }

    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

  if (logs.length === 0) {
    return (
      <EmptyState
        type="diet-stats"
        onAction={() => navigate('/diet/log-day')}
        message="Track Your Nutrition Progress"
        tip="Log your meals consistently to see detailed statistics and track your nutritional goals."
      />
    );
  }

  const filteredLogs = logs.filter(log => {
    const logDate = new Date(log.date);
    return (!startDate || logDate >= new Date(startDate)) &&
           (!endDate || logDate <= new Date(endDate));
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const averages = calculateAverages(filteredLogs);

  const chartData = {
    labels: filteredLogs.map(log => new Date(log.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Calories',
        data: filteredLogs.map(log => log.totalCalories),
        borderColor: '#F97316',
        tension: 0.4
      },
      {
        label: 'Protein',
        data: filteredLogs.map(log => log.totalProtein),
        borderColor: '#4F46E5',
        tension: 0.4
      },
      {
        label: 'Carbs',
        data: filteredLogs.map(log => log.totalCarbs),
        borderColor: '#10B981',
        tension: 0.4
      },
      {
        label: 'Fat',
        data: filteredLogs.map(log => log.totalFat),
        borderColor: '#F59E0B',
        tension: 0.4
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nutrition Stats</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your nutritional progress</p>
        </div>
        <div className="flex items-center space-x-4">
          <DateRangeSelector
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
          <button
            onClick={() => navigate('/diet/log-day')}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Start Logging
          </button>
        </div>
      </div>

      {/* Your Calculated Needs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Calculated Needs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">BMR</h3>
            <p className="text-3xl font-bold text-orange-600">{userData?.bmr || 0}</p>
            <p className="text-sm text-gray-500">Base calories needed at rest</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">TDEE</h3>
            <p className="text-3xl font-bold text-orange-600">{userData?.tdee || 0}</p>
            <p className="text-sm text-gray-500">Total daily energy expenditure</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Target</h3>
            <p className="text-3xl font-bold text-orange-600">{userData?.targetCalories || 0}</p>
            <p className="text-sm text-gray-500">Daily calorie goal for {userData?.goal}</p>
          </div>
        </div>
      </div>

      {/* Current Averages */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Average Calories</h3>
          <p className="text-3xl font-bold text-orange-600">{averages.calories}</p>
          <p className="text-sm text-gray-500">kcal per day</p>
          {userData?.targetCalories && (
            <div className="mt-2">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div 
                  className="h-2 bg-orange-500 rounded-full"
                  style={{ width: `${Math.min(100, (averages.calories / userData.targetCalories) * 100)}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {Math.round((averages.calories / userData.targetCalories) * 100)}% of target
              </p>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Average Protein</h3>
          <p className="text-3xl font-bold text-indigo-600">{averages.protein}</p>
          <p className="text-sm text-gray-500">grams per day</p>
          <div className="mt-2">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div 
                className="h-2 bg-indigo-500 rounded-full"
                style={{ width: `${Math.min(100, (averages.protein / (userData?.targetCalories || 2000) * 4) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Average Carbs</h3>
          <p className="text-3xl font-bold text-emerald-600">{averages.carbs}</p>
          <p className="text-sm text-gray-500">grams per day</p>
          <div className="mt-2">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div 
                className="h-2 bg-emerald-500 rounded-full"
                style={{ width: `${Math.min(100, (averages.carbs / (userData?.targetCalories || 2000) * 4) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Average Fat</h3>
          <p className="text-3xl font-bold text-amber-600">{averages.fat}</p>
          <p className="text-sm text-gray-500">grams per day</p>
          <div className="mt-2">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div 
                className="h-2 bg-amber-500 rounded-full"
                style={{ width: `${Math.min(100, (averages.fat / (userData?.targetCalories || 2000) * 9) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Nutrition Trends */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Nutrition Trends</h3>
        <div className="h-[400px]">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}