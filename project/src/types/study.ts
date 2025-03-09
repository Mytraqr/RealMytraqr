import { ReactNode } from 'react';

export type Duration = 'short' | 'medium' | 'long';
export type FocusLevel = 'Low' | 'Medium' | 'High';

export interface StudyMethod {
  name: string;
  description: string;
  duration: Duration;
  focusLevel: FocusLevel;
  steps: string[];
  bestFor: string[];
  icon: ReactNode;
}