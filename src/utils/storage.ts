import { BestScoreRecord } from '../types/game';

const STORAGE_KEY = 'codequest_best_score_v1';

export function getBestScore(): BestScoreRecord | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.highScore === 'number') {
      return parsed as BestScoreRecord;
    }
    return null;
  } catch (err) {
    console.warn('LocalStorage unavailable or corrupted:', err);
    return null;
  }
}

export function saveBestScore(score: number, timeSeconds: number): { isNewRecord: boolean } {
  try {
    const current = getBestScore();
    let isNewRecord = false;
    if (!current || score > current.highScore) {
      isNewRecord = true;
      const newRecord: BestScoreRecord = {
        highScore: score,
        fastestTimeSeconds: current ? Math.min(current.fastestTimeSeconds, timeSeconds) : timeSeconds,
        completedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecord));
    }
    return { isNewRecord };
  } catch (err) {
    console.warn('Could not save best score to localStorage:', err);
    return { isNewRecord: false };
  }
}
