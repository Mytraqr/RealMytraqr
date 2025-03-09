import { DayLog, Food } from '../types/meal';

export interface NutritionTotals {
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
}

export function calculateMealTotals(foods: Food[]): NutritionTotals {
  return foods.reduce((acc, food) => ({
    calories: acc.calories + (food.nutrients?.calories || 0),
    protein: acc.protein + (food.nutrients?.protein || 0),
    carbs: acc.carbs + (food.nutrients?.carbs || 0),
    fat: acc.fat + (food.nutrients?.fat || 0),
    vitamins: {
      a: (acc.vitamins?.a || 0) + (food.nutrients?.vitamins?.a || 0),
      c: (acc.vitamins?.c || 0) + (food.nutrients?.vitamins?.c || 0),
      d: (acc.vitamins?.d || 0) + (food.nutrients?.vitamins?.d || 0),
      e: (acc.vitamins?.e || 0) + (food.nutrients?.vitamins?.e || 0),
      k: (acc.vitamins?.k || 0) + (food.nutrients?.vitamins?.k || 0),
      b6: (acc.vitamins?.b6 || 0) + (food.nutrients?.vitamins?.b6 || 0),
      b12: (acc.vitamins?.b12 || 0) + (food.nutrients?.vitamins?.b12 || 0),
    }
  }), {
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
  });
}

export function calculateDayTotals(log: DayLog): NutritionTotals {
  const totals = log.meals.reduce((acc, meal) => {
    const mealTotals = calculateMealTotals(meal.foods);
    return {
      calories: acc.calories + mealTotals.calories,
      protein: acc.protein + mealTotals.protein,
      carbs: acc.carbs + mealTotals.carbs,
      fat: acc.fat + mealTotals.fat,
      vitamins: {
        a: (acc.vitamins?.a || 0) + (mealTotals.vitamins?.a || 0),
        c: (acc.vitamins?.c || 0) + (mealTotals.vitamins?.c || 0),
        d: (acc.vitamins?.d || 0) + (mealTotals.vitamins?.d || 0),
        e: (acc.vitamins?.e || 0) + (mealTotals.vitamins?.e || 0),
        k: (acc.vitamins?.k || 0) + (mealTotals.vitamins?.k || 0),
        b6: (acc.vitamins?.b6 || 0) + (mealTotals.vitamins?.b6 || 0),
        b12: (acc.vitamins?.b12 || 0) + (mealTotals.vitamins?.b12 || 0),
      }
    };
  }, {
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
  });

  return {
    calories: Math.round(totals.calories),
    protein: Math.round(totals.protein),
    carbs: Math.round(totals.carbs),
    fat: Math.round(totals.fat),
    vitamins: {
      a: Math.round(totals.vitamins.a),
      c: Math.round(totals.vitamins.c),
      d: Math.round(totals.vitamins.d),
      e: Math.round(totals.vitamins.e),
      k: Math.round(totals.vitamins.k),
      b6: Math.round(totals.vitamins.b6),
      b12: Math.round(totals.vitamins.b12)
    }
  };
}

export function calculateAverages(logs: DayLog[]): NutritionTotals {
  if (logs.length === 0) {
    return {
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
  }

  const totals = logs.reduce((acc, log) => {
    const dayTotals = calculateDayTotals(log);
    return {
      calories: acc.calories + dayTotals.calories,
      protein: acc.protein + dayTotals.protein,
      carbs: acc.carbs + dayTotals.carbs,
      fat: acc.fat + dayTotals.fat,
      vitamins: {
        a: acc.vitamins.a + (dayTotals.vitamins?.a || 0),
        c: acc.vitamins.c + (dayTotals.vitamins?.c || 0),
        d: acc.vitamins.d + (dayTotals.vitamins?.d || 0),
        e: acc.vitamins.e + (dayTotals.vitamins?.e || 0),
        k: acc.vitamins.k + (dayTotals.vitamins?.k || 0),
        b6: acc.vitamins.b6 + (dayTotals.vitamins?.b6 || 0),
        b12: acc.vitamins.b12 + (dayTotals.vitamins?.b12 || 0),
      }
    };
  }, {
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
  });

  return {
    calories: Math.round(totals.calories / logs.length),
    protein: Math.round(totals.protein / logs.length),
    carbs: Math.round(totals.carbs / logs.length),
    fat: Math.round(totals.fat / logs.length),
    vitamins: {
      a: Math.round(totals.vitamins.a / logs.length),
      c: Math.round(totals.vitamins.c / logs.length),
      d: Math.round(totals.vitamins.d / logs.length),
      e: Math.round(totals.vitamins.e / logs.length),
      k: Math.round(totals.vitamins.k / logs.length),
      b6: Math.round(totals.vitamins.b6 / logs.length),
      b12: Math.round(totals.vitamins.b12 / logs.length)
    }
  };
}