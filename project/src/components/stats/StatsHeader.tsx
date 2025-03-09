import React from 'react';
import DateRangeSelector from '../DateRangeSelector';

interface StatsHeaderProps {
  activeTab: 'overview' | 'strokes-gained' | 'compare';
  onTabChange: (tab: 'overview' | 'strokes-gained' | 'compare') => void;
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export default function StatsHeader({
  activeTab,
  onTabChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}: StatsHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Performance Stats</h1>
        <p className="text-gray-600 dark:text-gray-400">Analyze your game and track improvements</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex rounded-lg overflow-hidden">
          <button
            onClick={() => onTabChange('overview')}
            className={`px-4 py-2 ${
              activeTab === 'overview'
                ? 'bg-orange-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onTabChange('strokes-gained')}
            className={`px-4 py-2 ${
              activeTab === 'strokes-gained'
                ? 'bg-orange-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Strokes Gained
          </button>
          <button
            onClick={() => onTabChange('compare')}
            className={`px-4 py-2 ${
              activeTab === 'compare'
                ? 'bg-orange-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Compare to Pro
          </button>
        </div>
        <DateRangeSelector
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
        />
      </div>
    </div>
  );
}