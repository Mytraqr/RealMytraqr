import React from 'react';
import { Calendar, Flag } from 'lucide-react';
import { calculateHoleScore } from '../utils/calculateStats';

interface RecentRoundProps {
  date: string;
  course: string;
  score: number;
  par: number;
}

export default function RecentRoundCard({ date, course, score, par }: RecentRoundProps) {
  const scoreDiff = score && par ? score - par : null;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Flag className="w-5 h-5 text-orange-600 dark:text-orange-500" />
          <h3 className="font-medium text-gray-900 dark:text-white">{course}</h3>
        </div>
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
          <Calendar className="w-4 h-4 mr-1" />
          {date}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Score</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {score > 0 ? score : '-'}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-400">vs Par</p>
          {scoreDiff !== null && score > 0 ? (
            <p className={`text-lg font-semibold ${
              scoreDiff > 0 ? 'text-red-600' : 
              scoreDiff < 0 ? 'text-green-600' : 
              'text-gray-600'
            }`}>
              {scoreDiff > 0 ? '+' : ''}{scoreDiff}
            </p>
          ) : (
            <p className="text-lg font-semibold text-gray-400">-</p>
          )}
        </div>
      </div>
    </div>
  );
}