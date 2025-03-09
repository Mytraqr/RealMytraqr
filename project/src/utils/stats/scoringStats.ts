import { Round } from '../../types/round';
import { calculateHoleScore } from './holeStats';

export interface ScoringAverages {
  overall: number;
  par3: number;
  par4: number;
  par5: number;
}

export function calculateScoringAverages(rounds: Round[]): ScoringAverages {
  if (!rounds?.length) {
    return {
      overall: 0,
      par3: 0,
      par4: 0,
      par5: 0
    };
  }

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
    if (!round?.holes) return;
    
    round.holes.forEach(hole => {
      if (!hole?.shots) return;
      
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