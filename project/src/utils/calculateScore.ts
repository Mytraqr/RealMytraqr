import { Round } from '../types/round';
import { getPenaltyStrokes } from './penaltyStrokes';

export const calculateTotalScore = (round: Round): number => {
  let totalStrokes = 0;

  round.holes.forEach(hole => {
    // Count regular shots
    const regularShots = hole.shots.filter(shot => shot.type !== 'penalty').length;
    
    // Count penalty strokes
    const penaltyStrokes = hole.shots
      .filter(shot => shot.type === 'penalty')
      .reduce((total, shot) => {
        return total + getPenaltyStrokes(shot.result as any);
      }, 0);

    totalStrokes += regularShots + penaltyStrokes;
  });

  return totalStrokes;
};