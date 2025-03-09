import { DayLog } from '../types/meal';

const API_KEY = '';

interface OpenAIError extends Error {
  status?: number;
  response?: Response;
}

export async function analyzeDietLog(message: string, log: DayLog | null): Promise<string> {
  if (!API_KEY) {
    throw new Error("OpenAI API key is not configured");
  }

  if (!message.trim()) {
    throw new Error("Please enter a question");
  }

  const logData = log ? {
    date: new Date(log.date).toLocaleDateString(),
    totalCalories: log.totalCalories,
    totalProtein: log.totalProtein,
    totalCarbs: log.totalCarbs,
    totalFat: log.totalFat,
    meals: log.meals.map(meal => ({
      type: meal.type,
      foods: meal.foods.map(food => ({
        name: food.name,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat
      }))
    }))
  } : null;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a nutrition coach analyzing daily food logs. Keep responses clear and concise, under 50 words. Focus on nutritional insights and actionable recommendations.'
          },
          {
            role: 'user',
            content: `Diet log data: ${logData ? JSON.stringify(logData) : 'No log selected'}\n\nQuestion: ${message}`
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to get response from OpenAI");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    const err = error as OpenAIError;
    console.error('OpenAI API Error:', err);
    throw new Error(err.message || "Failed to analyze your question");
  }
}