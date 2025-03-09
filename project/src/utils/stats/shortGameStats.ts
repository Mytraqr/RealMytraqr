import { Round } from '../../types/round';

export function calculatePutts(round: Round): number {
  if (!round?.holes) return 0;
  
  return round.holes.reduce((total, hole) => {
    if (!hole?.shots) return total;
    return total + hole.shots.filter(shot => shot.type === 'putt').length;
  }, 0);
}

export function calculateGIR(round: Round): { hit: number; total: number } {
  if (!round?.holes) return { hit: 0, total: 0 };
  
  let hit = 0;
  const total = round.holes.length;

  round.holes.forEach(hole => {
    if (!hole?.shots) return;
    
    const shots = hole.shots;
    const firstPuttIndex = shots.findIndex(shot => shot.type === 'putt');
    
    // Check for penalty shots
    const penaltyShots = shots.filter(shot => shot.type === 'penalty');
    const hasPenalty = penaltyShots.length > 0;
    
    // If there's a penalty, we need to account for the extra stroke(s)
    const penaltyStrokes = penaltyShots.reduce((total, shot) => {
      if (shot.result === 'ob') return total + 2;
      return total + 1;
    }, 0);

    const nonPenaltyShots = shots
      .slice(0, firstPuttIndex === -1 ? shots.length : firstPuttIndex)
      .filter(shot => shot.type !== 'penalty');

    // Check if the hole was holed out from approach (no putts)
    const holedOut = firstPuttIndex === -1 && nonPenaltyShots.length <= hole.par - 2;
    
    // Regular GIR check, accounting for penalty strokes
    const normalGIR = firstPuttIndex !== -1 && 
                     (nonPenaltyShots.length + penaltyStrokes) <= hole.par - 2;

    // Only count GIR if there was no penalty
    if ((holedOut || normalGIR) && !hasPenalty) {
      hit++;
    }
  });

  return { hit, total };
}

export function calculateUpAndDowns(round: Round): { made: number; total: number } {
  if (!round?.holes) return { made: 0, total: 0 };
  
  let total = 0;
  let made = 0;

  round.holes.forEach(hole => {
    if (!hole?.shots) return;
    
    const greensideIndex = hole.shots.findIndex(shot => shot.type === 'greenside');
    if (greensideIndex === -1) return;

    total++;
    
    const subsequentShots = hole.shots.slice(greensideIndex + 1);
    const puttCount = subsequentShots.filter(shot => shot.type === 'putt').length;
    
    if (puttCount === 1) {
      made++;
    }
  });

  return { made, total };
}

export function calculateSandSaves(round: Round): { made: number; total: number } {
  if (!round?.holes) return { made: 0, total: 0 };
  
  let total = 0;
  let made = 0;

  round.holes.forEach(hole => {
    if (!hole?.shots) return;
    
    const bunkerShot = hole.shots.find(shot => 
      shot.type === 'greenside' && shot.lie === 'bunker'
    );
    
    if (!bunkerShot) return;

    total++;
    
    const shotIndex = hole.shots.indexOf(bunkerShot);
    const subsequentShots = hole.shots.slice(shotIndex + 1);
    const puttCount = subsequentShots.filter(shot => shot.type === 'putt').length;
    
    if (puttCount === 1) {
      made++;
    }
  });

  return { made, total };
}