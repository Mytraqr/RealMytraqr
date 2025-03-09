export interface Round {
  id: string;
  date: string;
  course: string;
  score: number;
  par: number;
  fairwaysHit: number;
  gir: number;
  putts: number;
  holes: {
    number: number;
    par: number;
    yardage: number;
    shots: {
      id: string;
      type: 'drive' | 'approach' | 'greenside' | 'putt' | 'penalty';
      result?: string;
      distance?: number;
      lie?: string;
      direction?: 'left' | 'right';
      club?: 'driver' | 'wood' | 'long-iron';
      penaltyShot?: number; // Which shot went into penalty (1 for tee shot, 2 for second shot, etc.)
    }[];
  }[];
}