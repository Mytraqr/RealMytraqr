// Baseline values for scratch golfer performance
export const BASELINE = {
  drive: {
    distance: 270, // yards
    fairwayBonus: 0.1 // strokes gained for fairway hit
  },
  approach: {
    // Distance to strokes mapping for scratch golfer
    fromDistance: {
      50: 2.8,  // 50 yards = 2.8 strokes to hole out
      100: 2.9,
      150: 3.0,
      200: 3.2
    }
  },
  greenside: {
    fromDistance: {
      5: 2.0,  // 5 yards = 2.0 strokes to hole out
      10: 2.1,
      20: 2.3
    }
  },
  putting: {
    fromDistance: {
      3: 1.1,  // 3 feet = 1.1 strokes to hole out
      6: 1.3,
      10: 1.6,
      20: 1.9
    }
  }
};