import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Moon, Sun, Bell, Lock, User, BookOpen, Clock } from 'lucide-react';

interface StudyPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    dailyReminder: boolean;
    weeklyReport: boolean;
  };
  studyPreferences: {
    defaultSessionLength: number;
    breakLength: number;
    weekendGoal: number;
    preferredTime: 'morning' | 'afternoon' | 'evening';
  };
  privacy: {
    shareProgress: boolean;
    showActivityLog: boolean;
  };
}

export default function StudySettings() {
  const { theme, setTheme } = useTheme();
  const [preferences, setPreferences] = useState<StudyPreferences>({
    notifications: {
      email: true,
      push: true,
      dailyReminder: true,
      weeklyReport: true
    },
    studyPreferences: {
      defaultSessionLength: 25,
      breakLength: 5,
      weekendGoal: 120,
      preferredTime: 'morning'
    },
    privacy: {
      shareProgress: true,
      showActivityLog: true
    }
  });

  const handleNotificationChange = (key: keyof typeof preferences.notifications) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handleStudyPrefChange = (key: keyof typeof preferences.studyPreferences, value: any) => {
    setPreferences(prev => ({
      ...prev,
      studyPreferences: {
        ...prev.studyPreferences,
        [key]: value
      }
    }));
  };

  const handlePrivacyChange = (key: keyof typeof preferences.privacy) => {
    setPreferences(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key]
      }
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Customize your Study & Work experience</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-8">
        {/* Theme Settings */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
            <Sun className="w-5 h-5 mr-2" />
            Theme
          </h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTheme('light')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                theme === 'light' 
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              <Sun className="w-5 h-5 mr-2" />
              Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                theme === 'dark' 
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              <Moon className="w-5 h-5 mr-2" />
              Dark
            </button>
          </div>
        </div>

        {/* Study Preferences */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Study Preferences
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Default Session Length (minutes)
              </label>
              <input
                type="number"
                value={preferences.studyPreferences.defaultSessionLength}
                onChange={(e) => handleStudyPrefChange('defaultSessionLength', Number(e.target.value))}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                min="5"
                max="120"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Break Length (minutes)
              </label>
              <input
                type="number"
                value={preferences.studyPreferences.breakLength}
                onChange={(e) => handleStudyPrefChange('breakLength', Number(e.target.value))}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                min="1"
                max="30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Weekend Study Goal (minutes)
              </label>
              <input
                type="number"
                value={preferences.studyPreferences.weekendGoal}
                onChange={(e) => handleStudyPrefChange('weekendGoal', Number(e.target.value))}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                min="0"
                max="480"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preferred Study Time
              </label>
              <select
                value={preferences.studyPreferences.preferredTime}
                onChange={(e) => handleStudyPrefChange('preferredTime', e.target.value)}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              >
                <option value="morning">Morning (6:00 - 12:00)</option>
                <option value="afternoon">Afternoon (12:00 - 17:00)</option>
                <option value="evening">Evening (17:00 - 22:00)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </h2>
          <div className="space-y-4">
            {Object.entries(preferences.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {key.split(/(?=[A-Z])/).join(' ')}
                  </h3>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleNotificationChange(key as keyof typeof preferences.notifications)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
            <Lock className="w-5 h-5 mr-2" />
            Privacy
          </h2>
          <div className="space-y-4">
            {Object.entries(preferences.privacy).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {key.split(/(?=[A-Z])/).join(' ')}
                  </h3>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handlePrivacyChange(key as keyof typeof preferences.privacy)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}