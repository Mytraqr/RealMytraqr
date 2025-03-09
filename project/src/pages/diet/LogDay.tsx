import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ChevronDown, ChevronUp, Coffee, Sun, Moon, UtensilsCrossed, Save } from 'lucide-react';
import MealSearch from '../../components/diet/MealSearch';
import EmptyState from '../../components/diet/EmptyState';
import { DayLog, Food } from '../../types/meal';
import { calculateMealTotals, calculateDayTotals } from '../../utils/calculateNutrition';

interface MealData {
  foods: Food[];
  isExpanded: boolean;
}

interface DayMeals {
  breakfast: MealData;
  lunch: MealData;
  dinner: MealData;
  snack: MealData;
}

export default function LogDay() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<DayLog[]>([]);
  const [showNewLogForm, setShowNewLogForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentDayLog, setCurrentDayLog] = useState<DayLog | null>(null);
  const [meals, setMeals] = useState<DayMeals>({
    breakfast: { foods: [], isExpanded: false },
    lunch: { foods: [], isExpanded: false },
    dinner: { foods: [], isExpanded: false },
    snack: { foods: [], isExpanded: false }
  });

  useEffect(() => {
    const savedLogs = localStorage.getItem('dietLogs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  const handleStartNewLog = () => {
    setShowNewLogForm(true);
  };

  const handleDateSelect = () => {
    const existingLog = logs.find(log => log.date === selectedDate);
    if (existingLog) {
      alert('A log already exists for this date');
      return;
    }

    const newLog: DayLog = {
      id: Date.now().toString(),
      date: selectedDate,
      meals: [],
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      totalVitamins: {}
    };

    setCurrentDayLog(newLog);
    setShowNewLogForm(false);
  };

  const handleFoodSelect = (mealType: keyof DayMeals, food: Food) => {
    setMeals(prev => ({
      ...prev,
      [mealType]: {
        ...prev[mealType],
        foods: [food, ...prev[mealType].foods]
      }
    }));
  };

  const handleRemoveFood = (mealType: keyof DayMeals, index: number) => {
    setMeals(prev => ({
      ...prev,
      [mealType]: {
        ...prev[mealType],
        foods: prev[mealType].foods.filter((_, i) => i !== index)
      }
    }));
  };

  const toggleMealExpansion = (mealType: keyof DayMeals) => {
    setMeals(prev => ({
      ...prev,
      [mealType]: {
        ...prev[mealType],
        isExpanded: !prev[mealType].isExpanded
      }
    }));
  };

  const handleSaveDay = () => {
    if (!currentDayLog) return;

    const dayMeals = Object.entries(meals).map(([type, data]) => ({
      type: type as 'breakfast' | 'lunch' | 'dinner' | 'snack',
      foods: data.foods
    })).filter(meal => meal.foods.length > 0);

    const updatedLog = {
      ...currentDayLog,
      meals: dayMeals
    };

    const totals = calculateDayTotals(updatedLog);
    updatedLog.totalCalories = totals.calories;
    updatedLog.totalProtein = totals.protein;
    updatedLog.totalCarbs = totals.carbs;
    updatedLog.totalFat = totals.fat;
    updatedLog.totalVitamins = totals.vitamins;

    const updatedLogs = [...logs, updatedLog];
    setLogs(updatedLogs);
    localStorage.setItem('dietLogs', JSON.stringify(updatedLogs));
    
    // Reset state
    setCurrentDayLog(null);
    setMeals({
      breakfast: { foods: [], isExpanded: false },
      lunch: { foods: [], isExpanded: false },
      dinner: { foods: [], isExpanded: false },
      snack: { foods: [], isExpanded: false }
    });
  };

  const renderMealBlock = (type: keyof DayMeals, icon: React.ReactNode, title: string) => {
    const mealData = meals[type];
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <button
          onClick={() => toggleMealExpansion(type)}
          className="w-full px-6 py-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            {icon}
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
          </div>
          {mealData.isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {mealData.isExpanded && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <MealSearch
              onFoodSelect={(food) => handleFoodSelect(type, food)}
              selectedFoods={mealData.foods}
              onRemoveFood={(index) => handleRemoveFood(type, index)}
            />
          </div>
        )}
      </div>
    );
  };

  if (logs.length === 0 && !showNewLogForm && !currentDayLog) {
    return (
      <EmptyState 
        type="log" 
        onAction={handleStartNewLog}
        message="Start tracking your nutrition journey!"
        tip="Log your meals throughout the day to understand your eating habits and make informed decisions about your diet."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Food Log</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your daily nutrition intake</p>
        </div>
        <button
          onClick={handleStartNewLog}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Log New Day
        </button>
      </div>

      {showNewLogForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Select Date</h2>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowNewLogForm(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDateSelect}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Start Log
              </button>
            </div>
          </div>
        </div>
      )}

      {currentDayLog && (
        <div className="space-y-4">
          {renderMealBlock('breakfast', <Coffee className="w-6 h-6 text-orange-600" />, 'Breakfast')}
          {renderMealBlock('lunch', <Sun className="w-6 h-6 text-orange-600" />, 'Lunch')}
          {renderMealBlock('dinner', <Moon className="w-6 h-6 text-orange-600" />, 'Dinner')}
          {renderMealBlock('snack', <UtensilsCrossed className="w-6 h-6 text-orange-600" />, 'Snack')}
          
          <div className="flex justify-end">
            <button
              onClick={handleSaveDay}
              className="flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Day
            </button>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Calories
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Protein
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Carbs
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Fat
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {new Date(log.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {log.totalCalories} kcal
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {log.totalProtein}g
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {log.totalCarbs}g
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {log.totalFat}g
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <button
                    onClick={() => {
                      const updatedLogs = logs.filter(l => l.id !== log.id);
                      setLogs(updatedLogs);
                      localStorage.setItem('dietLogs', JSON.stringify(updatedLogs));
                    }}
                    className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}