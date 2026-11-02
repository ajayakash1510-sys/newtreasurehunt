import React from 'react';
import { Heart, Trophy, Clock, Volume2, VolumeX, HelpCircle, Compass, BookOpen } from 'lucide-react';
import { sound } from '../utils/audio';

interface GameHUDProps {
  hearts: number;
  shakeHearts: boolean;
  score: number;
  elapsedSeconds: number;
  isMuted: boolean;
  onToggleSound: () => void;
  onOpenHowToPlay: () => void;
  onOpenJournal: () => void;
  currentLocationName: string;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  hearts,
  shakeHearts,
  score,
  elapsedSeconds,
  isMuted,
  onToggleSound,
  onOpenHowToPlay,
  onOpenJournal,
  currentLocationName,
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md border-b border-amber-500/30 shadow-md px-3 sm:px-6 py-2.5 text-slate-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-400 p-0.5 shadow-md flex items-center justify-center">
            <Compass className="w-5 h-5 text-slate-950 animate-spin-slow" />
          </div>
          <div className="hidden sm:block">
            <div className="font-adventure font-black text-sm tracking-wide text-amber-300 leading-tight">
              Code Quest
            </div>
            <div className="text-[10px] text-amber-200/70 font-sans leading-none">
              The Treasure Hunt
            </div>
          </div>
        </div>

        {/* Center Zone: Hearts, Score & Timer */}
        <div className="flex items-center gap-3 sm:gap-6 flex-1 justify-center">
          {/* Hearts Meter with Shake Animation */}
          <div
            className={`flex items-center gap-1 bg-black/40 px-2.5 py-1.5 rounded-xl border border-rose-500/30 shadow-inner ${
              shakeHearts ? 'animate-shake' : ''
            }`}
            title={`Lives: ${hearts} of 3`}
          >
            {[1, 2, 3].map((heartIndex) => (
              <Heart
                key={heartIndex}
                className={`w-4 h-4 transition-all duration-300 ${
                  heartIndex <= hearts
                    ? 'text-rose-500 fill-rose-500 scale-100 filter drop-shadow-[0_0_4px_rgba(244,63,94,0.6)]'
                    : 'text-slate-600 fill-slate-800 scale-90 opacity-40'
                }`}
              />
            ))}
          </div>

          {/* Score Counter */}
          <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1.5 rounded-xl border border-amber-500/30 shadow-inner">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="font-mono tabular-nums font-bold text-xs sm:text-sm text-amber-300">
              {score}
            </span>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1.5 rounded-xl border border-sky-500/30 shadow-inner">
            <Clock className="w-4 h-4 text-sky-400" />
            <span className="font-mono tabular-nums font-semibold text-xs sm:text-sm text-sky-300">
              {formatTime(elapsedSeconds)}
            </span>
          </div>
        </div>

        {/* Right Actions: Journal, How to Play & Sound Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              onOpenJournal();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-semibold transition-colors"
            title="Open Quest Log & Discoveries"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">Journal</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenHowToPlay();
            }}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            title="How to Play"
            aria-label="How to Play"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              onToggleSound();
            }}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
