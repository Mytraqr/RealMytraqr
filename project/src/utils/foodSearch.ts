const USDA_API_KEY = '7lygXNpcQQTHiQSl6091mJagthfLM4blNd19SjsB';
const BASE_URL = 'https://api.nal.usda.gov/fdc/v1';

export interface FoodItem {
  fdcId: string;
  description: string;
  name: string;
  nutrients: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    vitamins?: {
      a?: number;
      c?: number;
      d?: number;
      e?: number;
      k?: number;
      b6?: number;
      b12?: number;
    };
  };
}

export async function searchFoods(query: string): Promise<FoodItem[]> {
  try {
    const response = await fetch(`${BASE_URL}/foods/search?api_key=${USDA_API_KEY}&query=${encodeURIComponent(query)}&pageSize=25`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch food data');
    }

    const data = await response.json();
    
    return data.foods.map((food: any) => {
      const nutrients = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        vitamins: {
          a: 0,
          c: 0,
          d: 0,
          e: 0,
          k: 0,
          b6: 0,
          b12: 0
        }
      };

      food.foodNutrients.forEach((nutrient: any) => {
        switch (nutrient.nutrientId) {
          case 1008: // Energy (kcal)
            nutrients.calories = Math.round(nutrient.value || 0);
            break;
          case 1003: // Protein
            nutrients.protein = Math.round(nutrient.value || 0);
            break;
          case 1005: // Carbohydrates
            nutrients.carbs = Math.round(nutrient.value || 0);
            break;
          case 1004: // Total fat
            nutrients.fat = Math.round(nutrient.value || 0);
            break;
          case 1106: // Vitamin A
            nutrients.vitamins.a = Math.round(nutrient.value || 0);
            break;
          case 1162: // Vitamin C
            nutrients.vitamins.c = Math.round(nutrient.value || 0);
            break;
          case 1114: // Vitamin D
            nutrients.vitamins.d = Math.round(nutrient.value || 0);
            break;
          case 1109: // Vitamin E
            nutrients.vitamins.e = Math.round(nutrient.value || 0);
            break;
          case 1185: // Vitamin K
            nutrients.vitamins.k = Math.round(nutrient.value || 0);
            break;
          case 1175: // Vitamin B6
            nutrients.vitamins.b6 = Math.round(nutrient.value || 0);
            break;
          case 1178: // Vitamin B12
            nutrients.vitamins.b12 = Math.round(nutrient.value || 0);
            break;
        }
      });

      return {
        fdcId: food.fdcId,
        description: food.description,
        name: food.description,
        nutrients
      };
    });
  } catch (error) {
    console.error('Error searching foods:', error);
    throw error;
  }
}

export function adjustNutrientsForPortion(food: FoodItem, portion: 'small' | 'regular' | 'large'): FoodItem {
  const multiplier = portion === 'small' ? 0.75 : portion === 'large' ? 1.5 : 1;

  return {
    ...food,
    nutrients: {
      calories: Math.round(food.nutrients.calories * multiplier),
      protein: Math.round(food.nutrients.protein * multiplier),
      carbs: Math.round(food.nutrients.carbs * multiplier),
      fat: Math.round(food.nutrients.fat * multiplier),
      vitamins: food.nutrients.vitamins ? {
        a: Math.round((food.nutrients.vitamins.a || 0) * multiplier),
        c: Math.round((food.nutrients.vitamins.c || 0) * multiplier),
        d: Math.round((food.nutrients.vitamins.d || 0) * multiplier),
        e: Math.round((food.nutrients.vitamins.e || 0) * multiplier),
        k: Math.round((food.nutrients.vitamins.k || 0) * multiplier),
        b6: Math.round((food.nutrients.vitamins.b6 || 0) * multiplier),
        b12: Math.round((food.nutrients.vitamins.b12 || multiplier),
        )
      } : undefined
    }
  };
}