import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface MemoryPuzzleProps {
  onComplete: () => void;
}

export default function MemoryPuzzle({ onComplete }: MemoryPuzzleProps) {
  // 6 pieces (2 rows x 3 columns): index 0 to 5
  // Scramble initial layout: e.g. [3, 0, 4, 1, 5, 2]
  const [pieces, setPieces] = useState<number[]>([3, 0, 4, 1, 5, 2]);
  const [selectedPieceIndex, setSelectedPieceIndex] = useState<number | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  // Check if solved: [0, 1, 2, 3, 4, 5]
  useEffect(() => {
    const solved = pieces.every((p, i) => p === i);
    if (solved && !isSolved) {
      setIsSolved(true);
      sounds.playKeyEarned();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [pieces, isSolved]);

  const handleTileClick = (index: number) => {
    if (isSolved) return;
    sounds.playClick();

    if (selectedPieceIndex === null) {
      setSelectedPieceIndex(index);
    } else {
      // Swap the two pieces
      const updated = [...pieces];
      const temp = updated[selectedPieceIndex];
      updated[selectedPieceIndex] = updated[index];
      updated[index] = temp;
      setPieces(updated);
      setSelectedPieceIndex(null);
    }
  };

  return (
    <div className="my-auto pointer-events-auto w-full max-w-md bg-space-card border border-space-border p-6 rounded-2xl shadow-2xl backdrop-blur-xl animate-fade-in flex flex-col items-center text-center">
      <span className="text-[10px] text-amber-400 font-mono tracking-widest uppercase mb-1">
        NEBULA MEMORY RECONSTRUCTION
      </span>
      <h3 className="font-display text-white text-base sm:text-lg font-bold tracking-wide mb-2">
        Solve the Memory Puzzle 🧩
      </h3>
      <p className="text-slate-400 text-xs font-light mb-4">
        {isSolved 
          ? "YESSS ❤️ indha memory!" 
          : "Tap any two pieces to swap them into place!"}
      </p>

      {/* 2x3 Puzzle Grid (Touch & Click Friendly) */}
      <div className={`relative w-full max-w-xs aspect-[3/2] grid grid-cols-3 grid-rows-2 gap-1.5 p-2 rounded-2xl bg-black/60 border ${
        isSolved 
          ? 'border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.5)] scale-105' 
          : 'border-white/10'
      } transition-all duration-500 overflow-hidden mb-6`}>
        {pieces.map((pieceNum, currentPos) => {
          // Calculate background coordinates for 3x2 grid:
          // pieceNum: 0: (0%, 0%), 1: (50%, 0%), 2: (100%, 0%)
          //           3: (0%, 100%), 4: (50%, 100%), 5: (100%, 100%)
          const col = pieceNum % 3;
          const row = Math.floor(pieceNum / 3);
          const posX = col * 50;
          const posY = row * 100;
          const isSelected = selectedPieceIndex === currentPos;

          return (
            <div
              key={currentPos}
              onClick={() => handleTileClick(currentPos)}
              style={{
                backgroundImage: 'url(/images/sumantha/puzzle-photo.jpg), linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f59e0b 100%)',
                backgroundSize: '300% 200%',
                backgroundPosition: `${posX}% ${posY}%`
              }}
              className={`w-full h-full rounded-lg cursor-pointer transition-all duration-200 relative ${
                isSelected 
                  ? 'ring-2 ring-amber-400 scale-95 shadow-lg' 
                  : 'hover:opacity-90 active:scale-95'
              }`}
            >
              {!isSolved && (
                <span className="absolute bottom-1 right-1 text-[8px] font-mono text-white/50 bg-black/40 px-1 rounded">
                  #{pieceNum + 1}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {isSolved ? (
        <div className="flex flex-col items-center animate-scale-up w-full">
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-left mb-6 w-full">
            <h4 className="font-display text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              Golden Friendship Moment 🌟
            </h4>
            <p className="text-slate-200 text-xs font-light leading-relaxed">
              [ADD REAL MEMORY] - Every puzzle piece represents a shared memory that shaped who we are today. A memory that never fades.
            </p>
          </div>

          <button
            onClick={onComplete}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs tracking-widest rounded-xl uppercase transition-all shadow-lg hover:scale-[1.01]"
          >
            Continue Journey →
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            // Quick solve helper if user gets stuck
            setPieces([0, 1, 2, 3, 4, 5]);
          }}
          className="text-[10px] text-slate-500 hover:text-slate-400 tracking-wider uppercase underline underline-offset-4"
        >
          Auto-Assemble (Hint) ✨
        </button>
      )}
    </div>
  );
}
