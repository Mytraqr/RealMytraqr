import React from 'react';
import { useUnitPreferences } from '../hooks/useUnitPreferences';

interface Shot {
  id: string;
  type: 'drive' | 'approach' | 'greenside' | 'putt' | 'penalty';
  result?: string;
  distance?: number;
  lie?: string;
  direction?: 'left' | 'right';
  club?: 'driver' | 'wood' | 'long-iron';
  penaltyShot?: number;
}

interface ShotBlockProps {
  shot: Shot;
  onUpdate: (updates: Partial<Shot>) => void;
  onRemove: () => void;
  onAddPenalty?: () => void;
  holePar: number;
  holeYardage: number;
}

export default function ShotBlock({ shot, onUpdate, onRemove, onAddPenalty, holePar, holeYardage }: ShotBlockProps) {
  const { preferences } = useUnitPreferences();

  const handleResultChange = (value: string) => {
    onUpdate({ result: value });
    if (value === 'hazard' && onAddPenalty) {
      onAddPenalty();
    }
  };

  const renderFields = () => {
    switch (shot.type) {
      case 'drive':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Club</label>
              <select
                value={shot.club || 'driver'}
                onChange={(e) => onUpdate({ club: e.target.value as Shot['club'] })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="driver">Driver</option>
                <option value="wood">Wood</option>
                <option value="long-iron">Long Iron</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Result</label>
              <select
                value={shot.result || ''}
                onChange={(e) => handleResultChange(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="">Select Result</option>
                <option value="fairway">Fairway</option>
                <option value="rough">Rough</option>
                <option value="bunker">Bunker</option>
                <option value="hazard">Hazard</option>
                <option value="green">Green</option>
              </select>
            </div>
            {shot.result && shot.result !== 'fairway' && shot.result !== 'green' && shot.result !== 'hazard' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Direction</label>
                <select
                  value={shot.direction || ''}
                  onChange={(e) => onUpdate({ direction: e.target.value as 'left' | 'right' })}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select Direction</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
            )}
          </div>
        );

      case 'penalty':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                The ___ shot went into the penalty
              </label>
              <select
                value={shot.penaltyShot || 1}
                onChange={(e) => onUpdate({ penaltyShot: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                {Array.from({ length: 15 }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>
                    {num}{num === 1 ? 'st' : num === 2 ? 'nd' : num === 3 ? 'rd' : 'th'}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Penalty Type
              </label>
              <select
                value={shot.result || ''}
                onChange={(e) => onUpdate({ result: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="">Select Penalty Type</option>
                <option value="ob">Out of Bounds (2 strokes)</option>
                <option value="hazard">Hazard (1 stroke)</option>
                <option value="lost">Lost Ball (1 stroke)</option>
                <option value="other">Other (1 stroke)</option>
              </select>
            </div>
            {shot.penaltyShot === 1 && (
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  Tip: On the tee shot block, just enter in where your second shot went; you had a rehit, where your second tee shot went and carry on from there.
                </p>
              </div>
            )}
          </div>
        );

      case 'approach':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Distance ({preferences.distanceUnit})
              </label>
              <input
                type="number"
                value={holePar === 3 ? holeYardage : (shot.distance || '')}
                onChange={(e) => onUpdate({ distance: Number(e.target.value) })}
                placeholder={`Enter distance in ${preferences.distanceUnit}`}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                disabled={holePar === 3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Lie</label>
              <select
                value={shot.lie || ''}
                onChange={(e) => onUpdate({ lie: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="">Select Lie</option>
                <option value="fairway">Fairway</option>
                <option value="rough">Rough</option>
                <option value="bunker">Bunker</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Result</label>
              <select
                value={shot.result || ''}
                onChange={(e) => handleResultChange(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="">Select Result</option>
                <option value="green">Green</option>
                <option value="fringe">Fringe</option>
                <option value="rough">Rough</option>
                <option value="bunker">Bunker</option>
                <option value="hazard">Hazard</option>
              </select>
            </div>
          </div>
        );

      case 'greenside':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Distance ({preferences.distanceUnit})
              </label>
              <input
                type="number"
                value={shot.distance || ''}
                onChange={(e) => onUpdate({ distance: Number(e.target.value) })}
                placeholder={`Enter distance in ${preferences.distanceUnit}`}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Lie</label>
              <select
                value={shot.lie || ''}
                onChange={(e) => onUpdate({ lie: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="">Select Lie</option>
                <option value="fringe">Fringe</option>
                <option value="rough">Rough</option>
                <option value="bunker">Bunker</option>
              </select>
            </div>
          </div>
        );

      case 'putt':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Distance ({preferences.puttingUnit})
            </label>
            <input
              type="number"
              value={shot.distance || ''}
              onChange={(e) => onUpdate({ distance: Number(e.target.value) })}
              placeholder={`Enter distance in ${preferences.puttingUnit}`}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 ${
      shot.type === 'drive' ? 'border-blue-500' :
      shot.type === 'approach' ? 'border-green-500' :
      shot.type === 'greenside' ? 'border-yellow-500' :
      shot.type === 'putt' ? 'border-purple-500' :
      'border-red-500'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900 dark:text-white">
          {shot.type === 'drive' ? 'Tee Shot' : shot.type.charAt(0).toUpperCase() + shot.type.slice(1)}
        </h3>
        <button
          onClick={onRemove}
          className="text-red-600 hover:text-red-700 text-sm"
        >
          Remove
        </button>
      </div>
      {renderFields()}
    </div>
  );
}