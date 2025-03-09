import React from 'react';
import { DriveStats } from '../utils/stats';
import { Round } from '../types/round';

// Pro benchmark stats
const PRO_STATS = {
  drivingDistance: 295,
  fairwayPercentage: 65,
  girPercentage: 70,
  upAndDownPercentage: 60,
  sandSavePercentage: 50,
  puttsPerRound: 28
};

interface CompareStatsProps {
  rounds: Round[];
  fairwaysHit: { hit: number; total: number };
  gir: { hit: number; total: number };
  upAndDowns: { made: number; total: number };
  sandSaves: { made: number; total: number };
  averagePutts: number;
  drivingStats: DriveStats;
}

interface StatComparisonProps {
  label: string;
  yourStat: number;
  proStat: number;
  unit?: string;
  isPercentage?: boolean;
}

const StatComparison: React.FC<StatComparisonProps> = ({ label, yourStat, proStat, unit, isPercentage }) => {
  const difference = yourStat - proStat;
  const displayValue = isPercentage ? `${yourStat}%` : `${yourStat}${unit ? ` ${unit}` : ''}`;
  const displayProValue = isPercentage ? `${proStat}%` : `${proStat}${unit ? ` ${unit}` : ''}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{label}</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Your Stats</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{displayValue}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Tour Pro</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{displayProValue}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Difference</p>
          <p className={`text-2xl font-bold ${difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {difference >= 0 ? '+' : ''}{difference}{isPercentage ? '%' : unit ? ` ${unit}` : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function CompareStats({
  rounds,
  fairwaysHit,
  gir,
  upAndDowns,
  sandSaves,
  averagePutts,
  drivingStats
}: CompareStatsProps) {
  const fairwayPercentage = Math.round((fairwaysHit.hit / fairwaysHit.total) * 100) || 0;
  const girPercentage = Math.round((gir.hit / gir.total) * 100) || 0;
  const upAndDownPercentage = Math.round((upAndDowns.made / upAndDowns.total) * 100) || 0;
  const sandSavePercentage = Math.round((sandSaves.made / sandSaves.total) * 100) || 0;

  const averageDriveDistance = Math.max(
    drivingStats.par4.average || 0,
    drivingStats.par5.average || 0
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Compare to Tour Pro</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatComparison 
          label="Driving Distance"
          yourStat={averageDriveDistance}
          proStat={PRO_STATS.drivingDistance}
          unit="yards"
        />
        <StatComparison 
          label="Fairways Hit"
          yourStat={fairwayPercentage}
          proStat={PRO_STATS.fairwayPercentage}
          isPercentage
        />
        <StatComparison 
          label="Greens in Regulation"
          yourStat={girPercentage}
          proStat={PRO_STATS.girPercentage}
          isPercentage
        />
        <StatComparison 
          label="Up and Down"
          yourStat={upAndDownPercentage}
          proStat={PRO_STATS.upAndDownPercentage}
          isPercentage
        />
        <StatComparison 
          label="Sand Saves"
          yourStat={sandSavePercentage}
          proStat={PRO_STATS.sandSavePercentage}
          isPercentage
        />
        <StatComparison 
          label="Putts per Round"
          yourStat={averagePutts}
          proStat={PRO_STATS.puttsPerRound}
        />
      </div>
    </div>
  );
}