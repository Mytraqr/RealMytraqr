import { Round } from '../../types/round';
import { BASELINE } from './baseline';
import { StrokesGainedAnalysis, ClubStats } from './types';

function getExpectedStrokes(type: 'approach' | 'greenside' | 'putting', distance: number): number {
  const baseline = BASELINE[type].fromDistance;
  const distances = Object.keys(baseline).map(Number);
  const nearest = distances.reduce((prev, curr) => 
    Math.abs(curr - distance) < Math.abs(prev - distance) ? curr : prev
  );
  return baseline[nearest];
}

export function calculateStrokesGained(rounds: Round[]): StrokesGainedAnalysis {
  const results = {
    drive: { total: 0, shots: 0, average: 0 },
    approach: { total: 0, shots: 0, average: 0 },
    greenside: { total: 0, shots: 0, average: 0 },
    putting: { total: 0, shots: 0, average: 0 }
  };

  const clubStats: Record<string, ClubStats> = {};

  rounds.forEach(round => {
    round.holes.forEach(hole => {
      let expectedStrokes = hole.par; // Start with par as baseline

      hole.shots.forEach((shot, index) => {
        if (shot.type === 'penalty') return;

        let strokesGained = 0;
        const remainingShots = hole.shots.length - index;

        switch (shot.type) {
          case 'drive':
            if (hole.par === 4 || hole.par === 5) {
              const baselineStrokes = hole.par === 4 ? 4 : 5;
              strokesGained = baselineStrokes - remainingShots;
              if (shot.result === 'fairway') strokesGained += 0.2;
              
              results.drive.total += strokesGained;
              results.drive.shots++;

              // Track club stats
              if (shot.club) {
                if (!clubStats[shot.club]) {
                  clubStats[shot.club] = { name: shot.club, strokesGained: 0, shots: 0, average: 0 };
                }
                clubStats[shot.club].strokesGained += strokesGained;
                clubStats[shot.club].shots++;
              }
            }
            break;

          case 'approach':
            if (shot.distance) {
              const expected = getExpectedStrokes('approach', shot.distance);
              strokesGained = expected - remainingShots;
              results.approach.total += strokesGained;
              results.approach.shots++;
            }
            break;

          case 'greenside':
            if (shot.distance) {
              const expected = getExpectedStrokes('greenside', shot.distance);
              strokesGained = expected - remainingShots;
              results.greenside.total += strokesGained;
              results.greenside.shots++;
            }
            break;

          case 'putt':
            if (shot.distance) {
              const expected = getExpectedStrokes('putting', shot.distance);
              strokesGained = expected - remainingShots;
              results.putting.total += strokesGained;
              results.putting.shots++;
            }
            break;
        }
      });
    });
  });

  // Calculate averages
  Object.keys(results).forEach(key => {
    const category = results[key as keyof typeof results];
    if (category.shots > 0) {
      category.average = category.total / category.shots;
    }
  });

  // Calculate club averages
  Object.values(clubStats).forEach(club => {
    if (club.shots > 0) {
      club.average = club.strokesGained / club.shots;
    }
  });

  return {
    categories: results,
    clubs: Object.values(clubStats).sort((a, b) => b.average - a.average)
  };
}