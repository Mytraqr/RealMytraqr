import React from 'react';
import { X } from 'lucide-react';
import { UnitPreferences } from '../hooks/useUnitPreferences';

interface UnitPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UnitPreferences;
  onSave: (preferences: UnitPreferences) => void;
}

export default function UnitPreferencesModal({
  isOpen,
  onClose,
  preferences,
  onSave
}: UnitPreferencesModalProps) {
  const [localPreferences, setLocalPreferences] = React.useState(preferences);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Distance Units</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Distance Measurement
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="distance"
                  value="yards"
                  checked={localPreferences.distance === 'yards'}
                  onChange={(e) => setLocalPreferences({
                    ...localPreferences,
                    distance: e.target.value as 'yards' | 'meters'
                  })}
                  className="mr-2 text-orange-600 focus:ring-orange-500"
                />
                Yards
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="distance"
                  value="meters"
                  checked={localPreferences.distance === 'meters'}
                  onChange={(e) => setLocalPreferences({
                    ...localPreferences,
                    distance: e.target.value as 'yards' | 'meters'
                  })}
                  className="mr-2 text-orange-600 focus:ring-orange-500"
                />
                Meters
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Putting Distance
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="putting"
                  value="feet"
                  checked={localPreferences.putting === 'feet'}
                  onChange={(e) => setLocalPreferences({
                    ...localPreferences,
                    putting: e.target.value as 'feet' | 'inches'
                  })}
                  className="mr-2 text-orange-600 focus:ring-orange-500"
                />
                Feet
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="putting"
                  value="inches"
                  checked={localPreferences.putting === 'inches'}
                  onChange={(e) => setLocalPreferences({
                    ...localPreferences,
                    putting: e.target.value as 'feet' | 'inches'
                  })}
                  className="mr-2 text-orange-600 focus:ring-orange-500"
                />
                Inches
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(localPreferences);
              onClose();
            }}
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}