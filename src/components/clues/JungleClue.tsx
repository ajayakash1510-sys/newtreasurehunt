import React, { useState } from 'react';
import { HelpCircle, Terminal, Play, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface JungleClueProps {
  onSuccess: () => void;
  onError: (msg: string) => void;
  onUseHint: () => void;
  hintUsed: boolean;
}

export const JungleClue: React.FC<JungleClueProps> = ({
  onSuccess,
  onError,
  onUseHint,
  hintUsed,
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(hintUsed);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanAnswer = userAnswer.trim();
    if (!cleanAnswer) return;

    setIsSubmitting(true);
    if (cleanAnswer === '6') {
      sound.playCorrect();
      onSuccess();
    } else {
      sound.playWrong();
      onError(`"${cleanAnswer}" is not the output! Trace each loop step: i=1, i=2, i=3. How much is added each time?`);
      setTimeout(() => {
        setIsSubmitting(false);
      }, 700);
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
      {/* Code Box */}
      <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-xl">
        <div className="bg-slate-800/90 px-4 py-2 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="font-mono text-xs text-slate-300 ml-2">jungle_loop.c</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">GCC C11</span>
        </div>

        <div className="p-4 font-mono text-xs sm:text-sm text-slate-100 overflow-x-auto leading-relaxed">
          <div className="flex">
            <span className="text-slate-500 select-none w-7 shrink-0 text-right pr-3">1</span>
            <span><span className="text-purple-400">#include</span> <span className="text-emerald-300">&lt;stdio.h&gt;</span></span>
          </div>
          <div className="flex">
            <span className="text-slate-500 select-none w-7 shrink-0 text-right pr-3">2</span>
            <span></span>
          </div>
          <div className="flex">
            <span className="text-slate-500 select-none w-7 shrink-0 text-right pr-3">3</span>
            <span><span className="text-cyan-400">int</span> <span className="text-amber-300">main</span>() &#123;</span>
          </div>
          <div className="flex bg-slate-800/40 py-0.5 rounded">
            <span className="text-slate-500 select-none w-7 shrink-0 text-right pr-3">4</span>
            <span className="pl-4"><span className="text-cyan-400">int</span> total = <span className="text-amber-400">0</span>;</span>
          </div>
          <div className="flex bg-amber-500/10 py-0.5 rounded border-l-2 border-amber-400">
            <span className="text-slate-500 select-none w-7 shrink-0 text-right pr-3">5</span>
            <span className="pl-4">
              <span className="text-purple-400">for</span> (<span className="text-cyan-400">int</span> i = <span className="text-amber-400">1</span>; i &lt;= <span className="text-amber-400">3</span>; i++) &#123;
            </span>
          </div>
          <div className="flex bg-amber-500/10 py-0.5 rounded border-l-2 border-amber-400">
            <span className="text-slate-500 select-none w-7 shrink-0 text-right pr-3">6</span>
            <span className="pl-8">total += <span className="text-amber-400">2</span>;</span>
          </div>
          <div className="flex bg-amber-500/10 py-0.5 rounded border-l-2 border-amber-400">
            <span className="text-slate-500 select-none w-7 shrink-0 text-right pr-3">7</span>
            <span className="pl-4">&#125;</span>
          </div>
          <div className="flex bg-emerald-500/10 py-0.5 rounded">
            <span className="text-slate-500 select-none w-7 shrink-0 text-right pr-3">8</span>
            <span className="pl-4"><span className="text-sky-300">printf</span>(<span className="text-emerald-300">"%d"</span>, total);</span>
          </div>
          <div className="flex">
            <span className="text-slate-500 select-none w-7 shrink-0 text-right pr-3">9</span>
            <span className="pl-4"><span className="text-purple-400">return</span> <span className="text-amber-400">0</span>;</span>
          </div>
          <div className="flex">
            <span className="text-slate-500 select-none w-7 shrink-0 text-right pr-3">10</span>
            <span>&#125;</span>
          </div>
        </div>
      </div>

      {/* Prediction Prompt & Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-semibold text-slate-800">
          What exact number will be printed to stdout?
        </label>

        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-mono text-sm">
              <Terminal className="w-4 h-4 text-emerald-600 mr-1" />
              <span>&gt;</span>
            </div>
            <input
              type="text"
              inputMode="numeric"
              placeholder="e.g. 6"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-300 rounded-xl font-mono text-lg font-bold text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 shadow-inner"
            />
          </div>

          <button
            type="submit"
            disabled={!userAnswer.trim() || isSubmitting}
            className={`px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 shrink-0 ${
              userAnswer.trim() && !isSubmitting
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-emerald-600/25 active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Submit Output</span>
          </button>
        </div>
      </form>

      {/* Quick Interactive Trace Assist */}
      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
        <div className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
          <span>Loop Trace Guide:</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
          <div className="bg-white p-2 rounded border border-slate-200">
            <div className="text-slate-400 text-[10px]">Round 1 (i=1)</div>
            <div className="text-slate-700 font-semibold mt-0.5">0 + 2 = ?</div>
          </div>
          <div className="bg-white p-2 rounded border border-slate-200">
            <div className="text-slate-400 text-[10px]">Round 2 (i=2)</div>
            <div className="text-slate-700 font-semibold mt-0.5">2 + 2 = ?</div>
          </div>
          <div className="bg-white p-2 rounded border border-slate-200">
            <div className="text-slate-400 text-[10px]">Round 3 (i=3)</div>
            <div className="text-slate-700 font-semibold mt-0.5">4 + 2 = ?</div>
          </div>
        </div>
      </div>

      {/* Hint Alert Box */}
      {showHint && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Loop Master Hint:</span> The loop condition is <code>i &lt;= 3</code>. It starts with <code>i = 1</code>, then <code>i = 2</code>, then <code>i = 3</code> (3 times in total). Each round, 2 is added to <code>total</code>. What is 2 + 2 + 2?
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={handleToggleHint}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-amber-800 bg-amber-100/70 hover:bg-amber-200/80 rounded-lg transition-colors border border-amber-300"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{showHint ? 'Hide Hint' : 'Need a Hint? (-50 pts)'}</span>
        </button>
      </div>
    </div>
  );
};
