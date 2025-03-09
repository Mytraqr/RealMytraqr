```typescript
import React from 'react';
import { BarChart2, TrendingUp, TrendingDown } from 'lucide-react';
import { calculateStrokesGained, generateStrokesGainedInsights } from '../utils/strokesGained';
import { Round } from '../types/round';

interface StrokesGainedAnalysisProps {
  rounds: Round[];
}

export default function StrokesGainedAnalysis({ rounds }: StrokesGainedAnalysisProps) {
  const strokesGained = calculateStrokesGained(rounds);
  const insights = generateStrokesGainedInsights(strokesGained);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Strokes Gained Analysis
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Based on last {rounds.length} rounds
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(strokesGained.categories).map(([category, stats]) => (
          <div key={category} className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                {category}
              </h3>
              {stats.average > 0 ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500" />
              )}
            </div>
            <p className={`text-2xl font-bold ${
              stats.average > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {stats.average > 0 ? '+' : ''}{stats.average.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {stats.shots} shots analyzed
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Club Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {strokesGained.clubs.map((club) => (
            <div 
              key={club.name}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white capitalize">
                  {club.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {club.shots} shots
                </p>
              </div>
              <div className={`text-lg font-bold ${
                club.average > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {club.average > 0 ? '+' : ''}{club.average.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
          <BarChart2 className="w-5 h-5 mr-2" />
          Insights
        </h3>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg ${
                insight.type.includes('strength')
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                  : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
              }`}
            >
              {insight.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```