import React, { useState } from 'react';
import { CollectedItem } from '../types/game';
import { ItemIcon } from './ItemIcon';
import { Sparkles, Info } from 'lucide-react';

interface InventoryBarProps {
  collectedItems: CollectedItem[];
  onOpenJournal: () => void;
}

const ALL_QUEST_ITEMS: { id: string; name: string; iconName: 'shell' | 'map' | 'torch' | 'gem' | 'key'; location: string; defaultDigit: string }[] = [
  { id: 'shell', name: 'Conch Shell', iconName: 'shell', location: 'Beach', defaultDigit: 'Digit 1: 3' },
  { id: 'map', name: 'Map Fragment', iconName: 'map', location: 'Jungle', defaultDigit: 'Digit 2: 6' },
  { id: 'torch', name: 'Fire Torch', iconName: 'torch', location: 'Cave', defaultDigit: 'Digit 3: 4' },
  { id: 'gem', name: 'Water Gem', iconName: 'gem', location: 'Waterfall', defaultDigit: 'Digit 4: 8' },
  { id: 'key', name: 'Temple Key', iconName: 'key', location: 'Ancient Temple', defaultDigit: 'Unlocks Vault' },
];

export const InventoryBar: React.FC<InventoryBarProps> = ({ collectedItems, onOpenJournal }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const collectedMap = new Map(collectedItems.map(item => [item.id, item]));

  return (
    <div className="w-full bg-amber-950/80 backdrop-blur-md border border-amber-500/30 rounded-xl p-2.5 shadow-lg flex items-center justify-between gap-3 text-amber-100">
      <div className="flex items-center gap-2 shrink-0">
        <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
        <span className="text-xs font-semibold tracking-wider uppercase text-amber-300 hidden sm:inline">
          Artifacts:
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center flex-1">
        {ALL_QUEST_ITEMS.map((itemDef) => {
          const collected = collectedMap.get(itemDef.id);
          const isCollected = Boolean(collected);

          return (
            <div
              key={itemDef.id}
              className="relative group cursor-pointer"
              onClick={() => {
                setActiveTooltip(activeTooltip === itemDef.id ? null : itemDef.id);
              }}
              onMouseEnter={() => setActiveTooltip(itemDef.id)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all duration-300 ${
                  isCollected
                    ? 'bg-gradient-to-b from-amber-500/20 to-amber-700/30 border-amber-400/60 shadow-sm shadow-amber-500/20 scale-100'
                    : 'bg-black/30 border-amber-900/40 opacity-40 hover:opacity-60'
                }`}
              >
                <ItemIcon name={itemDef.iconName} className="w-5 h-5 shrink-0" isUnlocked={isCollected} />
                <span className="text-xs font-medium truncate max-w-[80px] sm:max-w-none">
                  {itemDef.name}
                </span>
                {isCollected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ring-2 ring-emerald-400/30 shrink-0" />
                )}
              </div>

              {/* Tooltip */}
              {activeTooltip === itemDef.id && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-40 w-48 sm:w-56 p-2.5 bg-slate-900/95 border border-amber-400/50 rounded-lg shadow-xl text-xs text-slate-200 pointer-events-none">
                  <div className="font-bold text-amber-300 flex items-center justify-between">
                    <span>{itemDef.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">Found at {itemDef.location}</span>
                  </div>
                  <p className="mt-1 text-[11px] leading-tight text-slate-300">
                    {isCollected ? collected?.lore : `Locked relic. Solve the ${itemDef.location} clue to discover!`}
                  </p>
                  {isCollected && collected?.digitLabel && (
                    <div className="mt-1.5 pt-1.5 border-t border-slate-700/80 font-mono text-[11px] font-semibold text-emerald-400">
                      🗝️ {collected.digitLabel}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={onOpenJournal}
        className="shrink-0 flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 hover:text-amber-100 transition-colors"
        title="Open Explorer Journal"
      >
        <Info className="w-3.5 h-3.5 text-amber-400" />
        <span className="hidden md:inline">Journal</span>
      </button>
    </div>
  );
};
