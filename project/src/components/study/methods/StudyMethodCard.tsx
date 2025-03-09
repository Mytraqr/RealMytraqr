import React from 'react';
import { CheckCircle } from 'lucide-react';
import { StudyMethod } from '../../../types/study';

interface StudyMethodCardProps {
  method: StudyMethod;
}

export default function StudyMethodCard({ method }: StudyMethodCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-4">
        {method.icon}
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{method.name}</h3>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 mb-4">{method.description}</p>
      
      <div className="flex items-center space-x-4 mb-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {method.duration} duration
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
          {method.focusLevel} focus
        </span>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Steps:</h4>
        <ul className="space-y-2">
          {method.steps.map((step, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Best For:</h4>
        <ul className="space-y-1">
          {method.bestFor.map((item, index) => (
            <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
              • {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}