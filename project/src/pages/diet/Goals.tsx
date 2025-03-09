import React, { useState } from 'react';
import { Save, Target } from 'lucide-react';

interface Goals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number;
}

export default function Goals() {
  const [goals, setGoals] = useState<Goals>({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65,
    water: 2000
  });

  const handleSave = () => {
    localStorage.setItem('dietGoals', JSON.stringify(goals));
    // Show success message or notification here
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nutrition Goals</h1>
          <p className="text-gray-600 dark:text-gray-400">Set your daily nutrition targets</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          <Save className="w-5 h-5 mr-2" />
          Save Goals
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Daily Calorie Goal
            </label>
            <div className="relative">
              <input
                type="number"
                value={goals.calories}
                onChange={(e) => setGoals({ ...goals, calories: Number(e.target.value) })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                min="0"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400">kcal</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Daily Water Goal
            </label>
            <div className="relative">
              <input
                type="number"
                value={goals.water}
                onChange={(e) => setGoals({ ...goals, water: Number(e.target.value) })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                min="0"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400">ml</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Macronutrient Goals</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Protein
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={goals.protein}
                    onChange={(e) => setGoals({ ...goals, protein: Number(e.target.value) })}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                    min="0"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400">g</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Carbohydrates
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={goals.carbs}
                    onChange={(e) => setGoals({ ...goals, carbs: Number(e.target.value) })}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                    min="0"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400">g</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fat
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={goals.fat}
                    onChange={(e) => setGoals({ ...goals, fat: Number(e.target.value) })}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                    min="0"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400">g</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Macronutrient Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Protein</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {Math.round((goals.protein * 4 / goals.calories) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className="h-2 bg-indigo-500 rounded-full"
                style={{ width: `${(goals.protein * 4 / goals.calories) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Carbs</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {Math.round((goals.carbs * 4 / goals.calories) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className="h-2 bg-emerald-500 rounded-full"
                style={{ width: `${(goals.carbs * 4 / goals.calories) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Fat</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {Math.round((goals.fat * 9 / goals.calories) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className="h-2 bg-amber-500 rounded-full"
                style={{ width: `${(goals.fat * 9 / goals.calories) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}