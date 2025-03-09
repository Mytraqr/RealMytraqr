import React from 'react';
import { Calendar } from 'lucide-react';

interface DateRangeProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export default function DateRangeSelector({ startDate, endDate, onStartDateChange, onEndDateChange }: DateRangeProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          From
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            max={endDate}
            className="pl-10 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
      </div>

      <div className="relative">
        <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          To
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            min={startDate}
            max={new Date().toISOString().split('T')[0]}
            className="pl-10 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
      </div>
    </div>
  );
}