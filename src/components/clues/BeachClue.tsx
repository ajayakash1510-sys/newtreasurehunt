import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { sound } from '../../utils/audio';

interface BeachClueProps {
  onSuccess: () => void;
  onError: (msg: string) => void;
  onUseHint: () => void;
  hintUsed: boolean;
}

interface Option {
  id: string;
  code: string;
  desc: string;
  isCorrect: boolean;
}

const OPTIONS: Option[] = [
  {
    id: 'a',
    code: 'scanf("%s", ...);',
    desc: 'Reads user input from stdin',
    isCorrect: false,
  },
  {
    id: 'b',
    code: 'printf("Ahoy, World!\\n");',
    desc: 'Outputs formatted text to stdout',
    isCorrect: true,
  },
  {
    id: 'c',
    code: 'print("Ahoy, World!");',
    desc: 'Built-in printing statement in Python',
    isCorrect: false,
  },
  {
    id: 'd',
    code: 'System.out.println("Ahoy!");',
    desc: 'Console output statement in Java',
    isCorrect: false,
  },
];

export const BeachClue: React.FC<BeachClueProps> = ({
  onSuccess,
  onError,
  onUseHint,
  hintUsed,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(hintUsed);

  const handleSelect = (id: string) => {
    sound.playClick();
    setSelectedOption(id);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);

    const chosen = OPTIONS.find((o) => o.id === selectedOption);
    if (chosen?.isCorrect) {
      sound.playCorrect();
      onSuccess();
    } else {
      sound.playWrong();
      onError('Wrong function! In standard C, think of the function from <stdio.h> with "f" for formatted.');
      // allow retry
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedOption(null);
      }, 900);
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
      {/* Riddle Verse */}
      <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-4 text-amber-100">
        <p className="text-sm italic leading-relaxed text-amber-200">
          "I cast your words onto the terminal screen,<br />
          With <span className="font-mono text-amber-300 font-semibold">%d</span> for numbers and{' '}
          <span className="font-mono text-amber-300 font-semibold">\n</span> to keep it clean.<br />
          Included from <span className="font-mono text-amber-300 font-semibold">&lt;stdio.h&gt;</span> before your quest is done,<br />
          Which sacred function am I under the island sun?"
        </p>
      </div>

      {/* Question prompt */}
      <div className="text-sm font-semibold text-slate-800">
        Select the standard C library function used to print formatted text to the screen:
      </div>

      {/* Options List */}
      <div className="grid grid-cols-1 gap-2.5">
        {OPTIONS.map((opt) => {
          const isSelected = selectedOption === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={isSubmitted}
              className={`text-left p-3.5 rounded-xl border-2 transition-all flex items-center justify-between ${
                isSelected
                  ? 'border-amber-500 bg-amber-50/90 shadow-md ring-2 ring-amber-400/30'
                  : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-slate-50'
              }`}
            >
              <div className="space-y-0.5">
                <div className="font-mono font-bold text-sm text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-sans font-bold">
                    {opt.id.toUpperCase()}
                  </span>
                  <span>{opt.code}</span>
                </div>
                <p className="text-xs text-slate-600 pl-8">{opt.desc}</p>
              </div>

              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isSelected ? 'border-amber-600 bg-amber-600 text-white' : 'border-slate-300'
                }`}
              >
                {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Hint Alert Box */}
      {showHint && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Explorer's Whisper:</span> Look closely at the "f" at the end of the function name! It stands for <em>formatted</em>. In C, you use <code>printf("%d", count);</code>.
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleToggleHint}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-amber-800 bg-amber-100/70 hover:bg-amber-200/80 rounded-lg transition-colors border border-amber-300"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{showHint ? 'Hide Hint' : 'Need a Hint? (-50 pts)'}</span>
        </button>

        <button
          onClick={handleSubmit}
          disabled={!selectedOption || isSubmitted}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 ${
            selectedOption && !isSubmitted
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-amber-500/25 active:scale-95'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Confirm Answer</span>
        </button>
      </div>
    </div>
  );
};
