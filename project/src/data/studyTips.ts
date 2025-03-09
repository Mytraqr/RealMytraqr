export const studyTips = [
  {
    category: 'focus',
    tip: 'Try the 2-minute rule: If a task takes less than 2 minutes, do it now instead of putting it off.',
    source: 'Getting Things Done - David Allen'
  },
  {
    category: 'productivity',
    tip: 'Use the 80/20 rule: Focus on the 20% of work that will produce 80% of results.',
    source: 'The 4-Hour Work Week - Tim Ferriss'
  },
  {
    category: 'memory',
    tip: 'Create acronyms or memorable phrases to remember complex information.',
    source: 'Learning Techniques Research'
  },
  {
    category: 'breaks',
    tip: 'Take a 5-minute break every 25 minutes to maintain high productivity.',
    source: 'Pomodoro Technique'
  },
  {
    category: 'environment',
    tip: 'Study in the same place regularly to create a productive environment association.',
    source: 'Psychology of Learning'
  },
  {
    category: 'planning',
    tip: 'Plan your most challenging tasks for your peak energy hours.',
    source: 'Peak Performance Studies'
  }
];

export function getRandomTip() {
  return studyTips[Math.floor(Math.random() * studyTips.length)];
}

export function getTipsByCategory(category: string) {
  return studyTips.filter(tip => tip.category === category);
}