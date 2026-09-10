import React, { useState } from 'react';
import { sounds } from '../utils/soundEffects';

interface RunawayNoButtonProps {
  onYes: () => void;
}

export default function RunawayNoButton({ onYes }: RunawayNoButtonProps) {
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);

  const dodgeNoButton = (e: React.SyntheticEvent) => {
    e.preventDefault();
    sounds.playClick();

    // Random safe offsets within bounding box
    const randomX = (Math.random() - 0.5) * 220;
    const randomY = (Math.random() - 0.5) * 120;
    setNoOffset({ x: randomX, y: randomY });
    setDodgeCount(prev => prev + 1);
  };

  const getNoButtonText = () => {
    if (dodgeCount === 0) return "NO 😭";
    if (dodgeCount === 1) return "👀";
    if (dodgeCount === 2) return "Adei 😂";
    if (dodgeCount === 3) return "Nice try 😌";
    return "NO option temporarily unavailable 😌";
  };

  // Scale factor for YES button: grows with every dodge attempt
  const yesScale = Math.min(1 + dodgeCount * 0.15, 1.8);

  return (
    <div className="my-auto pointer-events-auto w-full max-w-md bg-space-card border border-space-border p-8 rounded-2xl shadow-2xl backdrop-blur-xl animate-fade-in text-center relative overflow-hidden">
      <span className="text-[10px] text-pink-400 font-mono tracking-widest uppercase mb-2 block">
        FINAL VERIFICATION GATE
      </span>

      <h3 className="font-display text-white text-base sm:text-lg font-bold tracking-wider leading-relaxed mb-10">
        After all these memories... <br />
        Would you choose this friendship again? ❤️
      </h3>

      <div className="flex items-center justify-center gap-6 min-h-[100px] relative">
        {/* YES BUTTON: Grows larger */}
        <button
          onClick={() => {
            sounds.playKeyEarned();
            onYes();
          }}
          style={{
            transform: `scale(${yesScale})`,
            transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
          className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-widest rounded-full uppercase shadow-[0_0_20px_rgba(16,185,129,0.4)] z-20"
        >
          YES ❤️
        </button>

        {/* RUNAWAY NO BUTTON: Evades cursor & touch */}
        <button
          onMouseEnter={dodgeNoButton}
          onClick={dodgeNoButton}
          onTouchStart={dodgeNoButton}
          style={{
            transform: `translate(${noOffset.x}px, ${noOffset.y}px)`,
            transition: 'transform 0.18s ease-out'
          }}
          className="px-6 py-2.5 bg-rose-700/80 hover:bg-rose-600 text-white/90 font-medium text-xs tracking-widest rounded-full uppercase border border-rose-500/20 whitespace-nowrap z-10 select-none cursor-pointer"
        >
          {getNoButtonText()}
        </button>
      </div>

      {dodgeCount > 0 && (
        <p className="text-[11px] text-slate-400 mt-6 italic animate-fade-in">
          Resistance is futile... the universe only accepts one answer! 😂
        </p>
      )}
    </div>
  );
}
