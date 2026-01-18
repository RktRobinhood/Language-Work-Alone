
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
  FINAL_SYNTHESIS = 'final_synthesis',
  COMPLETE = 'complete'
}

export interface MCQ {
  question: string;
  options: string[];
  answerIndex: number;
}

export interface DilemmaChoice {
  text: string;
  effect: { dcMod: number; rewardMod: number; integrityMod: number };
  flavor: string;
}

export type ScaffoldType = 'claim-counter' | 'concept-map' | 'perspective-shift' | 'ethical-eval' | 'standard';

export interface Station {
  id: StationId;
  title: string;
  coreIdea: string;
  reading: string;
  readingSource?: string;
  youtubeId?: string;
  mcqs: MCQ[];
  deliverablePrompt: string;
  scaffoldType: ScaffoldType;
  x: number;
  y: number;
  neighbors: StationId[];
  lessonPlan: string;
  fuelCost?: number;
  rationCost?: number;
  difficultyDC: number;
  dilemma: DilemmaChoice[];
}

export interface LogEntry {
  t: number;
  type: 'SYSTEM' | 'RESEARCH' | 'ANOMALY' | 'ACHIEVEMENT' | 'DICE' | 'STORY' | 'SYNC';
  msg: string;
}

export interface GameState {
  seed: string;
  stage: GameStage;
  totalActiveTime: number;
  clearanceLevel: number;
  discoveredNodes: StationId[];
  decryptedNodes: StationId[];
  nodePrerequisites: Record<string, StationId>;
  currentStationId: StationId | null;
  lastPosition: { x: number, y: number };
  stationProgress: Record<string, {
    startTime: number;
    completedAt?: number;
    draft?: string;
    rollResult?: number;
  }>;
  xp: number;
  syncRate: number; 
  integrity: number; 
  fuel: number;      
  rations: number;   
  researchLog: LogEntry[];
  unlockedUpgrades: string[];
}

export interface Puzzle {
  id: string;
  type: 'logic' | 'pattern' | 'fallacy' | 'tok-concept';
  prompt: string;
  solution: string;
  reward: { xp?: number, fuel?: number, rations?: number, integrity?: number };
}
