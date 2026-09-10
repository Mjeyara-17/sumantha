import React, { useState, useEffect } from 'react';
import { orbitingWords } from '../data/finalMessages';
import { sounds } from '../utils/soundEffects';

interface WhatIThinkAboutYouProps {
  onComplete: () => void;
}

export default function WhatIThinkAboutYou({ onComplete }: WhatIThinkAboutYouProps) {
  const [showPunchline, setShowPunchline] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPunchline(true);
      sounds.playKeyEarned();
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="my-auto pointer-events-auto w-full max-w-md bg-space-card border border-space-border p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-xl animate-fade-in flex flex-col items-center text-center">
      <span className="text-[10px] text-pink-400 font-mono tracking-widest uppercase mb-1">
        AFFECTIONATE ANALYSIS
      </span>
      <h3 className="font-display text-white text-base sm:text-lg font-bold tracking-wide mb-6">
        What I Think About You 👀
      </h3>

      {/* Center Avatar with Orbiting Words */}
      <div className="relative w-48 h-48 flex items-center justify-center mb-8">
        {/* Glowing Center Photo Frame */}
        <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-500 shadow-[0_0_30px_rgba(236,72,153,0.4)] overflow-hidden">
          <img 
            src="/images/sumantha/photo-01.jpg" 
            alt="Sumantha"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-full object-cover rounded-full"
          />
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-900 to-pink-900 flex items-center justify-center text-3xl">
            👑
          </div>
        </div>

        {/* Orbiting Word Badges */}
        {orbitingWords.map((item, idx) => {
          const angle = (idx / orbitingWords.length) * Math.PI * 2;
          const radius = 80;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={idx}
              style={{
                transform: `translate(${x}px, ${y}px)`,
                animationDelay: `${idx * 0.2}s`
              }}
              className="absolute px-2.5 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-bold tracking-wider whitespace-nowrap shadow-lg animate-pulse"
            >
              <span className={item.color}>{item.word}</span>
            </div>
          );
        })}
      </div>

      {/* Dynamic Punchline Sequence */}
      <div className="min-h-[90px] flex flex-col items-center justify-center mb-6">
        <p className="text-slate-300 text-xs sm:text-sm font-light tracking-wide mb-2">
          Okay... Annoying konjam extra than 😂
        </p>

        {showPunchline && (
          <h4 className="font-display text-white text-base sm:text-lg font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400 animate-scale-up">
            "But that's exactly what makes you... YOU. ❤️"
          </h4>
        )}
      </div>

      <button
        onClick={() => {
          sounds.playClick();
          onComplete();
        }}
        className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs tracking-widest rounded-xl uppercase transition-all shadow-lg hover:scale-[1.01]"
      >
        Check Friendship Score 📊 →
      </button>
    </div>
  );
}
