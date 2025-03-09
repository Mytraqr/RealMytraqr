import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useUnitPreferences } from '../hooks/useUnitPreferences';
import { Moon, Sun, Ruler, Bell, Lock, User } from 'lucide-react';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { preferences, setPreferences } = useUnitPreferences();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Customize your Traqr experience</p>
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
                  ? 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300' 
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
                  ? 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              <Moon className="w-5 h-5 mr-2" />
              Dark
            </button>
          </div>
        </div>

        {/* Measurement Units */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
            <Ruler className="w-5 h-5 mr-2" />
            Measurement Units
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Distance Measurement
              </label>
              <select
                value={preferences.distanceUnit}
                onChange={(e) => setPreferences({
                  ...preferences,
                  distanceUnit: e.target.value as 'yards' | 'meters'
                })}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="yards">Yards</option>
                <option value="meters">Meters</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Putting Distance
              </label>
              <select
                value={preferences.puttingUnit}
                onChange={(e) => setPreferences({
                  ...preferences,
                  puttingUnit: e.target.value as 'feet' | 'inches'
                })}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="feet">Feet</option>
                <option value="inches">Inches</option>
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
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Notifications</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive round summaries and stats updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Push Notifications</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get alerts for new features and updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={pushNotifications}
                  onChange={(e) => setPushNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Account
          </h2>
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              Edit Profile
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              Change Email
            </button>
          </div>
        </div>

        {/* Security */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
            <Lock className="w-5 h-5 mr-2" />
            Security
          </h2>
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              Change Password
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              Two-Factor Authentication
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}