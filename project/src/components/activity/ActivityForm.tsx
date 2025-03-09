import React, { useState } from 'react';
import { Activity } from '../../types/activity';
import { Clock } from 'lucide-react';

interface ActivityFormProps {
  onSubmit: (activity: Omit<Activity, 'id'>) => void;
  initialValues?: Activity;
}

export default function ActivityForm({ onSubmit, initialValues }: ActivityFormProps) {
  const [formData, setFormData] = useState({
    name: initialValues?.name || '',
    category: initialValues?.category || 'Study',
    duration: initialValues?.duration || 30,
    focusLevel: initialValues?.focusLevel || 'Medium',
    notes: initialValues?.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Activity Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as Activity['category'] })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="Study">Study</option>
          <option value="Work">Work</option>
          <option value="Exercise">Exercise</option>
          <option value="Break">Break</option>
          <option value="Reading">Reading</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Duration (minutes)
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            min="1"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
            className="block w-full pl-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Focus Level
        </label>
        <select
          value={formData.focusLevel}
          onChange={(e) => setFormData({ ...formData, focusLevel: e.target.value as Activity['focusLevel'] })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Notes (optional)
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {initialValues ? 'Update Activity' : 'Add Activity'}
        </button>
      </div>
    </form>
  );
}