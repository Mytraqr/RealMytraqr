import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { searchFoods, FoodItem, adjustNutrientsForPortion } from '../../utils/foodSearch';

interface MealSearchProps {
  onFoodSelect: (food: FoodItem, portion: 'small' | 'regular' | 'large') => void;
  selectedFoods: FoodItem[];
  onRemoveFood: (index: number) => void;
}

export default function MealSearch({ onFoodSelect, selectedFoods, onRemoveFood }: MealSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (term.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const foods = await searchFoods(term);
      setSearchResults(foods);
    } catch (error) {
      console.error('Error searching foods:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handlePortionSelect = (portion: 'small' | 'regular' | 'large') => {
    if (selectedFood) {
      const adjustedFood = adjustNutrientsForPortion(selectedFood, portion);
      onFoodSelect(adjustedFood, portion);
      setSelectedFood(null);
      setSearchTerm('');
      setSearchResults([]);
    }
  };

  return (
    <div className="space-y-4">
      {selectedFoods.length > 0 && (
        <div className="space-y-2">
          {selectedFoods.map((food, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{food.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {food.nutrients.calories} kcal | P: {food.nutrients.protein}g | C: {food.nutrients.carbs}g | F: {food.nutrients.fat}g
                </p>
              </div>
              <button
                onClick={() => onRemoveFood(index)}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search foods..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      {isSearching && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
        </div>
      )}

      {selectedFood ? (
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4 space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-white">{selectedFood.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Select portion size:</p>
          <div className="grid grid-cols-3 gap-4">
            {(['small', 'regular', 'large'] as const).map((size) => {
              const adjustedFood = adjustNutrientsForPortion(selectedFood, size);
              return (
                <button
                  key={size}
                  onClick={() => handlePortionSelect(size)}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/50"
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                  <span className="block text-sm text-gray-500 dark:text-gray-400">
                    {adjustedFood.nutrients.calories} kcal
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        searchResults.length > 0 && (
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4 space-y-2">
            {searchResults.map((food) => (
              <div
                key={food.fdcId}
                className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg cursor-pointer"
                onClick={() => setSelectedFood(food)}
              >
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{food.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {food.nutrients.calories} kcal | P: {food.nutrients.protein}g | C: {food.nutrients.carbs}g | F: {food.nutrients.fat}g
                  </p>
                </div>
                <Plus className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}