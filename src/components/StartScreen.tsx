import React from 'react';
import { motion } from 'motion/react';
import { Compass, Play, HelpCircle, Trophy, Sparkles, Map, Terminal, Shield } from 'lucide-react';
import { sound } from '../utils/audio';

interface StartScreenProps {
  onStartGame: () => void;
  onOpenHowToPlay: () => void;
  bestScore: number;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStartGame,
  onOpenHowToPlay,
  bestScore,
}) => {
  return (
    <div className="relative min-h-[92vh] flex items-center justify-center p-4">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial from-amber-900/20 via-slate-950 to-slate-950 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-2xl bg-gradient-to-b from-amber-950/90 via-slate-900/95 to-amber-950/90 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-10 shadow-2xl text-center text-amber-50 backdrop-blur-md"
      >
        {/* Floating Explorer Crest */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 flex items-center justify-center">
          <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse" />
          <div className="relative w-full h-full rounded-3xl bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-400 p-1 shadow-xl flex items-center justify-center border-2 border-yellow-200">
            <Compass className="w-12 h-12 sm:w-14 sm:h-14 text-slate-950 animate-spin-slow" />
          </div>
        </div>

        {/* Title */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Interactive Computer Engineering Adventure</span>
        </div>

        <h1 className="font-adventure text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 drop-shadow-md leading-tight">
          Code Quest
        </h1>
        <div className="font-adventure text-lg sm:text-2xl font-bold text-amber-400/90 tracking-wide mt-1">
          The Treasure Hunt
        </div>

        {/* Story Intro */}
        <p className="mt-4 text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
          You are an intrepid explorer stranded on a mysterious tropical island. Ancient programmers left six locked sanctuary landmarks guarding the pirate king's vault. Solve C coding riddles, predict loop outputs, find memory bugs, and arrange program blocks to claim the grand treasure!
        </p>

        {/* 6 Landmarks Preview Chips */}
        <div className="mt-5 grid grid-cols-3 sm:grid-cols-6 gap-2 text-[11px] font-adventure text-amber-200/90">
          <div className="bg-amber-900/40 border border-amber-600/30 rounded-xl p-2 flex flex-col items-center">
            <span className="text-base mb-0.5">🏖️</span>
            <span>Beach</span>
          </div>
          <div className="bg-amber-900/40 border border-amber-600/30 rounded-xl p-2 flex flex-col items-center">
            <span className="text-base mb-0.5">🌴</span>
            <span>Jungle</span>
          </div>
          <div className="bg-amber-900/40 border border-amber-600/30 rounded-xl p-2 flex flex-col items-center">
            <span className="text-base mb-0.5">🦇</span>
            <span>Cave</span>
          </div>
          <div className="bg-amber-900/40 border border-amber-600/30 rounded-xl p-2 flex flex-col items-center">
            <span className="text-base mb-0.5">🌊</span>
            <span>Waterfall</span>
          </div>
          <div className="bg-amber-900/40 border border-amber-600/30 rounded-xl p-2 flex flex-col items-center">
            <span className="text-base mb-0.5">🏛️</span>
            <span>Temple</span>
          </div>
          <div className="bg-amber-900/40 border border-amber-600/30 rounded-xl p-2 flex flex-col items-center">
            <span className="text-base mb-0.5">🏆</span>
            <span>Vault</span>
          </div>
        </div>

        {/* Best Score Banner */}
        {bestScore > 0 && (
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-black/40 border border-amber-500/40 text-xs font-mono text-amber-300">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>High Score Record: <strong>{bestScore} pts</strong></span>
          </div>
        )}

        {/* Main Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onStartGame();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-adventure font-black text-lg bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-xl shadow-amber-500/30 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Start Expedition</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenHowToPlay();
            }}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl font-adventure font-bold text-sm bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-amber-400/50 text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>How to Play</span>
          </button>
        </div>

        {/* Feature Badges footer */}
        <div className="mt-8 pt-5 border-t border-amber-900/40 flex items-center justify-center gap-4 text-[11px] text-slate-400 font-sans">
          <div className="flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>C Programming</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Map className="w-3.5 h-3.5 text-sky-400" />
            <span>SVG Island Map</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>3 Lives Challenge</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
