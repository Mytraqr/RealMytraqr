import React from 'react';
import { UtensilsCrossed, ArrowRight, Flag, BarChart2, Brain } from 'lucide-react';

interface EmptyStateProps {
  type: 'golf-rounds' | 'golf-courses' | 'golf-dashboard' | 'golf-stats' | 
        'diet-log' | 'diet-stats' | 'diet-dashboard' |
        'mental-dashboard' | 'mental-log' | 'mental-stats';
  onAction: () => void;
  message?: string;
  tip?: string;
}

const EMPTY_STATES = {
  'golf-rounds': {
    icon: Flag,
    title: "Start Your Golf Journey!",
    description: "Track your rounds to understand your game and make data-driven improvements.",
    action: "Record Your First Round",
    tip: "Begin by recording your shots hole by hole. You'll build a comprehensive view of your game over time."
  },
  'golf-courses': {
    icon: Flag,
    title: "Add Your First Course",
    description: "Set up the courses you play to track your performance across different venues.",
    action: "Add Course Details",
    tip: "Start with your home course. Add the yardage and par for each hole to enable detailed round tracking."
  },
  'golf-dashboard': {
    icon: BarChart2,
    title: "Welcome to Your Golf Dashboard",
    description: "Your journey to better golf starts here.",
    action: "Get Started",
    tip: "First, add a course in the Courses section, then record your rounds to unlock insights and track your progress."
  },
  'golf-stats': {
    icon: BarChart2,
    title: "Your Stats Journey Begins",
    description: "Track your golf statistics to identify areas for improvement.",
    action: "Record First Round",
    tip: "Record your rounds consistently to build meaningful statistics and track your progress over time."
  },
  'diet-log': {
    icon: UtensilsCrossed,
    title: "Start Your Nutrition Journey!",
    description: "Track your meals to understand your eating habits and make informed decisions.",
    action: "Log Your First Day",
    tip: "Begin by logging your breakfast, lunch, dinner, and snacks throughout the day."
  },
  'diet-stats': {
    icon: BarChart2,
    title: "Your Nutrition Stats Journey",
    description: "Track your nutrition metrics to make informed dietary choices.",
    action: "Start Logging",
    tip: "Log your meals consistently to build meaningful statistics and understand your eating patterns."
  },
  'diet-dashboard': {
    icon: UtensilsCrossed,
    title: "Welcome to Your Nutrition Dashboard",
    description: "Your path to better nutrition starts here.",
    action: "Begin Tracking",
    tip: "Start by logging your daily meals. Over time, you'll gain insights into your eating habits and nutritional balance."
  },
  'mental-dashboard': {
    icon: Brain,
    title: "Track Your Emotional Journey",
    description: "Your path to better mental well-being starts here.",
    action: "Begin Tracking",
    tip: "Regular emotion tracking can improve self-awareness and mental well-being. Start your emotional wellness journey today."
  },
  'mental-log': {
    icon: Brain,
    title: "Start Your Emotional Journey",
    description: "Track your daily emotions and moods to better understand yourself.",
    action: "Log Your First Entry",
    tip: "Take a moment each day to reflect on your emotions and identify patterns in your mental well-being."
  },
  'mental-stats': {
    icon: BarChart2,
    title: "Your Mental Wellness Stats",
    description: "Visualize your emotional patterns and progress.",
    action: "Start Tracking",
    tip: "Regular tracking helps identify emotional patterns and triggers, leading to better self-awareness."
  }
};

export default function EmptyState({ type, onAction, message, tip }: EmptyStateProps) {
  const content = EMPTY_STATES[type];
  const Icon = content.icon;

  return (
    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <Icon className="w-16 h-16 mx-auto text-orange-600 dark:text-orange-500 mb-4" />
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {message || content.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        {content.description}
      </p>
      <button
        onClick={onAction}
        className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
      >
        {content.action}
        <ArrowRight className="w-4 h-4 ml-2" />
      </button>
      <div className="mt-8 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg max-w-md mx-auto">
        <p className="text-sm text-orange-800 dark:text-orange-200">
          <span className="font-medium">Pro tip:</span> {tip || content.tip}
        </p>
      </div>
    </div>
  );
}