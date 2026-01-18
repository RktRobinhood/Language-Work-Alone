
export enum StationId {
  RELATIVITY = 'relativity',
  METAPHOR = 'metaphor',
  CREE = 'cree',
  ENDANGERED = 'endangered',
  AI_MT = 'ai_mt',
  JARGON = 'jargon',
  POLITENESS = 'politeness',
  HUMOR = 'humor',
  TRANSLATION = 'translation',
  ACQUISITION = 'acquisition',
  ORAL_TRADITION = 'oral_tradition',
  NEWS_PEAK = 'news_peak'
}

export enum GameStage {
  FIELD_RESEARCH = 'field_research',
  FINAL_SYNTHESIS = 'final_synthesis'
}

export interface MCQ {
  question: string;
  options: string[];
  answerIndex: number;
}

export interface Station {
  id: StationId;
  title: string;
  coreIdea: string;
  reading: string;
  readingSource?: string;
  youtubeId?: string;
  mcqs: MCQ[];
  deliverablePrompt: string;
  x: number;
  y: number;
  rewardTool?: string;
  benefitFromTool?: string;
  neighbors: StationId[];
  lessonPlan: string;
  fuelCost?: number;
  rationCost?: number;
}

export interface LogEntry {
  t: number;
  type: string;
  payload: any;
}

export interface GameState {
  seed: string;
  stage: GameStage;
  totalActiveTime: number;
  discoveredNodes: StationId[];
  earnedTools: string[];
  currentStationId: StationId | null;
  lastPosition: { x: number, y: number };
  stationProgress: Record<string, {
    startTime: number;
    completedAt?: number;
    failedAttempts: number;
    draft?: string;
  }>;
  xp: number;
  clearanceLevel: number;
  integrity: number; 
  fuel: number;      
  rations: number;   
  log: LogEntry[];
  unlockedUpgrades: string[];
}

export interface Puzzle {
  id: string;
  type: 'cipher' | 'pattern' | 'match' | 'anagram';
  prompt: string;
  solution: string;
  reward: { xp?: number, fuel?: number, rations?: number, integrity?: number };
}
