import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-orange-600 dark:text-orange-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {value.toString()}
            </h3>
          </div>
        </div>
        {trend && (
          <div className={`flex items-center ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <span className="text-sm font-medium">
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}