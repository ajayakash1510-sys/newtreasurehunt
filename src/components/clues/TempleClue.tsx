import React, { useState } from 'react';
import { HelpCircle, GripVertical, ArrowUp, ArrowDown, CheckCircle2, RotateCcw } from 'lucide-react';
import { sound } from '../../utils/audio';

interface TempleClueProps {
  onSuccess: () => void;
  onError: (msg: string) => void;
  onUseHint: () => void;
  hintUsed: boolean;
}

interface CodeBlock {
  id: string;
  order: number; // 0, 1, 2, 3
  code: string;
  label: string;
  color: string;
}

const ORIGINAL_BLOCKS: CodeBlock[] = [
  {
    id: 'inc',
    order: 0,
    code: '#include <stdio.h>',
    label: 'Header Preprocessor Directive',
    color: 'border-purple-400 bg-purple-950/40 text-purple-200',
  },
  {
    id: 'main',
    order: 1,
    code: 'int main() {',
    label: 'Main Function Entrypoint',
    color: 'border-cyan-400 bg-cyan-950/40 text-cyan-200',
  },
  {
    id: 'print',
    order: 2,
    code: '    printf("Temple door open!\\n");',
    label: 'Execution Statement',
    color: 'border-emerald-400 bg-emerald-950/40 text-emerald-200',
  },
  {
    id: 'ret',
    order: 3,
    code: '    return 0;\n}',
    label: 'Program Clean Exit',
    color: 'border-amber-400 bg-amber-950/40 text-amber-200',
  },
];

// Initial jumbled order
const INITIAL_JUMBLED = [ORIGINAL_BLOCKS[2], ORIGINAL_BLOCKS[0], ORIGINAL_BLOCKS[3], ORIGINAL_BLOCKS[1]];

export const TempleClue: React.FC<TempleClueProps> = ({
  onSuccess,
  onError,
  onUseHint,
  hintUsed,
}) => {
  const [blocks, setBlocks] = useState<CodeBlock[]>(INITIAL_JUMBLED);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(hintUsed);
  const [isVerifying, setIsVerifying] = useState(false);
  const [selectedToSwap, setSelectedToSwap] = useState<number | null>(null);

  const moveBlock = (fromIdx: number, toIdx: number) => {
    sound.playClick();
    if (toIdx < 0 || toIdx >= blocks.length) return;
    const next = [...blocks];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    setBlocks(next);
    setSelectedToSwap(null);
  };

  const handleTapBlock = (index: number) => {
    sound.playClick();
    if (selectedToSwap === null) {
      setSelectedToSwap(index);
    } else if (selectedToSwap === index) {
      setSelectedToSwap(null);
    } else {
      // Swap the two selected blocks
      const next = [...blocks];
      const temp = next[selectedToSwap];
      next[selectedToSwap] = next[index];
      next[index] = temp;
      setBlocks(next);
      setSelectedToSwap(null);
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIndex) return;
    moveBlock(draggedIdx, targetIndex);
    setDraggedIdx(null);
  };

  const handleReset = () => {
    sound.playClick();
    setBlocks(INITIAL_JUMBLED);
    setSelectedToSwap(null);
  };

  const handleVerify = () => {
    setIsVerifying(true);
    // Check if blocks are in order 0, 1, 2, 3
    const isCorrect = blocks.every((b, idx) => b.order === idx);

    if (isCorrect) {
      sound.playCorrect();
      onSuccess();
    } else {
      sound.playWrong();
      onError('The program sequence is incorrect! Place #include at the top, then int main(), then printf, and return 0 last.');
      setTimeout(() => {
        setIsVerifying(false);
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
        <div>
          <h4 className="text-sm font-semibold text-slate-800">
            Reorder the 4 stone tablets into a valid C program:
          </h4>
          <p className="text-xs text-slate-500">
            Drag &amp; drop, or use the <span className="font-bold text-amber-700">↑ / ↓</span> arrows, or tap two blocks to swap.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-amber-700 font-medium p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          title="Reset stone order"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Jumbled Blocks Container */}
      <div className="space-y-2.5">
        {blocks.map((block, idx) => {
          const isSelected = selectedToSwap === idx;

          return (
            <div
              key={block.id}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, idx)}
              className={`group flex items-center gap-2 p-3 rounded-xl border-2 transition-all select-none ${
                block.color
              } ${
                isSelected
                  ? 'ring-4 ring-amber-400 border-amber-400 scale-[1.02] shadow-xl'
                  : 'hover:border-amber-400/80 shadow-md'
              }`}
            >
              {/* Grip Handle for Desktop Drag */}
              <div
                className="cursor-grab active:cursor-grabbing p-1 text-slate-400 hover:text-slate-200 shrink-0"
                title="Drag to rearrange"
              >
                <GripVertical className="w-5 h-5" />
              </div>

              {/* Order number tag */}
              <span className="w-6 h-6 rounded-md bg-black/40 text-amber-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </span>

              {/* Code content */}
              <div
                onClick={() => handleTapBlock(idx)}
                className="flex-1 cursor-pointer font-mono text-xs sm:text-sm font-medium whitespace-pre overflow-x-auto py-1"
              >
                {block.code}
                <div className="text-[10px] font-sans opacity-70 mt-0.5 font-normal">
                  {block.label} {isSelected && '(Selected to swap - tap another block)'}
                </div>
              </div>

              {/* Mobile / Touch Up & Down Reorder Buttons */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => moveBlock(idx, idx - 1)}
                  disabled={idx === 0}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                    idx === 0
                      ? 'text-slate-600 cursor-not-allowed'
                      : 'bg-black/30 hover:bg-black/50 text-slate-200 active:scale-90'
                  }`}
                  aria-label="Move Up"
                  title="Move Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveBlock(idx, idx + 1)}
                  disabled={idx === blocks.length - 1}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                    idx === blocks.length - 1
                      ? 'text-slate-600 cursor-not-allowed'
                      : 'bg-black/30 hover:bg-black/50 text-slate-200 active:scale-90'
                  }`}
                  aria-label="Move Down"
                  title="Move Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hint Alert Box */}
      {showHint && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Temple Architect Hint:</span> Every C program begins with preprocessor headers like <code>#include &lt;stdio.h&gt;</code>, followed by the entry point <code>int main() &#123;</code>, then the function statements (<code>printf</code>), and concludes with <code>return 0; &#125;</code>.
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
          onClick={handleVerify}
          disabled={isVerifying}
          className="px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md shadow-amber-500/25 active:scale-95 transition-all flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Verify Order</span>
        </button>
      </div>
    </div>
  );
};
