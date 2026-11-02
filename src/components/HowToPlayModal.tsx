import React from 'react';
import { motion } from 'motion/react';
import { X, MapPin, Heart, Key, Lightbulb, Trophy } from 'lucide-react';

interface HowToPlayModalProps {
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-lg bg-gradient-to-b from-amber-50 to-amber-100 border-2 border-amber-400 rounded-3xl p-6 shadow-2xl text-slate-800"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-amber-200 hover:bg-amber-300 text-amber-900 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-200/80 text-amber-900 font-bold text-xs uppercase tracking-wider mb-2">
            Explorer's Field Handbook
          </div>
          <h3 className="font-adventure text-2xl font-black text-amber-950">
            How to Play Code Quest
          </h3>
          <p className="text-xs text-amber-800 mt-1">
            A programming adventure across the mysterious island of logic and C code.
          </p>
        </div>

        <div className="space-y-3.5 text-xs text-slate-700 max-h-[60vh] overflow-y-auto pr-1">
          {/* Step 1 */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/80 border border-amber-200">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900">1. Navigate 6 Island Locations</div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Travel from the <strong>Beach</strong> through the <strong>Jungle</strong>, <strong>Cave</strong>, <strong>Waterfall</strong>, and <strong>Ancient Temple</strong> to reach the <strong>Treasure Chamber</strong>.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/80 border border-amber-200">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <div className="font-bold text-slate-900">2. Protect Your 3 Explorer Hearts</div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                You begin with 3 lives. Each incorrect clue answer deducts one heart with a shake. If you lose all 3 hearts, you will have to try the expedition again!
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/80 border border-amber-200">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900">3. Collect Relics &amp; 4 Secret Digits</div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Every solved clue rewards a unique relic (shell, map piece, torch, gem, key) and reveals a secret digit. Remember them: they unlock the final 4-digit Treasure Vault lock!
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/80 border border-amber-200">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900">4. Use Clue Hints Wisely</div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Stuck on a riddle or loop? Click the <strong>Hint</strong> button. Each hint costs 50 points from your expedition score.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/80 border border-amber-200">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900">5. Unlock the Grand Chest</div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Reach the vault, enter the 4 code digits, and open the treasure chest to claim eternal glory and save your high score!
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-3 px-6 rounded-2xl font-adventure font-bold text-base bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md active:scale-95 transition-all"
        >
          Got It, Let's Explore!
        </button>
      </motion.div>
    </div>
  );
};
