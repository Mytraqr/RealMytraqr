import React from 'react';
import { DriveStats, ScoringAverages } from '../../utils/stats';

interface StatsSummaryProps {
  scoringAverages: ScoringAverages;
  drivingStats: DriveStats;
  fairwayStats: { hit: number; total: number };
  girStats: { hit: number; total: number };
  upAndDownStats: { made: number; total: number };
  sandSaveStats: { made: number; total: number };
  averagePutts: number;
}

export default function StatsSummary({
  scoringAverages,
  drivingStats,
  fairwayStats,
  girStats,
  upAndDownStats,
  sandSaveStats,
  averagePutts
}: StatsSummaryProps) {
  // Calculate average driving distance
  const par4Distance = drivingStats.par4.count > 0 ? drivingStats.par4.average : 0;
  const par5Distance = drivingStats.par5.count > 0 ? drivingStats.par5.average : 0;
  
  // Display the higher average if both are available, or the available one if only one exists
  const displayDistance = par4Distance && par5Distance 
    ? Math.max(par4Distance, par5Distance)
    : par4Distance || par5Distance || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Scoring Averages */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Scoring Average</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Overall</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {scoringAverages.overall.toFixed(1)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Par 3s</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {scoringAverages.par3.toFixed(1)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Par 4s</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {scoringAverages.par4.toFixed(1)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Par 5s</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {scoringAverages.par5.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Driving Distance */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Driving Distance</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Average</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {displayDistance > 0 ? `${displayDistance} yards` : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Par 4s</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {par4Distance > 0 ? `${par4Distance} yards` : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Par 5s</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {par5Distance > 0 ? `${par5Distance} yards` : 'N/A'}
            </span>
          </div>
        </div>
      </div>

      {/* Rest of the stats remain the same */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Accuracy</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Fairways</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {fairwayStats.total > 0 ? `${Math.round((fairwayStats.hit / fairwayStats.total) * 100)}%` : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">GIR</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {girStats.total > 0 ? `${Math.round((girStats.hit / girStats.total) * 100)}%` : 'N/A'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Short Game</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Up & Downs</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {upAndDownStats.total > 0 ? `${Math.round((upAndDownStats.made / upAndDownStats.total) * 100)}%` : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Sand Saves</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {sandSaveStats.total > 0 ? `${Math.round((sandSaveStats.made / sandSaveStats.total) * 100)}%` : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Putts/Round</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {averagePutts || 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}