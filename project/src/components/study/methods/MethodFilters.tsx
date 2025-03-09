import React from 'react';
import { Duration, FocusLevel } from '../../../types/study';

interface MethodFiltersProps {
  selectedCategory: Duration | 'all';
  selectedFocus: FocusLevel | 'all';
  onCategoryChange: (category: Duration | 'all') => void;
  onFocusChange: (focus: FocusLevel | 'all') => void;
}

export default function MethodFilters({
  selectedCategory,
  selectedFocus,
  onCategoryChange,
  onFocusChange
}: MethodFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Duration
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value as Duration | 'all')}
          className="rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Durations</option>
          <option value="short">Short (≤30 mins)</option>
          <option value="medium">Medium (30-60 mins)</option>
          <option value="long">Long ({'>'}60 mins)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Focus Level
        </label>
        <select
          value={selectedFocus}
          onChange={(e) => onFocusChange(e.target.value as FocusLevel | 'all')}
          className="rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Levels</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
    </div>
  );
}