import { StudyPreferences } from '../types/study';

export function checkStudyGoals(preferences: StudyPreferences, activities: any[]) {
  const today = new Date();
  const isWeekend = today.getDay() === 0 || today.getDay() === 6;
  const dailyTarget = isWeekend ? preferences.weekendGoal : preferences.dailyGoal;

  // Calculate total study time today
  const todayActivities = activities.filter(activity => {
    const activityDate = new Date(activity.timestamp);
    return activityDate.toDateString() === today.toDateString();
  });

  const totalMinutes = todayActivities.reduce((sum, activity) => sum + activity.duration, 0);

  // Generate notifications
  const notifications = [];

  if (totalMinutes < dailyTarget) {
    notifications.push({
      type: 'warning',
      message: `You're ${dailyTarget - totalMinutes} minutes behind your daily study goal. Keep going!`
    });
  }

  if (totalMinutes >= dailyTarget) {
    notifications.push({
      type: 'success',
      message: 'Great job! You've reached your daily study goal!'
    });
  }

  return notifications;
}