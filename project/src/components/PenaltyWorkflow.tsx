import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface PenaltyWorkflowProps {
  previousShots: {
    id: string;
    type: string;
    number: number;
  }[];
  onRehit: (shotId: string) => void;
  onContinue: () => void;
}

export default function PenaltyWorkflow({ previousShots, onRehit, onContinue }: PenaltyWorkflowProps) {
  const [showRehitOptions, setShowRehitOptions] = useState(false);

  return (
    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 space-y-4">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-orange-800 dark:text-orange-200">
            Penalty Shot Options
          </h3>
          <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
            Did you rehit the shot from the previous location?
          </p>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setShowRehitOptions(true)}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          Yes, rehit the shot
        </button>
        <button
          onClick={onContinue}
          className="px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50"
        >
          No, took a drop
        </button>
      </div>

      {showRehitOptions && (
        <div className="space-y-3">
          <p className="text-sm text-orange-700 dark:text-orange-300">
            Which shot are you rehitting?
          </p>
          <div className="space-y-2">
            {previousShots.map((shot) => (
              <button
                key={shot.id}
                onClick={() => onRehit(shot.id)}
                className="w-full px-4 py-2 text-left bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {shot.type === 'drive' ? 'Tee Shot' : `${shot.type.charAt(0).toUpperCase() + shot.type.slice(1)} Shot`}
                {' '}(Shot #{shot.number})
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}