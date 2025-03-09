import React from 'react';
import { Activity } from '../../types/activity';
import { formatDuration } from '../../utils/activityUtils';
import { 
  BookOpen, 
  Briefcase, 
  Coffee, 
  Dumbbell, 
  Clock,
  MoreVertical 
} from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
  onEdit?: () => void;
  onDelete?: () => void;
}

const categoryIcons = {
  Study: BookOpen,
  Work: Briefcase,
  Exercise: Dumbbell,
  Break: Coffee,
  Reading: BookOpen,
  Other: Clock
};

const focusColors = {
  Low: 'bg-red-100 text-red-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  High: 'bg-green-100 text-green-800'
};

export default function ActivityCard({ activity, onEdit, onDelete }: ActivityCardProps) {
  const Icon = categoryIcons[activity.category];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{activity.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{activity.category}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {formatDuration(activity.duration)}
          </span>
          
          {(onEdit || onDelete) && (
            <div className="relative group">
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <MoreVertical className="w-4 h-4 text-gray-500" />
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block">
                {onEdit && (
                  <button
                    onClick={onEdit}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Edit Activity
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={onDelete}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Delete Activity
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${focusColors[activity.focusLevel]}`}>
          {activity.focusLevel} Focus
        </span>
        <span className="text-xs text-gray-500">
          {new Date(activity.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>

      {activity.notes && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {activity.notes}
        </p>
      )}
    </div>
  );
}