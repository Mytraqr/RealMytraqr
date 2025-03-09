import { Round } from '../../types/round';

export function calculateHoleScore(hole: Round['holes'][0]): number {
  if (!hole?.shots) return 0;
  
  const regularShots = hole.shots.filter(shot => shot.type !== 'penalty').length;
  const penaltyStrokes = hole.shots
    .filter(shot => shot.type === 'penalty')
    .reduce((sum, shot) => sum + (shot.result === 'ob' ? 2 : 1), 0);
  
  return regularShots + penaltyStrokes;
}

export function calculateFairwaysHit(round: Round): { hit: number; total: number } {
  if (!round?.holes) return { hit: 0, total: 0 };
  
  let total = 0;
  let hit = 0;

  round.holes.forEach(hole => {
    if (!hole?.shots) return;
    if (hole.par === 4 || hole.par === 5) {
      total++;
      const driveShot = hole.shots.find(shot => shot.type === 'drive');
      if (driveShot?.result === 'fairway') {
        hit++;
      }
    }
  });

  return { hit, total };
}