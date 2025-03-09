import React from 'react';
import { UtensilsCrossed, ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  type: 'log' | 'meal-library';
  onAction: () => void;
  message?: string;
  tip?: string;
}

export default function EmptyState({ type, onAction, message, tip }: EmptyStateProps) {
  const content = {
    log: {
      title: message || "Start Your Nutrition Journey!",
      description: "Track your meals to understand your eating habits and make informed decisions about your diet.",
      action: "Log Your First Day",
      tip: tip || "Begin by logging your breakfast, lunch, dinner, and snacks. You can also use saved meals from your meal library for quick logging."
    },
    'meal-library': {
      title: "Build Your Meal Library",
      description: "Create and save your favorite meals for quick and easy logging.",
      action: "Add Your First Meal",
      tip: "Start by adding meals you eat regularly. You can combine multiple foods and save them as a single meal for future use."
    }
  };

  return (
    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <UtensilsCrossed className="w-16 h-16 mx-auto text-orange-600 dark:text-orange-500 mb-4" />
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {content[type].title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        {content[type].description}
      </p>
      <button
        onClick={onAction}
        className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
      >
        {content[type].action}
        <ArrowRight className="w-4 h-4 ml-2" />
      </button>
      <div className="mt-8 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg max-w-md mx-auto">
        <p className="text-sm text-orange-800 dark:text-orange-200">
          <span className="font-medium">Pro tip:</span> {content[type].tip}
        </p>
      </div>
    </div>
  );
}