export interface Food {
  id?: string;
  name: string;
  portion?: 'small' | 'regular' | 'large';
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

export interface SavedMeal {
  id: string;
  name: string;
  description?: string;
  foods: Food[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalVitamins?: {
    a?: number;
    c?: number;
    d?: number;
    e?: number;
    k?: number;
    b6?: number;
    b12?: number;
  };
}

export interface DayLog {
  id: string;
  date: string;
  meals: {
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    foods: Food[];
  }[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalVitamins?: {
    a?: number;
    c?: number;
    d?: number;
    e?: number;
    k?: number;
    b6?: number;
    b12?: number;
  };
}