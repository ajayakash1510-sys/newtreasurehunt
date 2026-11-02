export type LocationId = 'beach' | 'jungle' | 'cave' | 'waterfall' | 'temple' | 'chamber';

export type LocationStatus = 'locked' | 'unlocked' | 'completed';

export interface CollectedItem {
  id: string;
  name: string;
  iconName: 'shell' | 'map' | 'torch' | 'gem' | 'key' | 'chest';
  lore: string;
  secretDigit: number | null;
  digitLabel: string;
}

export interface LocationData {
  id: LocationId;
  name: string;
  shortName: string;
  tagline: string;
  x: number; // SVG coordinate (0 - 1000)
  y: number; // SVG coordinate (0 - 620)
  item: CollectedItem;
  clueTitle: string;
  loreIntro: string;
  hint: string;
  explanation: string;
  secretDigit: number | null;
}

export interface GameState {
  screen: 'start' | 'playing' | 'victory';
  currentLocationIndex: number;
  completedLocationIds: LocationId[];
  hearts: number;
  score: number;
  hintsUsed: number;
  elapsedSeconds: number;
  isTimerRunning: boolean;
  collectedItems: CollectedItem[];
  isMuted: boolean;
  showHowToPlay: boolean;
  showJournal: boolean;
  showGameOver: boolean;
  shakeHearts: boolean;
  celebrationData: {
    title: string;
    message: string;
    explanation: string;
    item: CollectedItem;
    secretDigitRevealed?: number;
    nextLocationName?: string;
  } | null;
}

export interface BestScoreRecord {
  highScore: number;
  fastestTimeSeconds: number;
  completedAt: string;
}
