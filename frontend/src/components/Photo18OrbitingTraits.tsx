import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import SafeImage from './SafeImage';
import { sounds } from '../utils/soundEffects';

interface Photo18OrbitingTraitsProps {
  photoSrc: string;
  onComplete?: () => void;
  onNext?: () => void;
}

export default function Photo18OrbitingTraits({
  photoSrc,
  onComplete,
  onNext
}: Photo18OrbitingTraitsProps) {
  const [stage, setStage] = useState<'ORBITING' | 'STOPPED'>('ORBITING');

  const allWords = [
    { text: "FUNNY 😂", color: "text-amber-300", glow: "shadow-amber-500/50" },
    { text: "ANNOYING 😌", color: "text-rose-400", glow: "shadow-rose-500/50" },
    { text: "FOODIE 🍜", color: "text-emerald-400", glow: "shadow-emerald-500/50" },
    { text: "SHORT 🤏😂", color: "text-orange-400", glow: "shadow-orange-500/50" },
    { text: "CRAZY 🤪", color: "text-yellow-300", glow: "shadow-yellow-500/50" },
    { text: "CARING ❤️", color: "text-pink-400 font-bold", glow: "shadow-pink-500/50" },
    { text: "SPECIAL ✨", color: "text-purple-300 font-bold", glow: "shadow-purple-500/50" },
    { text: "BTS HEAD 💜", color: "text-indigo-400", glow: "shadow-indigo-500/50" },
    { text: "K-DRAMA DETECTOR 🇰🇷", color: "text-teal-300", glow: "shadow-teal-500/50" }
  ];

  const finalWords = [
    { text: "CARING ❤️", color: "text-pink-400 font-bold", glow: "shadow-pink-500/50" },
    { text: "FUNNY 😂", color: "text-amber-300 font-bold", glow: "shadow-amber-500/50" },
    { text: "SPECIAL ✨", color: "text-purple-300 font-bold", glow: "shadow-purple-500/50" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('STOPPED');
      sounds.playSparkle();
      if (onComplete) onComplete();
    }, 3800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-950/90 backdrop-blur-2xl border-2 border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center text-white">
      {/* Badge */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-mono mb-4">
        <Sparkles className="w-4 h-4 text-purple-300" />
        <span>PHOTO 18 • WHAT I THINK ABOUT YOU</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-amber-200 mb-6">
        What I Truly Think About You ✨
      </h3>

      {/* Center Portrait with Orbiting Badges */}
      <div className="relative w-64 h-72 sm:w-72 sm:h-80 mx-auto mb-6 flex items-center justify-center">
        {/* The Orbiting Words Cloud */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {(stage === 'ORBITING' ? allWords : finalWords).map((w, idx) => {
            const count = stage === 'ORBITING' ? allWords.length : finalWords.length;
            const angle = (idx / count) * Math.PI * 2;
            const radius = 135;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div
                key={idx}
                className={`absolute px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono ${w.color} shadow-lg transition-all duration-700 ${
                  stage === 'ORBITING' ? 'animate-pulse' : 'scale-110'
                }`}
                style={{
                  transform: `translate(${x}px, ${y}px)`
                }}
              >
                {w.text}
              </div>
            );
          })}
        </div>

        {/* Center Sumantha Photo */}
        <div className="relative w-44 h-52 sm:w-48 sm:h-56 rounded-2xl overflow-hidden border-2 border-purple-400 shadow-[0_0_40px_rgba(168,85,247,0.4)] z-10">
          <SafeImage
            src={photoSrc}
            alt="Sumantha Portrait"
            className="w-full h-full object-cover"
            focusX="50%"
            focusY="30%"
          />
        </div>
      </div>

      {/* Tanglish Narrative */}
      <div className="space-y-3 animate-fade-in mb-6">
        <p className="text-xs sm:text-sm text-slate-300">
          Okay... Annoying konjam extra than 😂<br />
          <span className="text-pink-300 font-medium">But seriously...</span>
        </p>
        <h4 className="text-lg sm:text-xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300">
          "That's what makes you... YOU. ❤️"
        </h4>
      </div>

      {onNext && (
        <button
          onClick={onNext}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center space-x-2"
        >
          <span>Continue to Emotional Memories</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
