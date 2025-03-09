import { EmotionLog } from '../types/mental';

export function calculateEmotionStats(logs: EmotionLog[]) {
  if (logs.length === 0) {
    return {
      mostFrequent: 'N/A',
      commonFactor: 'N/A',
      averageIntensity: 0,
      averageHappiness: 0,
      weeklyPattern: [
        { day: 'Sun', averageMood: 0 },
        { day: 'Mon', averageMood: 0 },
        { day: 'Tue', averageMood: 0 },
        { day: 'Wed', averageMood: 0 },
        { day: 'Thu', averageMood: 0 },
        { day: 'Fri', averageMood: 0 },
        { day: 'Sat', averageMood: 0 }
      ]
    };
  }

  // Calculate most frequent emotion
  const emotionCounts = logs.reduce((acc, log) => {
    acc[log.emotion] = (acc[log.emotion] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostFrequent = Object.entries(emotionCounts)
    .sort((a, b) => b[1] - a[1])[0][0];

  // Calculate most common factor
  const factorCounts = logs.reduce((acc, log) => {
    log.factors.forEach(factor => {
      acc[factor] = (acc[factor] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const commonFactor = Object.entries(factorCounts).length > 0
    ? Object.entries(factorCounts).sort((a, b) => b[1] - a[1])[0][0]
    : 'None';

  // Calculate averages
  const averageIntensity = Math.round(
    logs.reduce((sum, log) => sum + log.intensity, 0) / logs.length
  );

  const averageHappiness = Math.round(
    logs.reduce((sum, log) => sum + log.happinessLevel, 0) / logs.length
  );

  // Calculate weekly pattern
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayStats = Array(7).fill(0).map(() => ({ sum: 0, count: 0 }));

  logs.forEach(log => {
    const dayIndex = new Date(log.date).getDay();
    dayStats[dayIndex].sum += log.happinessLevel;
    dayStats[dayIndex].count++;
  });

  const weeklyPattern = dayNames.map((day, index) => ({
    day,
    averageMood: dayStats[index].count > 0
      ? Math.round(dayStats[index].sum / dayStats[index].count)
      : 0
  }));

  return {
    mostFrequent,
    commonFactor,
    averageIntensity,
    averageHappiness,
    weeklyPattern
  };
}