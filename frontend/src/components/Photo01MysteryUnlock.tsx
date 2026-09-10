import React, { useState } from 'react';
import { Sparkles, Eye, ArrowRight, Check } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import SafeImage from './SafeImage';

interface Photo01MysteryUnlockProps {
  photoSrc: string;
  onProceed: () => void;
}

export default function Photo01MysteryUnlock({
  photoSrc,
  onProceed
}: Photo01MysteryUnlockProps) {
  const [blurStage, setBlurStage] = useState<number>(30); // 30 -> 15 -> 5 -> 0
  const [revealed, setRevealed] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleReveal = () => {
    sounds.playSparkle();
    setBlurStage(15);
    setTimeout(() => {
      setBlurStage(5);
    }, 400);
    setTimeout(() => {
      setBlurStage(0);
      setRevealed(true);
      setIsZoomed(true);
      sounds.playUnlock();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-fade-in text-white text-center">
      {/* Background Starfield Particles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-slate-950/80 to-black pointer-events-none" />

      <div className="relative max-w-md w-full bg-slate-900/80 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
          <span>PHOTO 01 • MYSTERY REVEAL</span>
        </div>

        {/* Narrative text */}
        <h2 className="text-xl sm:text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-300 to-amber-200 mb-2">
          {revealed ? "Easy thane? 😂" : "Okay Sumantha..."}
        </h2>
        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          {revealed ? (
            <span className="text-amber-300 font-medium">
              First memory successfully unlocked! Welcome to your personalized Little Universe.
            </span>
          ) : (
            <>
              First memory romba easy 👀<br />
              <span className="text-purple-200 font-medium">Indha photo identify panna mudiyuma?</span>
            </>
          )}
        </p>

        {/* The Photo Container with progressive unblur */}
        <div 
          className={`relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden border-2 shadow-2xl transition-all duration-1000 mb-6 ${
            revealed 
              ? 'border-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.4)] scale-105' 
              : 'border-purple-500/40 shadow-purple-900/40'
          }`}
        >
          <SafeImage
            src={photoSrc}
            alt="Sumantha Mystery Memory 01"
            className="w-full h-full object-cover transition-all duration-1000"
            style={{
              filter: `blur(${blurStage}px) brightness(${revealed ? 1 : 0.6})`,
              transform: isZoomed ? 'scale(1.08)' : 'scale(1.0)'
            }}
          />

          {!revealed && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
              <span className="text-4xl mb-2 animate-bounce">🔍</span>
              <span className="text-xs font-mono text-purple-200 tracking-wider">TAP TO REVEAL</span>
            </div>
          )}
        </div>

        {/* CTAs */}
        {!revealed ? (
          <button
            onClick={handleReveal}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-500/30 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>SHOW ME →</span>
          </button>
        ) : (
          <button
            onClick={() => {
              sounds.playCelebrate();
              onProceed();
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-teal-500/30 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-2 animate-pulse"
          >
            <span>ENTER THE MEMORY UNIVERSE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
