import { DayLog } from '../types/meal';

interface UserData {
  bmr: number;
  tdee: number;
  targetCalories: number;
  goal: string;
}

interface AnalysisResult {
  message: string;
  tip: string;
  example: string;
  severity: 'success' | 'warning' | 'error';
}

export function analyzeDietBehavior(log: DayLog, userData: UserData): AnalysisResult {
  const { targetCalories, goal } = userData;
  const { totalCalories, totalProtein, totalCarbs, totalFat } = log;

  // Calculate recommended protein based on goal
  const proteinPerKg = goal === 'bulking' ? 2.2 : goal === 'cutting' ? 2.4 : 1.8;
  const estimatedWeight = userData.tdee / 15; // Rough estimation
  const recommendedProtein = estimatedWeight * proteinPerKg;

  // Analyze based on goal
  if (goal === 'bulking') {
    if (totalCalories < targetCalories) {
      return {
        message: "You're not hitting your calorie target for bulking",
        tip: "Increase calorie intake with nutrient-dense foods",
        example: "Add healthy fats like avocados, nuts, or olive oil to meals",
        severity: 'warning'
      };
    }
    if (totalProtein < recommendedProtein) {
      return {
        message: "Protein intake is below target for muscle gain",
        tip: "Include more protein-rich foods in your diet",
        example: "Add eggs, chicken breast, or protein shakes to your meals",
        severity: 'warning'
      };
    }
  }

  if (goal === 'cutting') {
    if (totalCalories > targetCalories) {
      return {
        message: "You're exceeding your calorie target for cutting",
        tip: "Focus on low-calorie, filling foods",
        example: "Replace rice with cauliflower rice, use lettuce wraps instead of bread",
        severity: 'warning'
      };
    }
    if (totalProtein < recommendedProtein) {
      return {
        message: "Maintain high protein while cutting to preserve muscle",
        tip: "Prioritize lean protein sources",
        example: "Choose turkey, fish, or tofu as protein sources",
        severity: 'warning'
      };
    }
  }

  if (goal === 'weight-loss') {
    if (totalCalories > targetCalories) {
      return {
        message: "You're over your calorie target for weight loss",
        tip: "Focus on volume eating with low-calorie foods",
        example: "Fill half your plate with vegetables at each meal",
        severity: 'warning'
      };
    }
    if (totalCarbs > (totalCalories * 0.5) / 4) { // If carbs are over 50% of calories
      return {
        message: "Consider reducing carbohydrate intake",
        tip: "Replace some carbs with protein and vegetables",
        example: "Try zucchini noodles instead of pasta",
        severity: 'warning'
      };
    }
  }

  if (goal === 'maintenance') {
    const calorieDeviation = Math.abs(totalCalories - targetCalories);
    if (calorieDeviation > 200) {
      return {
        message: "Your calorie intake is varying from maintenance target",
        tip: "Try to stay within 200 calories of your target",
        example: "Use a food scale to measure portions more accurately",
        severity: 'warning'
      };
    }
  }

  // General macronutrient balance checks
  const proteinCalories = totalProtein * 4;
  const proteinPercentage = (proteinCalories / totalCalories) * 100;

  if (proteinPercentage < 20) {
    return {
      message: "Your protein intake is lower than recommended",
      tip: "Aim for protein at every meal",
      example: "Include eggs at breakfast, tuna at lunch, and chicken at dinner",
      severity: 'warning'
    };
  }

  // Check for very low fat intake
  const minFat = (totalCalories * 0.2) / 9; // 20% of calories from fat
  if (totalFat < minFat) {
    return {
      message: "Your fat intake is too low for hormone health",
      tip: "Include healthy fats in your diet",
      example: "Add nuts, seeds, avocados, or olive oil to meals",
      severity: 'warning'
    };
  }

  // Success message if everything looks good
  return {
    message: "Great job! Your intake aligns with your goals",
    tip: "Keep maintaining this balance of nutrients",
    example: "Continue planning meals with a good mix of protein, carbs, and fats",
    severity: 'success'
  };
}

export function generateDailyTip(): string {
  const tips = [
    "Try to eat protein within 30 minutes of waking up to boost metabolism",
    "Drink water before meals to help with portion control",
    "Include colorful vegetables in at least two meals today",
    "Take a 10-minute walk after meals to aid digestion",
    "Try meal prepping your breakfast for the week ahead",
    "Experiment with a new healthy protein source today",
    "Practice mindful eating by avoiding screens during meals",
    "Add an extra serving of vegetables to your largest meal",
    "Try replacing one processed snack with a whole food alternative",
    "Focus on eating slowly and chewing thoroughly",
    "Include a source of fiber in your breakfast",
    "Try to eat your last meal at least 2-3 hours before bed",
    "Add a handful of nuts or seeds to one of your meals",
    "Experiment with a new healthy cooking method today",
    "Try to include protein, carbs, and fats in each main meal",
    "Consider tracking your water intake today",
    "Try a new vegetable or fruit you haven't had before",
    "Plan your meals for tomorrow to avoid impulsive choices",
    "Practice portion control using the plate method",
    "Consider having a meatless meal today for variety"
  ];

  return tips[Math.floor(Math.random() * tips.length)];
}