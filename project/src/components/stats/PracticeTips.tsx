import React from 'react';

interface PracticeTipsProps {
  drivingTips: string[];
  puttingTips: string[];
  approachTips: string[];
}

export default function PracticeTips({
  drivingTips,
  puttingTips,
  approachTips
}: PracticeTipsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Practice Recommendations</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
          <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">Driving Practice</h4>
          <ul className="list-disc pl-5 space-y-2 text-orange-700 dark:text-orange-300">
            {drivingTips.slice(0, 2).map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
        
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
          <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">Putting Focus</h4>
          <ul className="list-disc pl-5 space-y-2 text-orange-700 dark:text-orange-300">
            {puttingTips.slice(0, 2).map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
        
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
          <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">Approach Shots</h4>
          <ul className="list-disc pl-5 space-y-2 text-orange-700 dark:text-orange-300">
            {approachTips.slice(0, 2).map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}