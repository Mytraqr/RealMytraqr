import { Round } from '../types/round';

export interface DriveStats {
  par4: {
    average: number;
    total: number;
    count: number;
  };
  par5: {
    average: number;
    total: number;
    count: number;
  };
}

export interface ScoringAverages {
  overall: number;
  par3: number;
  par4: number;
  par5: number;
}

export function calculateHoleScore(hole: Round['holes'][0]): number {
  const regularShots = hole.shots.filter(shot => shot.type !== 'penalty').length;
  const penaltyStrokes = hole.shots
    .filter(shot => shot.type === 'penalty')
    .reduce((sum, shot) => sum + (shot.result === 'ob' ? 2 : 1), 0);
  
  return regularShots + penaltyStrokes;
}

export function calculateDrivingDistance(rounds: Round[]): DriveStats {
  const stats: DriveStats = {
    par4: { average: 0, total: 0, count: 0 },
    par5: { average: 0, total: 0, count: 0 }
  };

  rounds.forEach(round => {
    round.holes.forEach(hole => {
      if (hole.par !== 4 && hole.par !== 5) return;

      const driveShot = hole.shots.find(shot => 
        shot.type === 'drive' && 
        typeof shot.distance === 'number' && 
        shot.distance > 0
      );

      if (!driveShot || !driveShot.distance) return;

      if (hole.par === 4) {
        stats.par4.total += driveShot.distance;
        stats.par4.count++;
      } else {
        stats.par5.total += driveShot.distance;
        stats.par5.count++;
      }
    });
  });

  stats.par4.average = stats.par4.count > 0 ? Math.round(stats.par4.total / stats.par4.count) : 0;
  stats.par5.average = stats.par5.count > 0 ? Math.round(stats.par5.total / stats.par5.count) : 0;

  return stats;
}

export function calculateScoringAverages(rounds: Round[]): ScoringAverages {
  const stats = {
    overall: 0,
    par3: 0,
    par4: 0,
    par5: 0,
    par3Count: 0,
    par4Count: 0,
    par5Count: 0
  };

  rounds.forEach(round => {
    round.holes.forEach(hole => {
      const score = calculateHoleScore(hole);
      
      switch (hole.par) {
        case 3:
          stats.par3 += score;
          stats.par3Count++;
          break;
        case 4:
          stats.par4 += score;
          stats.par4Count++;
          break;
        case 5:
          stats.par5 += score;
          stats.par5Count++;
          break;
      }
    });
  });

  const totalHoles = stats.par3Count + stats.par4Count + stats.par5Count;
  const totalScore = stats.par3 + stats.par4 + stats.par5;

  return {
    overall: totalHoles > 0 ? +(totalScore / totalHoles).toFixed(1) : 0,
    par3: stats.par3Count > 0 ? +(stats.par3 / stats.par3Count).toFixed(1) : 0,
    par4: stats.par4Count > 0 ? +(stats.par4 / stats.par4Count).toFixed(1) : 0,
    par5: stats.par5Count > 0 ? +(stats.par5 / stats.par5Count).toFixed(1) : 0
  };
}

export function calculateFairwaysHit(round: Round): { hit: number; total: number } {
  let total = 0;
  let hit = 0;

  round.holes.forEach(hole => {
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

export function calculateGIR(round: Round): { hit: number; total: number } {
  let hit = 0;
  const total = round.holes.length;

  round.holes.forEach(hole => {
    const shots = hole.shots;
    const firstPuttIndex = shots.findIndex(shot => shot.type === 'putt');
    
    if (firstPuttIndex !== -1) {
      const shotsToGreen = shots.slice(0, firstPuttIndex).filter(shot => shot.type !== 'penalty');
      if (shotsToGreen.length <= hole.par - 2) {
        hit++;
      }
    }
  });

  return { hit, total };
}

export function calculatePutts(round: Round): number {
  return round.holes.reduce((total, hole) => {
    return total + hole.shots.filter(shot => shot.type === 'putt').length;
  }, 0);
}

export function calculateUpAndDowns(round: Round): { made: number; total: number } {
  let total = 0;
  let made = 0;

  round.holes.forEach(hole => {
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
  let total = 0;
  let made = 0;

  round.holes.forEach(hole => {
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