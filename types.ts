
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
  ORIENTATION = 'orientation',
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
  youtubeId: string;
  mcqs: MCQ[];
  deliverablePrompt: string;
  x: number;
  y: number;
  rewardTool?: string;
  benefitFromTool?: string;
  lessonPlan: string;
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
  route: StationId[];
  earnedTools: string[];
  currentStationId: StationId | null;
  stationProgress: Record<string, {
    startTime: number;
    completedAt?: number;
    failedAttempts: number;
    draft?: string;
  }>;
  xp: number;
  clearanceLevel: number;
  dataIntegrity: number;
  log: LogEntry[];
  unlockedUpgrades: string[];
}

export interface Puzzle {
  id: string;
  type: 'cipher' | 'pattern' | 'match' | 'anagram';
  prompt: string;
  solution: string;
  reward: string;
}
