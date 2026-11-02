import React from 'react';
import { motion } from 'motion/react';
import { HeartCrack, RotateCcw, Compass } from 'lucide-react';
import { sound } from '../utils/audio';

interface GameOverModalProps {
  onRestart: () => void;
  score: number;
  locationsCompleted: number;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  onRestart,
  score,
  locationsCompleted,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="relative w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-rose-500/50 rounded-3xl p-6 shadow-2xl text-slate-100 text-center overflow-hidden"
      >
        <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-500/40 flex items-center justify-center mx-auto mb-4 text-rose-400">
          <HeartCrack className="w-8 h-8 animate-pulse" />
        </div>

        <h3 className="font-adventure text-2xl font-bold text-rose-300">
          Expedition Interrupted!
        </h3>
        <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
          You ran out of explorer hearts on the mysterious island.
        </p>

        {/* Motivational note for CS/CE students */}
        <div className="my-5 p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-left text-xs text-slate-300 space-y-2">
          <div className="font-bold text-amber-300 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Engineer's Log:</span>
          </div>
          <p className="leading-relaxed">
            Every senior engineer and explorer has hit segmentation faults, missing semicolons, and infinite loops! Debugging is how true mastery begins.
          </p>
          <div className="pt-2 border-t border-slate-700 flex justify-between font-mono text-[11px] text-slate-400">
            <span>Locations Reached: {locationsCompleted} / 6</span>
            <span>Score: {score}</span>
          </div>
        </div>

        {/* Try Again Button */}
        <button
          onClick={() => {
            sound.playClick();
            onRestart();
          }}
          className="w-full py-3.5 px-6 rounded-2xl font-adventure font-bold text-base bg-gradient-to-r from-rose-500 to-amber-600 hover:from-rose-600 hover:to-amber-700 text-white shadow-lg shadow-rose-500/30 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again &amp; Restart Hunt</span>
        </button>
      </motion.div>
    </div>
  );
};
