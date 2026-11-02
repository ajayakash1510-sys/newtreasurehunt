import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Award } from 'lucide-react';
import { ItemIcon } from './ItemIcon';
import { CollectedItem } from '../types/game';

interface CelebrationModalProps {
  data: {
    title: string;
    message: string;
    explanation: string;
    item: CollectedItem;
    secretDigitRevealed?: number;
    nextLocationName?: string;
  } | null;
  onContinue: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({ data, onContinue }) => {
  if (!data) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="relative w-full max-w-md bg-gradient-to-b from-amber-50 to-amber-100/95 border-2 border-amber-400 rounded-3xl p-6 shadow-2xl text-slate-800 text-center overflow-hidden"
        >
          {/* Top Decorative Sunburst / Sparkles */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-300/30 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-emerald-300/30 rounded-full blur-2xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Clue Solved!</span>
          </div>

          <h3 className="font-adventure text-2xl font-bold text-amber-950">
            {data.title}
          </h3>
          <p className="text-xs text-amber-800 mt-1">
            {data.message}
          </p>

          {/* Item Award Box */}
          <div className="my-5 p-4 rounded-2xl bg-gradient-to-b from-amber-200/60 to-amber-300/40 border border-amber-400/60 shadow-inner flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-white/80 shadow-md border border-amber-400/50 flex items-center justify-center mb-2 animate-bounce">
              <ItemIcon name={data.item.iconName} className="w-12 h-12" isUnlocked={true} />
            </div>
            <div className="font-adventure font-bold text-sm text-amber-950">
              Obtained: {data.item.name}
            </div>
            <p className="text-xs text-amber-800/90 mt-1 max-w-xs">
              {data.item.lore}
            </p>

            {data.secretDigitRevealed !== undefined && (
              <div className="mt-2.5 px-3 py-1 rounded-lg bg-emerald-600 text-white font-mono font-bold text-xs shadow-sm flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>Discovered Secret Code Digit: {data.secretDigitRevealed}</span>
              </div>
            )}
          </div>

          {/* Educational Explanation Box */}
          <div className="bg-white/90 border border-slate-200 rounded-xl p-3.5 text-left mb-6 shadow-sm">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1 mb-1">
              <span>💡 Why It's Correct:</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              {data.explanation}
            </p>
          </div>

          {/* Continue Button */}
          <button
            onClick={onContinue}
            className="w-full py-3.5 px-6 rounded-2xl font-adventure font-bold text-base bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-lg shadow-amber-500/30 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>
              {data.nextLocationName ? `Proceed to ${data.nextLocationName}` : 'Inspect Treasure!'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
