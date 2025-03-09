export interface StrokesGainedResult {
  total: number;
  shots: number;
  average: number;
}

export interface ClubStats {
  name: string;
  strokesGained: number;
  shots: number;
  average: number;
}

export interface StrokesGainedAnalysis {
  categories: {
    drive: StrokesGainedResult;
    approach: StrokesGainedResult;
    greenside: StrokesGainedResult;
    putting: StrokesGainedResult;
  };
  clubs: ClubStats[];
}

export interface StrokesGainedInsight {
  type: string;
  message: string;
}