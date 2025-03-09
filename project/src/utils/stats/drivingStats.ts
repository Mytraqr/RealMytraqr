import { Round } from '../../types/round';

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

export function calculateDrivingDistance(rounds: Round[]): DriveStats {
  if (!rounds?.length) {
    return {
      par4: { average: 0, total: 0, count: 0 },
      par5: { average: 0, total: 0, count: 0 }
    };
  }

  const stats: DriveStats = {
    par4: { average: 0, total: 0, count: 0 },
    par5: { average: 0, total: 0, count: 0 }
  };

  rounds.forEach(round => {
    round.holes.forEach(hole => {
      // Only process par 4s and 5s
      if (hole.par !== 4 && hole.par !== 5) return;

      // Find the first drive shot
      const driveShot = hole.shots.find(shot => 
        shot.type === 'drive' && 
        shot.distance && 
        shot.distance > 0 && 
        shot.distance < 1000 // Sanity check
      );

      if (driveShot?.distance) {
        if (hole.par === 4) {
          stats.par4.total += driveShot.distance;
          stats.par4.count++;
        } else if (hole.par === 5) {
          stats.par5.total += driveShot.distance;
          stats.par5.count++;
        }
      }
    });
  });

  // Calculate averages
  if (stats.par4.count > 0) {
    stats.par4.average = Math.round(stats.par4.total / stats.par4.count);
  }

  if (stats.par5.count > 0) {
    stats.par5.average = Math.round(stats.par5.total / stats.par5.count);
  }

  return stats;
}