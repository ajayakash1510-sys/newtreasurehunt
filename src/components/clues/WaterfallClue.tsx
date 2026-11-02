import React, { useState } from 'react';
import { HelpCircle, Waves, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';

interface WaterfallClueProps {
  onSuccess: () => void;
  onError: (msg: string) => void;
  onUseHint: () => void;
  hintUsed: boolean;
}

const CANDIDATE_STONES = [6, 8, 10, 12];

export const WaterfallClue: React.FC<WaterfallClueProps> = ({
  onSuccess,
  onError,
  onUseHint,
  hintUsed,
}) => {
  const [selectedNum, setSelectedNum] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(hintUsed);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (num: number) => {
    sound.playClick();
    setSelectedNum(num);
  };

  const handleSubmit = () => {
    if (selectedNum === null) return;
    setIsSubmitted(true);

    if (selectedNum === 8) {
      sound.playCorrect();
      onSuccess();
    } else {
      sound.playWrong();
      onError(`Stone ${selectedNum} is unstable! In computer systems, what is 4 multiplied by 2?`);
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedNum(null);
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
      {/* Visual Waterfall River Stepping Stones */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-sky-800 via-sky-600 to-blue-800 p-5 shadow-lg border-2 border-sky-400/40">
        <div className="flex items-center justify-between text-sky-200 text-xs mb-3">
          <div className="flex items-center gap-1.5 font-semibold">
            <Waves className="w-4 h-4 text-sky-300" />
            <span>Waterfall Stepping Sequence</span>
          </div>
          <span className="font-mono text-sky-300">Base 2 (Binary Powers)</span>
        </div>

        {/* Stone Path */}
        <div className="flex items-center justify-between gap-1 sm:gap-3 py-4 overflow-x-auto">
          {/* Stone 1 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-slate-200 to-slate-400 border-2 border-slate-300 shadow-lg flex items-center justify-center font-mono font-black text-lg sm:text-xl text-slate-800">
              1
            </div>
            <span className="text-[10px] text-sky-200 font-mono mt-1">2⁰</span>
          </div>

          <div className="text-sky-300 font-bold text-base sm:text-xl">→</div>

          {/* Stone 2 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-slate-200 to-slate-400 border-2 border-slate-300 shadow-lg flex items-center justify-center font-mono font-black text-lg sm:text-xl text-slate-800">
              2
            </div>
            <span className="text-[10px] text-sky-200 font-mono mt-1">2¹</span>
          </div>

          <div className="text-sky-300 font-bold text-base sm:text-xl">→</div>

          {/* Stone 3 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-slate-200 to-slate-400 border-2 border-slate-300 shadow-lg flex items-center justify-center font-mono font-black text-lg sm:text-xl text-slate-800">
              4
            </div>
            <span className="text-[10px] text-sky-200 font-mono mt-1">2²</span>
          </div>

          <div className="text-sky-300 font-bold text-base sm:text-xl">→</div>

          {/* Missing Stone (Target) */}
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl border-2 shadow-lg flex items-center justify-center font-mono font-black text-lg sm:text-xl transition-all ${
              selectedNum !== null
                ? 'bg-amber-400 border-amber-300 text-slate-950 scale-105 shadow-amber-400/50 ring-4 ring-amber-300/40'
                : 'bg-amber-500/30 border-dashed border-amber-300 text-amber-200 animate-pulse'
            }`}>
              {selectedNum !== null ? selectedNum : '?'}
            </div>
            <span className="text-[10px] text-amber-300 font-mono font-bold mt-1">2³ = ?</span>
          </div>

          <div className="text-sky-300 font-bold text-base sm:text-xl">→</div>

          {/* Stone 5 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-slate-200 to-slate-400 border-2 border-slate-300 shadow-lg flex items-center justify-center font-mono font-black text-lg sm:text-xl text-slate-800">
              16
            </div>
            <span className="text-[10px] text-sky-200 font-mono mt-1">2⁴</span>
          </div>
        </div>
      </div>

      {/* Select the Missing Stone */}
      <div className="space-y-2.5">
        <label className="block text-sm font-semibold text-slate-800">
          Which missing number completes the sequence across the waterfall?
        </label>

        <div className="grid grid-cols-4 gap-2.5">
          {CANDIDATE_STONES.map((num) => {
            const isSelected = selectedNum === num;
            return (
              <button
                key={num}
                type="button"
                onClick={() => handleSelect(num)}
                disabled={isSubmitted}
                className={`py-3 rounded-xl border-2 font-mono font-black text-lg sm:text-xl transition-all shadow-sm flex flex-col items-center justify-center ${
                  isSelected
                    ? 'border-amber-500 bg-amber-500 text-white shadow-md shadow-amber-500/30 scale-105'
                    : 'border-slate-300 bg-white hover:border-amber-400 hover:bg-amber-50 text-slate-800'
                }`}
              >
                <span>{num}</span>
                <span className={`text-[10px] font-sans font-normal ${isSelected ? 'text-amber-100' : 'text-slate-400'}`}>
                  Stone {num}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hint Alert Box */}
      {showHint && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Pattern Guide:</span> Each stepping stone is exactly <strong>double</strong> the previous stone: 1 × 2 = 2, 2 × 2 = 4, 4 × 2 = ?. And ? × 2 must equal 16!
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
          onClick={handleSubmit}
          disabled={selectedNum === null || isSubmitted}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 ${
            selectedNum !== null && !isSubmitted
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-amber-500/25 active:scale-95'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Place Stone</span>
        </button>
      </div>
    </div>
  );
};
