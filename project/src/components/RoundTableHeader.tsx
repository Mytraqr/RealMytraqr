import React from 'react';

export default function RoundTableHeader() {
  return (
    <thead className="bg-gray-50 dark:bg-gray-700">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
          Date
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
          Course
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
          Score
        </th>
        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );
}