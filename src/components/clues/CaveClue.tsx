import React, { useState } from 'react';
import { HelpCircle, Bug, Check, AlertCircle } from 'lucide-react';
import { sound } from '../../utils/audio';

interface CaveClueProps {
  onSuccess: () => void;
  onError: (msg: string) => void;
  onUseHint: () => void;
  hintUsed: boolean;
}

interface CodeLine {
  lineNum: number;
  content: string;
  isBug: boolean;
  comment?: string;
  syntaxParts: { text: string; color: string }[];
}

const CAVE_CODE_LINES: CodeLine[] = [
  {
    lineNum: 1,
    content: '#include <stdio.h>',
    isBug: false,
    syntaxParts: [
      { text: '#include ', color: 'text-purple-400' },
      { text: '<stdio.h>', color: 'text-emerald-300' },
    ],
  },
  {
    lineNum: 2,
    content: 'int main() {',
    isBug: false,
    syntaxParts: [
      { text: 'int ', color: 'text-cyan-400' },
      { text: 'main', color: 'text-amber-300' },
      { text: '() {', color: 'text-slate-200' },
    ],
  },
  {
    lineNum: 3,
    content: '    int gems = 10;',
    isBug: false,
    syntaxParts: [
      { text: '    int ', color: 'text-cyan-400' },
      { text: 'gems = ', color: 'text-slate-200' },
      { text: '10', color: 'text-amber-400' },
      { text: ';', color: 'text-slate-200' },
    ],
  },
  {
    lineNum: 4,
    content: '    scanf("%d", gems);',
    isBug: true,
    syntaxParts: [
      { text: '    scanf', color: 'text-sky-300' },
      { text: '(', color: 'text-slate-200' },
      { text: '"%d"', color: 'text-emerald-300' },
      { text: ', gems);', color: 'text-rose-300 font-semibold' },
    ],
  },
  {
    lineNum: 5,
    content: '    printf("Gems: %d\\n", gems);',
    isBug: false,
    syntaxParts: [
      { text: '    printf', color: 'text-sky-300' },
      { text: '(', color: 'text-slate-200' },
      { text: '"Gems: %d\\n"', color: 'text-emerald-300' },
      { text: ', gems);', color: 'text-slate-200' },
    ],
  },
  {
    lineNum: 6,
    content: '    return 0;',
    isBug: false,
    syntaxParts: [
      { text: '    return ', color: 'text-purple-400' },
      { text: '0', color: 'text-amber-400' },
      { text: ';', color: 'text-slate-200' },
    ],
  },
  {
    lineNum: 7,
    content: '}',
    isBug: false,
    syntaxParts: [{ text: '}', color: 'text-slate-200' }],
  },
];

export const CaveClue: React.FC<CaveClueProps> = ({
  onSuccess,
  onError,
  onUseHint,
  hintUsed,
}) => {
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(hintUsed);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLineClick = (line: CodeLine) => {
    if (isProcessing) return;
    setSelectedLine(line.lineNum);
    setIsProcessing(true);

    if (line.isBug) {
      sound.playCorrect();
      onSuccess();
    } else {
      sound.playWrong();
      onError(`Line ${line.lineNum} is valid C code! Look for a critical function call that needs a pointer/address.`);
      setTimeout(() => {
        setIsProcessing(false);
        setSelectedLine(null);
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
          <Bug className="w-4 h-4 text-rose-500" />
          <span>Click directly on the line containing the dangerous bug:</span>
        </p>
        <span className="text-xs text-slate-500 font-mono">Tap any line</span>
      </div>

      {/* Code Inspector Block */}
      <div className="rounded-xl overflow-hidden border-2 border-slate-700 bg-slate-900 shadow-xl">
        <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-400 font-mono font-bold flex items-center gap-1">
              <Bug className="w-3.5 h-3.5" />
              <span>BUG_HUNTER.C</span>
            </span>
          </div>
          <span className="text-[11px] text-slate-400">Target Line Scanner</span>
        </div>

        <div className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
          {CAVE_CODE_LINES.map((line) => {
            const isTargeted = selectedLine === line.lineNum;

            return (
              <button
                key={line.lineNum}
                onClick={() => handleLineClick(line)}
                disabled={isProcessing}
                className={`w-full text-left py-2.5 px-3 flex items-center transition-all duration-150 group ${
                  isTargeted
                    ? line.isBug
                      ? 'bg-emerald-950/80 text-emerald-200 border-l-4 border-emerald-400'
                      : 'bg-rose-950/80 text-rose-200 border-l-4 border-rose-500'
                    : 'hover:bg-slate-800/80 hover:border-l-4 hover:border-amber-400 border-l-4 border-transparent'
                }`}
              >
                {/* Line number */}
                <span className="w-7 text-right pr-3 select-none text-slate-500 group-hover:text-amber-400 font-semibold">
                  {line.lineNum}
                </span>

                {/* Code syntax */}
                <span className="flex-1 overflow-x-auto whitespace-pre">
                  {line.syntaxParts.map((part, pIdx) => (
                    <span key={pIdx} className={part.color}>
                      {part.text}
                    </span>
                  ))}
                </span>

                {/* Scanner Indicator */}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-sans text-amber-300 ml-2 hidden sm:inline">
                  Inspect Line
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
            <span className="font-bold">Cavern Debugger Hint:</span> What does the <code>scanf()</code> function require as its second argument? In C, does it write to a direct value, or does it need the address-of operator <code>&amp;</code> (e.g. <code>&amp;gems</code>)?
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

        <span className="text-xs text-slate-500 italic">
          💡 The faulty line number gives the 3rd Code Digit!
        </span>
      </div>
    </div>
  );
};
