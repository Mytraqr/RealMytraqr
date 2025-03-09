import { Activity, ActivitySummary } from '../types/activity';

export function calculateActivitySummary(activities: Activity[]): ActivitySummary {
  const summary: ActivitySummary = {
    totalTime: 0,
    categoryBreakdown: {
      Study: 0,
      Work: 0,
      Exercise: 0,
      Break: 0,
      Reading: 0,
      Other: 0
    },
    focusLevels: {
      Low: 0,
      Medium: 0,
      High: 0
    },
    mostProductiveTime: '',
    completedTasks: activities.length
  };

  activities.forEach(activity => {
    // Update total time
    summary.totalTime += activity.duration;

    // Update category breakdown
    summary.categoryBreakdown[activity.category] += activity.duration;

    // Update focus levels
    summary.focusLevels[activity.focusLevel]++;
  });

  // Find most productive time
  if (activities.length > 0) {
    const productiveActivities = activities
      .filter(a => a.focusLevel === 'High')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    if (productiveActivities.length > 0) {
      summary.mostProductiveTime = new Date(productiveActivities[0].timestamp)
        .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }

  return summary;
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes}m`;
  } else if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}m`;
}

export function getProductivityPercentage(activities: Activity[]): number {
  if (activities.length === 0) return 0;

  const focusScores = {
    Low: 0.3,
    Medium: 0.6,
    High: 1
  };

  const totalScore = activities.reduce((sum, activity) => 
    sum + (focusScores[activity.focusLevel] * activity.duration), 0);
  
  const maxPossibleScore = activities.reduce((sum, activity) => 
    sum + activity.duration, 0);

  return Math.round((totalScore / maxPossibleScore) * 100);
}