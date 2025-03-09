import { StrokesGainedAnalysis, StrokesGainedInsight } from './types';

export function generateStrokesGainedInsights(strokesGained: StrokesGainedAnalysis): StrokesGainedInsight[] {
  const insights: StrokesGainedInsight[] = [];
  const { categories, clubs } = strokesGained;

  // Overall game insights
  const bestCategory = Object.entries(categories)
    .sort(([, a], [, b]) => b.average - a.average)[0];
  const worstCategory = Object.entries(categories)
    .sort(([, a], [, b]) => a.average - b.average)[0];

  insights.push({
    type: 'strength',
    message: `Your strongest area is ${bestCategory[0]} shots, gaining ${bestCategory[1].average.toFixed(2)} strokes per shot.`
  });

  insights.push({
    type: 'weakness',
    message: `Focus on improving your ${worstCategory[0]} shots, currently losing ${Math.abs(worstCategory[1].average).toFixed(2)} strokes per shot.`
  });

  // Club-specific insights
  if (clubs.length > 0) {
    const bestClub = clubs[0];
    const worstClub = clubs[clubs.length - 1];

    insights.push({
      type: 'club-strength',
      message: `Your ${bestClub.name} is your best club, gaining ${bestClub.average.toFixed(2)} strokes per shot.`
    });

    if (worstClub.average < 0) {
      insights.push({
        type: 'club-weakness',
        message: `Consider practicing with your ${worstClub.name}, currently losing ${Math.abs(worstClub.average).toFixed(2)} strokes per shot.`
      });
    }
  }

  return insights;
}