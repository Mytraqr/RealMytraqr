import React, { useState, useEffect } from 'react';
import { Activity } from '../../types/activity';
import ActivityCard from '../../components/activity/ActivityCard';
import ActivityForm from '../../components/activity/ActivityForm';
import { Clock, Plus } from 'lucide-react';

export default function ActivityLog() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedActivities = localStorage.getItem('activities');
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    }
  }, []);

  const handleAddActivity = (newActivity: Omit<Activity, 'id'>) => {
    const activity = {
      ...newActivity,
      id: Date.now().toString()
    };
    
    const updatedActivities = [activity, ...activities];
    setActivities(updatedActivities);
    localStorage.setItem('activities', JSON.stringify(updatedActivities));
    setShowForm(false);
  };

  const handleDeleteActivity = (id: string) => {
    const updatedActivities = activities.filter(a => a.id !== id);
    setActivities(updatedActivities);
    localStorage.setItem('activities', JSON.stringify(updatedActivities));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Activity Log</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your study and work sessions</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Activity
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Add Activity</h2>
            <ActivityForm onSubmit={handleAddActivity} />
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 w-full px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {activities.length > 0 ? (
          activities.map(activity => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onDelete={() => handleDeleteActivity(activity.id)}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <Clock className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No activities yet</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Start by adding your first activity
            </p>
          </div>
        )}
      </div>
    </div>
  );
}