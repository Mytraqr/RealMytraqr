export type PenaltyType = 'ob' | 'hazard' | 'lost' | 'other';

export const getPenaltyStrokes = (type: PenaltyType): number => {
  switch (type) {
    case 'ob':
      return 2; // Stroke and distance
    case 'hazard':
      return 1; // Just the penalty stroke
    case 'lost':
      return 1; // Just the penalty stroke
    case 'other':
      return 1; // Default to one stroke
    default:
      return 1;
  }
};