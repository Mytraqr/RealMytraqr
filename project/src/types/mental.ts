export interface EmotionLog {
  id: string;
  date: string;
  emotion: 'happy' | 'content' | 'neutral' | 'anxious' | 'stressed' | 'sad' | 'angry';
  intensity: number;
  happinessLevel: number; // 0-100 percentage
  factors: string[];
  goodThing: string;
  gratitude: string;
  actionStep?: string;
}

export interface EmotionStats {
  mostFrequent: string;
  commonFactor: string;
  averageIntensity: number;
  averageHappiness: number;
  weeklyPattern: {
    day: string;
    averageMood: number;
  }[];
}