import { BookOpen, Brain, Clock, Target } from 'lucide-react';
import { StudyMethod } from '../types/study';

export const studyMethods: StudyMethod[] = [
  {
    name: 'Pomodoro Technique',
    description: 'Work in focused 25-minute intervals with short breaks in between.',
    duration: 'short',
    focusLevel: 'High',
    steps: [
      'Work for 25 minutes',
      'Take a 5-minute break',
      'Repeat 4 times',
      'Take a longer 15-30 minute break'
    ],
    bestFor: [
      'Tasks requiring intense focus',
      'Breaking down large projects',
      'Avoiding burnout'
    ],
    icon: <Clock className="w-6 h-6 text-blue-500" />
  },
  {
    name: 'Active Recall',
    description: 'Test yourself on material instead of passive re-reading.',
    duration: 'medium',
    focusLevel: 'High',
    steps: [
      'Review material briefly',
      'Close books/notes',
      'Write down everything you remember',
      'Check accuracy and identify gaps'
    ],
    bestFor: [
      'Exam preparation',
      'Long-term retention',
      'Understanding complex topics'
    ],
    icon: <Brain className="w-6 h-6 text-purple-500" />
  },
  {
    name: 'Spaced Repetition',
    description: 'Review material at increasing intervals over time.',
    duration: 'long',
    focusLevel: 'Medium',
    steps: [
      'Study material initially',
      'Review after 1 day',
      'Review after 3 days',
      'Review after 1 week',
      'Review after 2 weeks'
    ],
    bestFor: [
      'Memorization',
      'Language learning',
      'Building lasting knowledge'
    ],
    icon: <Target className="w-6 h-6 text-green-500" />
  },
  {
    name: 'Mind Mapping',
    description: 'Create visual representations of connected concepts.',
    duration: 'medium',
    focusLevel: 'Medium',
    steps: [
      'Write main topic in center',
      'Branch out related concepts',
      'Add connections between branches',
      'Use colors and images'
    ],
    bestFor: [
      'Understanding relationships between concepts',
      'Brainstorming',
      'Note-taking'
    ],
    icon: <BookOpen className="w-6 h-6 text-orange-500" />
  },
  {
    name: 'Feynman Technique',
    description: 'Explain concepts in simple terms to ensure deep understanding.',
    duration: 'medium',
    focusLevel: 'High',
    steps: [
      'Choose a concept',
      'Explain it simply',
      'Identify gaps in understanding',
      'Review and simplify explanation'
    ],
    bestFor: [
      'Complex topics',
      'Deep understanding',
      'Identifying knowledge gaps'
    ],
    icon: <Brain className="w-6 h-6 text-red-500" />
  }
];