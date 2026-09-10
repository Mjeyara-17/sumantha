import React, { useState, useEffect } from 'react';
import { Sparkles, HelpCircle, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import SafeImage from './SafeImage';

interface InteractivePhotoPuzzleProps {
  photoSrc: string;
  onComplete: () => void;
  onNext?: () => void;
}

export default function InteractivePhotoPuzzle({
  photoSrc,
  onComplete,
  onNext
}: InteractivePhotoPuzzleProps) {
  // 3x3 puzzle = 9 pieces (indices 0..8)
  const [pieces, setPieces] = useState<number[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [moves, setMoves] = useState(0);

  // Initialize and shuffle
  useEffect(() => {
    resetPuzzle();
  }, []);

  const resetPuzzle = () => {
    const initial = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    // Deterministic shuffle to ensure it's not already solved
    const shuffled = [3, 0, 5, 6, 8, 1, 7, 2, 4];
    setPieces(shuffled);
    setSelectedIdx(null);
    setIsCompleted(false);
    setMoves(0);
  };

  const handleTileClick = (index: number) => {
    if (isCompleted) return;

    if (selectedIdx === null) {
      setSelectedIdx(index);
      sounds.playSparkle();
    } else {
      if (selectedIdx === index) {
        setSelectedIdx(null);
        return;
      }
      // Swap pieces
      const newPieces = [...pieces];
      const temp = newPieces[selectedIdx];
      newPieces[selectedIdx] = newPieces[index];
      newPieces[index] = temp;
      setPieces(newPieces);
      setSelectedIdx(null);
      setMoves(m => m + 1);
      sounds.playUnlock();

      // Check if solved
      const solved = newPieces.every((p, idx) => p === idx);
      if (solved) {
        setIsCompleted(true);
        sounds.playCelebrate();
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 }
        });
        onComplete();
      }
    }
  };

  const autoSolveHint = () => {
    // Solve up to current state or full
    const solved = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    setPieces(solved);
    setIsCompleted(true);
    sounds.playCelebrate();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    onComplete();
  };

  // Count correctly placed pieces
  const correctCount = pieces.filter((p, idx) => p === idx).length;

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900/90 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-2xl text-center text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-purple-600/30 border border-purple-500/40 rounded-full text-xs font-mono text-purple-300">
            PHOTO 07 • 3×3 PUZZLE
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-amber-300 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            {correctCount} / 9 PIECES
          </span>
        </div>
      </div>

      <h3 className="text-xl md:text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-300 to-purple-300 mb-2">
        Reconstruct the Memory 🧩
      </h3>
      <p className="text-xs md:text-sm text-slate-300 mb-6">
        {isCompleted 
          ? "Finallyyyy 😂 Indha memory than ❤️ Piece by piece, perfectly assembled!"
          : "Tap any two pieces to swap them and assemble Sumantha's photo!"
        }
      </p>

      {/* 3x3 Puzzle Grid */}
      <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-inner bg-slate-950">
        {isCompleted ? (
          // Completed Full Picture with celebratory glow
          <div className="w-full h-full animate-fade-in relative group">
            <SafeImage 
              src={photoSrc} 
              alt="Completed Sumantha Puzzle" 
              className="w-full h-full"
            />
            <div className="absolute inset-0 ring-4 ring-amber-400/80 rounded-2xl pointer-events-none animate-pulse" />
          </div>
        ) : (
          <div className="grid grid-cols-3 grid-rows-3 w-full h-full gap-1 p-1 bg-purple-950/40">
            {pieces.map((pieceVal, idx) => {
              const isSelected = selectedIdx === idx;
              const isCorrect = pieceVal === idx;

              // Calculate background position percentage for 3x3
              const row = Math.floor(pieceVal / 3);
              const col = pieceVal % 3;
              const posX = col * 50; // 0%, 50%, 100%
              const posY = row * 50;

              return (
                <button
                  key={idx}
                  onClick={() => handleTileClick(idx)}
                  className={`relative w-full h-full rounded-lg overflow-hidden transition-all duration-200 focus:outline-none ${
                    isSelected 
                      ? 'ring-4 ring-amber-400 scale-95 z-20 shadow-lg' 
                      : isCorrect 
                        ? 'border border-emerald-400/40' 
                        : 'border border-purple-400/20 hover:border-purple-300/60'
                  }`}
                >
                  <div
                    className="w-full h-full bg-cover"
                    style={{
                      backgroundImage: `url(${photoSrc})`,
                      backgroundSize: '300% 300%',
                      backgroundPosition: `${posX}% ${posY}%`
                    }}
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-amber-400/20 pointer-events-none animate-pulse" />
                  )}
                  {isCorrect && (
                    <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-400 shadow-sm" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Controls & Actions */}
      <div className="flex items-center justify-center space-x-3">
        {!isCompleted ? (
          <>
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-4 py-2 rounded-xl bg-purple-800/40 hover:bg-purple-800/60 border border-purple-400/30 text-xs font-semibold text-purple-200 transition-all flex items-center space-x-1.5"
            >
              <HelpCircle className="w-4 h-4 text-amber-300" />
              <span>{showHint ? "Hide Preview" : "Need a Hint? 👀"}</span>
            </button>

            {showHint && (
              <button
                onClick={autoSolveHint}
                className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-xs font-semibold text-amber-200 transition-all"
              >
                Assemble for Me ✨
              </button>
            )}

            <button
              onClick={resetPuzzle}
              className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 border border-slate-600/40 text-slate-300 transition-all"
              title="Reset Puzzle"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full animate-fade-in">
            <div className="flex items-center space-x-2 text-emerald-400 text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5" />
              <span>Memory Assembled in {moves} moves!</span>
            </div>
            {onNext && (
              <button
                onClick={onNext}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-500/30 transition-all flex items-center space-x-2 hover:scale-105"
              >
                <span>Continue Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Hint Preview Modal / Drawer */}
      {showHint && !isCompleted && (
        <div className="mt-4 p-3 bg-purple-950/60 rounded-2xl border border-purple-400/30 animate-fade-in flex flex-col items-center">
          <p className="text-[11px] text-purple-300 mb-2 font-mono">Reference Thumbnail:</p>
          <div className="w-24 h-24 rounded-xl overflow-hidden border border-purple-400/50 shadow-md">
            <SafeImage src={photoSrc} alt="Preview" className="w-full h-full" />
          </div>
        </div>
      )}
    </div>
  );
}
