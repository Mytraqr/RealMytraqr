export interface Activity {
  id: string;
  name: string;
  category: 'Study' | 'Work' | 'Exercise' | 'Break' | 'Reading' | 'Other';
  duration: number; // in minutes
  focusLevel: 'Low' | 'Medium' | 'High';
  notes?: string;
  timestamp: string;
}

export interface Goal {
  id: string;
  name: string;
  category: Activity['category'];
  targetHours: number;
  timeframe: 'daily' | 'weekly' | 'monthly';
  startDate: string;
  endDate: string;
  completed: boolean;
}

export interface ActivitySummary {
  totalTime: number;
  categoryBreakdown: Record<Activity['category'], number>;
  focusLevels: Record<'Low' | 'Medium' | 'High', number>;
  mostProductiveTime: string;
  completedTasks: number;
}