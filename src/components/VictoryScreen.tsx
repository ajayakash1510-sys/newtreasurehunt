import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Trophy, Clock, HelpCircle, Heart, RotateCcw, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface VictoryScreenProps {
  score: number;
  timeSeconds: number;
  hintsUsed: number;
  heartsRemaining: number;
  isNewBestScore: boolean;
  bestScore: number;
  onPlayAgain: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  score,
  timeSeconds,
  hintsUsed,
  heartsRemaining,
  isNewBestScore,
  bestScore,
  onPlayAgain,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Play fanfare on load
  useEffect(() => {
    sound.playVictoryFanfare();
  }, []);

  // Confetti Particle System using standard HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotSpeed: number;
    }[] = [];

    const colors = ['#f59e0b', '#fbbf24', '#fde047', '#10b981', '#38bdf8', '#ef4444', '#ec4899'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Seed particles
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 3,
        speedY: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 5,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center p-4">
      {/* Background Confetti Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-30"
      />

      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 180 }}
        className="relative z-40 w-full max-w-xl bg-gradient-to-b from-amber-950 via-slate-900 to-amber-950 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 shadow-2xl text-center text-amber-50"
      >
        {/* New Record Flag */}
        {isNewBestScore && (
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg mb-3 animate-pulse">
            <Trophy className="w-4 h-4 fill-current" />
            <span>New Island Record!</span>
          </div>
        )}

        <h2 className="font-adventure text-3xl sm:text-4xl font-black text-amber-300 drop-shadow-md">
          Treasure Claimed!
        </h2>
        <p className="text-xs sm:text-sm text-amber-200/80 mt-1">
          You cracked every C programming clue and unlocked the legendary Island Treasure!
        </p>

        {/* Animated Treasure Chest Opening Illustration */}
        <div className="relative w-48 h-44 sm:w-56 sm:h-52 mx-auto my-4 flex items-center justify-center">
          {/* Golden Sunburst / Rays */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-300/30 to-amber-400/20 rounded-full blur-3xl animate-pulse" />

          {/* SVG Animated Open Chest */}
          <svg viewBox="0 0 200 180" className="w-full h-full relative z-10" fill="none">
            {/* Glowing Treasure Light Beams */}
            <polygon points="100,80 30,0 60,0" fill="#fde047" opacity="0.35" />
            <polygon points="100,80 80,0 120,0" fill="#fde047" opacity="0.5" />
            <polygon points="100,80 140,0 170,0" fill="#fde047" opacity="0.35" />

            {/* Flying / Bursting Gold Coins */}
            <g className="animate-coin-pop">
              <circle cx="70" cy="50" r="10" fill="#facc15" stroke="#a16207" strokeWidth="2" />
              <text x="70" y="54" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#713f12">C</text>
            </g>
            <g className="animate-coin-pop" style={{ animationDelay: '0.15s' }}>
              <circle cx="130" cy="45" r="11" fill="#facc15" stroke="#a16207" strokeWidth="2" />
              <text x="130" y="49" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#713f12">C</text>
            </g>
            <g className="animate-coin-pop" style={{ animationDelay: '0.3s' }}>
              <circle cx="100" cy="30" r="13" fill="#fde047" stroke="#a16207" strokeWidth="2" />
              <text x="100" y="35" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#713f12">★</text>
            </g>
            <g className="animate-coin-pop" style={{ animationDelay: '0.45s' }}>
              <circle cx="50" cy="70" r="8" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
            </g>
            <g className="animate-coin-pop" style={{ animationDelay: '0.2s' }}>
              <circle cx="150" cy="65" r="9" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
            </g>

            {/* Chest Interior Overflowing with Jewels */}
            <ellipse cx="100" cy="98" rx="55" ry="16" fill="#ca8a04" />
            <circle cx="90" cy="95" r="7" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
            <circle cx="112" cy="96" r="6" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />
            <circle cx="102" cy="92" r="8" fill="#10b981" stroke="#047857" strokeWidth="1" />

            {/* Chest Body */}
            <path
              d="M 40 95 L 45 150 C 45 155, 50 160, 58 160 L 142 160 C 150 160, 155 155, 155 150 L 160 95 Z"
              fill="#78350f"
              stroke="#451a03"
              strokeWidth="4"
            />
            {/* Chest Golden Straps */}
            <rect x="65" y="95" width="10" height="65" fill="#facc15" stroke="#713f12" strokeWidth="1.5" />
            <rect x="125" y="95" width="10" height="65" fill="#facc15" stroke="#713f12" strokeWidth="1.5" />

            {/* Chest Lock Plate */}
            <circle cx="100" cy="115" r="9" fill="#fde047" stroke="#713f12" strokeWidth="2" />
            <path d="M 100 112 L 100 118" stroke="#713f12" strokeWidth="2.5" strokeLinecap="round" />

            {/* Open Lid (Tilted Upwards) */}
            <g transform="translate(100, 95) rotate(-38) translate(-100, -95)">
              <path
                d="M 38 95 C 38 65, 162 65, 162 95 Z"
                fill="#92400e"
                stroke="#451a03"
                strokeWidth="4"
              />
              <path d="M 65 68 L 65 95" stroke="#facc15" strokeWidth="4" />
              <path d="M 135 68 L 135 95" stroke="#facc15" strokeWidth="4" />
              <circle cx="100" cy="72" r="5" fill="#fde047" stroke="#713f12" strokeWidth="1" />
            </g>
          </svg>
        </div>

        {/* Quest Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-5 text-left">
          {/* Score */}
          <div className="bg-slate-800/80 border border-amber-400/40 rounded-xl p-3">
            <div className="text-[10px] text-amber-300 uppercase tracking-wider font-semibold flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Score</span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-black text-amber-300 mt-0.5">
              {score}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
              Best: {bestScore}
            </div>
          </div>

          {/* Time Taken */}
          <div className="bg-slate-800/80 border border-amber-400/40 rounded-xl p-3">
            <div className="text-[10px] text-amber-300 uppercase tracking-wider font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>Time Taken</span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-black text-sky-300 mt-0.5">
              {formatTime(timeSeconds)}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
              Total Duration
            </div>
          </div>

          {/* Hints Used */}
          <div className="bg-slate-800/80 border border-amber-400/40 rounded-xl p-3">
            <div className="text-[10px] text-amber-300 uppercase tracking-wider font-semibold flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
              <span>Hints Used</span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-black text-purple-300 mt-0.5">
              {hintsUsed}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
              -{hintsUsed * 50} pts
            </div>
          </div>

          {/* Hearts Remaining */}
          <div className="bg-slate-800/80 border border-amber-400/40 rounded-xl p-3">
            <div className="text-[10px] text-amber-300 uppercase tracking-wider font-semibold flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Hearts Left</span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-black text-rose-400 mt-0.5">
              {heartsRemaining} / 3
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
              Survivor Bonus
            </div>
          </div>
        </div>

        {/* Certificate / Praise Box */}
        <div className="bg-amber-900/40 border border-amber-500/30 rounded-xl p-3.5 text-xs text-amber-200 text-left mb-6 leading-relaxed">
          <span className="font-bold text-amber-300">🎓 Computer Engineering Achievement:</span>
          <p className="mt-1">
            You mastered C standard I/O (<code>printf</code> / <code>scanf</code>), variable memory addressing, loop execution cycles, binary numeric scaling, and program structural syntax. You are ready to sail into your engineering journey!
          </p>
        </div>

        {/* Play Again Button */}
        <button
          onClick={() => {
            sound.playClick();
            onPlayAgain();
          }}
          className="w-full py-4 px-8 rounded-2xl font-adventure font-black text-lg bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-xl shadow-amber-500/30 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Play Quest Again</span>
        </button>
      </motion.div>
    </div>
  );
};
