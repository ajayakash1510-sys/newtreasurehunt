import React from 'react';
import { motion } from 'motion/react';
import { X, BookOpen, Check, Lock } from 'lucide-react';
import { ISLAND_LOCATIONS } from '../data/locations';
import { CollectedItem, LocationId } from '../types/game';
import { ItemIcon } from './ItemIcon';

interface JournalModalProps {
  completedLocationIds: LocationId[];
  collectedItems: CollectedItem[];
  onClose: () => void;
}

export const JournalModal: React.FC<JournalModalProps> = ({
  completedLocationIds,
  collectedItems,
  onClose,
}) => {
  const itemMap = new Map(collectedItems.map((i) => [i.id, i]));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-lg bg-gradient-to-b from-[#fbf4e2] to-[#f4e7c7] border-2 border-amber-600/50 rounded-3xl p-6 shadow-2xl text-amber-950 font-sans"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-amber-200/80 hover:bg-amber-300 text-amber-900 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-800 text-amber-100 text-xs font-adventure uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Adventurer's Field Notebook</span>
          </div>
          <h3 className="font-adventure text-2xl font-black text-amber-950">
            Quest Discoveries &amp; Code Log
          </h3>
          <p className="text-xs text-amber-800">
            Log of collected island relics and sacred combination numbers.
          </p>
        </div>

        {/* Entries list */}
        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {ISLAND_LOCATIONS.map((loc, idx) => {
            const isCompleted = completedLocationIds.includes(loc.id);
            const item = itemMap.get(loc.item.id);

            return (
              <div
                key={loc.id}
                className={`p-3 rounded-2xl border-2 transition-all ${
                  isCompleted
                    ? 'bg-amber-100/90 border-amber-500/60 shadow-sm'
                    : 'bg-amber-900/10 border-amber-900/20 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-200 flex items-center justify-center shrink-0">
                      <ItemIcon name={loc.item.iconName} className="w-6 h-6" isUnlocked={isCompleted} />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-amber-950 flex items-center gap-1.5">
                        <span>{idx + 1}. {loc.name}</span>
                        {isCompleted ? (
                          <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-semibold flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> Solved
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500 flex items-center gap-0.5">
                            <Lock className="w-3 h-3" /> Locked
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-amber-800">
                        {isCompleted ? loc.item.name : 'Unknown Artifact'}
                      </div>
                    </div>
                  </div>

                  {/* Secret Digit Info */}
                  <div className="text-right">
                    {isCompleted ? (
                      loc.secretDigit !== null ? (
                        <div className="font-mono text-xs font-black text-amber-900 bg-amber-300/80 px-2 py-0.5 rounded border border-amber-400">
                          Digit #{idx + 1}: <span className="text-base text-red-700">{loc.secretDigit}</span>
                        </div>
                      ) : (
                        <div className="font-mono text-[11px] text-amber-800 bg-amber-200 px-2 py-0.5 rounded">
                          Vault Key 🗝️
                        </div>
                      )
                    ) : (
                      <span className="font-mono text-xs text-amber-800/40">? ? ?</span>
                    )}
                  </div>
                </div>

                {isCompleted && (
                  <div className="mt-2 pt-2 border-t border-amber-300/60 text-[11px] text-amber-900 leading-tight">
                    {loc.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 4-Digit Summary Box */}
        <div className="mt-4 p-3 rounded-xl bg-amber-950 text-amber-100 flex items-center justify-between font-mono text-xs">
          <span>Recorded Vault Code:</span>
          <span className="text-amber-400 font-bold tracking-widest text-sm">
            {completedLocationIds.includes('beach') ? '3' : '_'} -{' '}
            {completedLocationIds.includes('jungle') ? '6' : '_'} -{' '}
            {completedLocationIds.includes('cave') ? '4' : '_'} -{' '}
            {completedLocationIds.includes('waterfall') ? '8' : '_'}
          </span>
        </div>
      </motion.div>
    </div>
  );
};
