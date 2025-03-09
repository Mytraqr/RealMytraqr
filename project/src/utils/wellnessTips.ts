export const wellnessTips = [
  // Diet Tips
  "Try to eat a rainbow of fruits and vegetables daily for diverse nutrients.",
  "Stay hydrated! Aim to drink water throughout the day, not just when thirsty.",
  "Consider meal prepping on weekends to ensure healthy eating during busy days.",
  "Include protein with every meal to maintain stable energy levels.",
  
  // Sleep Tips
  "Maintain a consistent sleep schedule, even on weekends.",
  "Create a relaxing bedtime routine to signal your body it's time to rest.",
  "Avoid screens 1 hour before bedtime for better sleep quality.",
  "Keep your bedroom cool, dark, and quiet for optimal sleep.",
  
  // Exercise Tips
  "Even a 10-minute walk can boost your mood and energy levels.",
  "Try incorporating stretching breaks throughout your workday.",
  "Find physical activities you enjoy - exercise shouldn't feel like punishment.",
  "Mix cardio and strength training for overall fitness.",
  
  // Mental Health Tips
  "Practice gratitude daily - it can significantly impact your outlook.",
  "Take regular breaks during work to prevent mental fatigue.",
  "Connect with loved ones regularly - social bonds boost mental health.",
  "Try mindful breathing when feeling stressed or overwhelmed.",
  
  // General Wellness
  "Spend time in nature to reduce stress and boost mood.",
  "Set boundaries to protect your energy and mental space.",
  "Practice self-compassion - treat yourself as you would a good friend.",
  "Take time to celebrate small wins and progress."
];

export function getRandomTip(): string {
  const randomIndex = Math.floor(Math.random() * wellnessTips.length);
  return wellnessTips[randomIndex];
}