import React, { useState } from 'react';
import { HelpCircle, Lock, Unlock, ChevronUp, ChevronDown, BookOpen, KeyRound } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ChamberClueProps {
  onSuccess: () => void;
  onError: (msg: string) => void;
  onUseHint: () => void;
  hintUsed: boolean;
}

export const ChamberClue: React.FC<ChamberClueProps> = ({
  onSuccess,
  onError,
  onUseHint,
  hintUsed,
}) => {
  // 4 digits: [digit1, digit2, digit3, digit4], default initial [0, 0, 0, 0]
  const [digits, setDigits] = useState<number[]>([0, 0, 0, 0]);
  const [showHint, setShowHint] = useState(hintUsed);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const incrementDigit = (index: number) => {
    sound.playClick();
    setDigits((prev) => {
      const next = [...prev];
      next[index] = (next[index] + 1) % 10;
      return next;
    });
  };

  const decrementDigit = (index: number) => {
    sound.playClick();
    setDigits((prev) => {
      const next = [...prev];
      next[index] = (next[index] - 1 + 10) % 10;
      return next;
    });
  };

  const setDirectDigit = (index: number, val: number) => {
    sound.playClick();
    setDigits((prev) => {
      const next = [...prev];
      next[index] = Math.max(0, Math.min(9, val));
      return next;
    });
  };

  const handleUnlock = () => {
    setIsUnlocking(true);
    const codeEntered = digits.join('');

    if (codeEntered === '3648') {
      sound.playCorrect();
      onSuccess();
    } else {
      sound.playWrong();
      onError(`Code "${codeEntered}" did not turn the tumblers! Review your 4 clue solutions in the journal below.`);
      setTimeout(() => {
        setIsUnlocking(false);
      }, 800);
    }
  };

  const handleToggleHint = () => {
    if (!showHint) {
      sound.playHint();
      onUseHint();
      setShowHint(true);
    } else {
      setShowHint(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Golden Vault Tumbler Lock Box */}
      <div className="rounded-2xl bg-gradient-to-b from-amber-950 via-slate-900 to-amber-950 border-2 border-amber-500/60 p-6 shadow-2xl text-center">
        <div className="flex items-center justify-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-widest mb-4">
          <Lock className="w-4 h-4 text-amber-400" />
          <span>Sacred 4-Digit Vault Tumbler</span>
        </div>

        {/* Tumbler Dials */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 py-2">
          {digits.map((digit, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {/* Up button */}
              <button
                type="button"
                onClick={() => incrementDigit(idx)}
                className="w-10 h-8 rounded-t-lg bg-amber-700/60 hover:bg-amber-600 text-amber-200 hover:text-white flex items-center justify-center transition-colors active:scale-90"
                aria-label={`Increment digit ${idx + 1}`}
              >
                <ChevronUp className="w-5 h-5" />
              </button>

              {/* Number Cylinder */}
              <div className="w-14 sm:w-16 h-20 sm:h-24 bg-gradient-to-b from-slate-950 via-slate-800 to-slate-950 border-x-2 border-amber-500/50 flex items-center justify-center shadow-inner relative overflow-hidden">
                {/* Horizontal cylinder lines */}
                <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

                <span className="font-mono text-3xl sm:text-4xl font-black text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                  {digit}
                </span>
              </div>

              {/* Down button */}
              <button
                type="button"
                onClick={() => decrementDigit(idx)}
                className="w-10 h-8 rounded-b-lg bg-amber-700/60 hover:bg-amber-600 text-amber-200 hover:text-white flex items-center justify-center transition-colors active:scale-90"
                aria-label={`Decrement digit ${idx + 1}`}
              >
                <ChevronDown className="w-5 h-5" />
              </button>

              {/* Clue origin badge */}
              <span className="text-[10px] text-amber-400/80 font-mono mt-2">
                Slot {idx + 1}
              </span>
            </div>
          ))}
        </div>

        {/* Quick dial keypad shortcut */}
        <div className="mt-4 pt-3 border-t border-amber-900/60 text-xs text-amber-200/80 flex items-center justify-center gap-2">
          <span>Current Combination:</span>
          <span className="font-mono font-black text-lg text-amber-300 tracking-widest bg-black/40 px-3 py-0.5 rounded border border-amber-500/40">
            {digits.join(' ')}
          </span>
        </div>
      </div>

      {/* Clue Recap / Adventurer Journal Card */}
      <div className="bg-amber-50/90 border border-amber-300 rounded-xl p-4 shadow-sm text-slate-800 space-y-2.5">
        <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-900 border-b border-amber-200 pb-1.5">
          <BookOpen className="w-4 h-4 text-amber-700" />
          <span>Explorer's Clue Journal (Collected Answers)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-amber-200">
            <span className="text-slate-600 flex items-center gap-1.5">
              <span>🏖️</span>
              <span>1. Beach Shell Numeral:</span>
            </span>
            <span className="font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
              3
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-amber-200">
            <span className="text-slate-600 flex items-center gap-1.5">
              <span>🌴</span>
              <span>2. Jungle Loop Output:</span>
            </span>
            <span className="font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
              6
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-amber-200">
            <span className="text-slate-600 flex items-center gap-1.5">
              <span>🦇</span>
              <span>3. Cave Bug Line #:</span>
            </span>
            <span className="font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
              4
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-amber-200">
            <span className="text-slate-600 flex items-center gap-1.5">
              <span>🌊</span>
              <span>4. Waterfall Missing Stone:</span>
            </span>
            <span className="font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
              8
            </span>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 italic text-center pt-1">
          The ancient runes align the four answers in chronological order: [Beach] - [Jungle] - [Cave] - [Waterfall].
        </div>
      </div>

      {/* Hint Alert Box */}
      {showHint && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Vault Master Whisper:</span> Align each dial to the answer you collected:
            Digit 1 = <strong>3</strong>, Digit 2 = <strong>6</strong>, Digit 3 = <strong>4</strong>, Digit 4 = <strong>8</strong>.
            The final combination is <code>3 - 6 - 4 - 8</code>!
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={handleToggleHint}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-amber-800 bg-amber-100/70 hover:bg-amber-200/80 rounded-lg transition-colors border border-amber-300"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{showHint ? 'Hide Hint' : 'Need a Hint? (-50 pts)'}</span>
        </button>

        <button
          onClick={handleUnlock}
          disabled={isUnlocking}
          className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-lg shadow-amber-500/30 active:scale-95 transition-all flex items-center gap-2"
        >
          <KeyRound className="w-5 h-5 text-amber-200" />
          <span>Open Treasure Chest!</span>
        </button>
      </div>
    </div>
  );
};
