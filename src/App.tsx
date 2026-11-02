import React, { useState, useEffect, useRef } from 'react';
import { GameState, LocationId, BestScoreRecord } from './types/game';
import { ISLAND_LOCATIONS } from './data/locations';
import { getBestScore, saveBestScore } from './utils/storage';
import { sound } from './utils/audio';

import { GameHUD } from './components/GameHUD';
import { InventoryBar } from './components/InventoryBar';
import { IslandMap } from './components/IslandMap';
import { StartScreen } from './components/StartScreen';
import { VictoryScreen } from './components/VictoryScreen';
import { CelebrationModal } from './components/CelebrationModal';
import { GameOverModal } from './components/GameOverModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { JournalModal } from './components/JournalModal';

import { BeachClue } from './components/clues/BeachClue';
import { JungleClue } from './components/clues/JungleClue';
import { CaveClue } from './components/clues/CaveClue';
import { WaterfallClue } from './components/clues/WaterfallClue';
import { TempleClue } from './components/clues/TempleClue';
import { ChamberClue } from './components/clues/ChamberClue';

import { MapPin, AlertCircle, Sparkles } from 'lucide-react';

export default function App() {
  const [bestScoreRecord, setBestScoreRecord] = useState<BestScoreRecord | null>(() => getBestScore());

  const [gameState, setGameState] = useState<GameState>({
    screen: 'start',
    currentLocationIndex: 0,
    completedLocationIds: [],
    hearts: 3,
    score: 1000,
    hintsUsed: 0,
    elapsedSeconds: 0,
    isTimerRunning: false,
    collectedItems: [],
    isMuted: false,
    showHowToPlay: false,
    showJournal: false,
    showGameOver: false,
    shakeHearts: false,
    celebrationData: null,
  });

  const [activeHintLocations, setActiveHintLocations] = useState<Record<string, boolean>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isNewRecord, setIsNewRecord] = useState(false);

  // Timer interval effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState.isTimerRunning && gameState.screen === 'playing') {
      timer = setInterval(() => {
        setGameState((prev) => ({
          ...prev,
          elapsedSeconds: prev.elapsedSeconds + 1,
        }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState.isTimerRunning, gameState.screen]);

  // Audio mute sync
  const toggleSound = () => {
    const nextMuted = !gameState.isMuted;
    sound.setMuted(nextMuted);
    setGameState((prev) => ({ ...prev, isMuted: nextMuted }));
  };

  // Start a new game
  const handleStartGame = () => {
    sound.playStep();
    setActiveHintLocations({});
    setErrorMessage(null);
    setIsNewRecord(false);
    setGameState({
      screen: 'playing',
      currentLocationIndex: 0,
      completedLocationIds: [],
      hearts: 3,
      score: 1000,
      hintsUsed: 0,
      elapsedSeconds: 0,
      isTimerRunning: true,
      collectedItems: [],
      isMuted: gameState.isMuted,
      showHowToPlay: false,
      showJournal: false,
      showGameOver: false,
      shakeHearts: false,
      celebrationData: null,
    });
  };

  // Restart after Game Over
  const handleRestart = () => {
    handleStartGame();
  };

  // Trigger error when player answers incorrectly
  const handleClueError = (msg: string) => {
    sound.playWrong();
    setErrorMessage(msg);

    // Shake hearts
    setGameState((prev) => {
      const nextHearts = prev.hearts - 1;
      const nextScore = Math.max(0, prev.score - 100);

      if (nextHearts <= 0) {
        return {
          ...prev,
          hearts: 0,
          score: nextScore,
          shakeHearts: true,
          isTimerRunning: false,
          showGameOver: true,
        };
      }

      return {
        ...prev,
        hearts: nextHearts,
        score: nextScore,
        shakeHearts: true,
      };
    });

    // Reset shake after animation completes
    setTimeout(() => {
      setGameState((prev) => ({ ...prev, shakeHearts: false }));
    }, 600);

    // Auto-dismiss error message toast after 5s
    setTimeout(() => {
      setErrorMessage((curr) => (curr === msg ? null : curr));
    }, 5000);
  };

  // Use a hint
  const handleUseHint = (locationId: string) => {
    if (activeHintLocations[locationId]) return;

    setActiveHintLocations((prev) => ({ ...prev, [locationId]: true }));
    setGameState((prev) => ({
      ...prev,
      hintsUsed: prev.hintsUsed + 1,
      score: Math.max(0, prev.score - 50),
    }));
  };

  // Clue solved successfully!
  const handleClueSuccess = (locationIndex: number) => {
    const loc = ISLAND_LOCATIONS[locationIndex];
    if (!loc) return;

    sound.playCorrect();
    setErrorMessage(null);

    const isLastLocation = locationIndex === ISLAND_LOCATIONS.length - 1;

    // Check if item not already collected
    const nextCollected = gameState.collectedItems.some((i) => i.id === loc.item.id)
      ? gameState.collectedItems
      : [...gameState.collectedItems, loc.item];

    const nextCompleted = gameState.completedLocationIds.includes(loc.id)
      ? gameState.completedLocationIds
      : [...gameState.completedLocationIds, loc.id];

    const newScore = gameState.score + 250;

    if (isLastLocation) {
      // Completed the whole quest!
      const totalTime = gameState.elapsedSeconds;
      const { isNewRecord: newRec } = saveBestScore(newScore, totalTime);
      setIsNewRecord(newRec);
      setBestScoreRecord(getBestScore());

      setGameState((prev) => ({
        ...prev,
        completedLocationIds: nextCompleted,
        collectedItems: nextCollected,
        score: newScore,
        isTimerRunning: false,
        screen: 'victory',
      }));
    } else {
      const nextLocation = ISLAND_LOCATIONS[locationIndex + 1];

      setGameState((prev) => ({
        ...prev,
        completedLocationIds: nextCompleted,
        collectedItems: nextCollected,
        score: newScore,
        celebrationData: {
          title: `${loc.name} Unlocked!`,
          message: `Congratulations! You solved the ${loc.clueTitle}.`,
          explanation: loc.explanation,
          item: loc.item,
          secretDigitRevealed: loc.secretDigit ?? undefined,
          nextLocationName: nextLocation?.name,
        },
      }));
    }
  };

  // Advance to next location after celebration modal is closed
  const handleProceedNext = () => {
    sound.playStep();
    setGameState((prev) => {
      const nextIndex = Math.min(ISLAND_LOCATIONS.length - 1, prev.currentLocationIndex + 1);
      return {
        ...prev,
        currentLocationIndex: nextIndex,
        celebrationData: null,
      };
    });
  };

  const currentLocation = ISLAND_LOCATIONS[gameState.currentLocationIndex] || ISLAND_LOCATIONS[0];
  const isCurrentHintUsed = Boolean(activeHintLocations[currentLocation.id]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* 1. START SCREEN */}
      {gameState.screen === 'start' && (
        <StartScreen
          onStartGame={handleStartGame}
          onOpenHowToPlay={() => setGameState((prev) => ({ ...prev, showHowToPlay: true }))}
          bestScore={bestScoreRecord?.highScore || 0}
        />
      )}

      {/* 2. PLAYING EXPEDITION VIEW */}
      {gameState.screen === 'playing' && (
        <div className="flex-1 flex flex-col">
          {/* Header HUD */}
          <GameHUD
            hearts={gameState.hearts}
            shakeHearts={gameState.shakeHearts}
            score={gameState.score}
            elapsedSeconds={gameState.elapsedSeconds}
            isMuted={gameState.isMuted}
            onToggleSound={toggleSound}
            onOpenHowToPlay={() => setGameState((prev) => ({ ...prev, showHowToPlay: true }))}
            onOpenJournal={() => setGameState((prev) => ({ ...prev, showJournal: true }))}
            currentLocationName={currentLocation.name}
          />

          <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-5 flex flex-col gap-4">
            {/* Collected Artifacts Inventory Bar */}
            <InventoryBar
              collectedItems={gameState.collectedItems}
              onOpenJournal={() => setGameState((prev) => ({ ...prev, showJournal: true }))}
            />

            {/* Error / Warning Alert Banner */}
            {errorMessage && (
              <div className="bg-rose-950/90 border-2 border-rose-500 rounded-xl p-3 text-xs sm:text-sm text-rose-200 flex items-start gap-2.5 shadow-lg animate-shake">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="flex-1 font-medium">{errorMessage}</div>
                <button
                  onClick={() => setErrorMessage(null)}
                  className="text-xs font-bold text-rose-400 hover:text-rose-200 px-1.5 py-0.5"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Layout: Island Map + Active Clue Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Left / Top: The Island Map (7 cols on desktop) */}
              <div className="lg:col-span-7 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-amber-200/90 px-1">
                  <div className="flex items-center gap-1.5 font-adventure font-bold">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>Mysterious Treasure Island Map</span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Location {gameState.currentLocationIndex + 1} of 6
                  </span>
                </div>

                <IslandMap
                  currentLocationIndex={gameState.currentLocationIndex}
                  completedLocationIds={gameState.completedLocationIds}
                  onSelectLocation={(idx) => {
                    // Only allow switching to completed or current location
                    if (
                      idx === gameState.currentLocationIndex ||
                      gameState.completedLocationIds.includes(ISLAND_LOCATIONS[idx].id)
                    ) {
                      sound.playStep();
                      setGameState((prev) => ({ ...prev, currentLocationIndex: idx }));
                    }
                  }}
                />

                <div className="flex items-center justify-between text-[11px] text-slate-400 px-2 py-1">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Completed
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse inline-block" /> Current
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" /> Locked
                    </span>
                  </div>
                  <span className="hidden sm:inline italic">
                    Explorer moves automatically along the dotted trail
                  </span>
                </div>
              </div>

              {/* Right / Bottom: Current Clue Workstation (5 cols on desktop) */}
              <div className="lg:col-span-5 bg-gradient-to-b from-amber-50 to-amber-100/95 border-2 border-amber-500/40 rounded-2xl p-4 sm:p-5 shadow-xl text-slate-900">
                {/* Landmark Header */}
                <div className="border-b border-amber-300/80 pb-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                      Location {gameState.currentLocationIndex + 1} · {currentLocation.tagline}
                    </span>
                    {gameState.completedLocationIds.includes(currentLocation.id) && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                        ✓ Solved
                      </span>
                    )}
                  </div>
                  <h3 className="font-adventure text-xl sm:text-2xl font-black text-amber-950 mt-1">
                    {currentLocation.name}
                  </h3>
                  <p className="text-xs text-amber-900/80 mt-1 leading-relaxed">
                    {currentLocation.loreIntro}
                  </p>
                </div>

                {/* Render the specific clue for the active location */}
                {gameState.currentLocationIndex === 0 && (
                  <BeachClue
                    onSuccess={() => handleClueSuccess(0)}
                    onError={handleClueError}
                    onUseHint={() => handleUseHint('beach')}
                    hintUsed={isCurrentHintUsed}
                  />
                )}

                {gameState.currentLocationIndex === 1 && (
                  <JungleClue
                    onSuccess={() => handleClueSuccess(1)}
                    onError={handleClueError}
                    onUseHint={() => handleUseHint('jungle')}
                    hintUsed={isCurrentHintUsed}
                  />
                )}

                {gameState.currentLocationIndex === 2 && (
                  <CaveClue
                    onSuccess={() => handleClueSuccess(2)}
                    onError={handleClueError}
                    onUseHint={() => handleUseHint('cave')}
                    hintUsed={isCurrentHintUsed}
                  />
                )}

                {gameState.currentLocationIndex === 3 && (
                  <WaterfallClue
                    onSuccess={() => handleClueSuccess(3)}
                    onError={handleClueError}
                    onUseHint={() => handleUseHint('waterfall')}
                    hintUsed={isCurrentHintUsed}
                  />
                )}

                {gameState.currentLocationIndex === 4 && (
                  <TempleClue
                    onSuccess={() => handleClueSuccess(4)}
                    onError={handleClueError}
                    onUseHint={() => handleUseHint('temple')}
                    hintUsed={isCurrentHintUsed}
                  />
                )}

                {gameState.currentLocationIndex === 5 && (
                  <ChamberClue
                    onSuccess={() => handleClueSuccess(5)}
                    onError={handleClueError}
                    onUseHint={() => handleUseHint('chamber')}
                    hintUsed={isCurrentHintUsed}
                  />
                )}
              </div>
            </div>
          </main>
        </div>
      )}

      {/* 3. VICTORY SCREEN */}
      {gameState.screen === 'victory' && (
        <VictoryScreen
          score={gameState.score}
          timeSeconds={gameState.elapsedSeconds}
          hintsUsed={gameState.hintsUsed}
          heartsRemaining={gameState.hearts}
          isNewBestScore={isNewRecord}
          bestScore={bestScoreRecord?.highScore || gameState.score}
          onPlayAgain={handleStartGame}
        />
      )}

      {/* MODALS */}
      {/* Celebration Modal after correct answer */}
      <CelebrationModal
        data={gameState.celebrationData}
        onContinue={handleProceedNext}
      />

      {/* Game Over Modal when 0 hearts */}
      {gameState.showGameOver && (
        <GameOverModal
          score={gameState.score}
          locationsCompleted={gameState.completedLocationIds.length}
          onRestart={handleRestart}
        />
      )}

      {/* How to Play Modal */}
      {gameState.showHowToPlay && (
        <HowToPlayModal
          onClose={() => setGameState((prev) => ({ ...prev, showHowToPlay: false }))}
        />
      )}

      {/* Journal Modal */}
      {gameState.showJournal && (
        <JournalModal
          completedLocationIds={gameState.completedLocationIds}
          collectedItems={gameState.collectedItems}
          onClose={() => setGameState((prev) => ({ ...prev, showJournal: false }))}
        />
      )}
    </div>
  );
}
