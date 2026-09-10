import React, { useState, useEffect } from 'react';
import { Lock, Sparkles, ArrowRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

interface MidnightUnlockModalProps {
  onEnter: () => void;
}

export default function MidnightUnlockModal({ onEnter }: MidnightUnlockModalProps) {
  const [step, setStep] = useState(0);
  const [lockBroken, setLockBroken] = useState(false);

  useEffect(() => {
    // Step 0: Initial silence and lock glowing
    sounds.playScanner();

    const t1 = setTimeout(() => {
      // Step 1: Lock breaks into gold particles
      setLockBroken(true);
      sounds.playCelebrate();
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.4 },
        colors: ['#ffd700', '#f59e0b', '#ec4899', '#a855f7']
      });
      setStep(1);
    }, 1200);

    const t2 = setTimeout(() => {
      setStep(2); // "Happy Birthday Sumantha ❤️"
      sounds.playSparkle();
    }, 2800);

    const t3 = setTimeout(() => {
      setStep(3); // "Okayyy... Ippo than actual surprise start 😌"
    }, 4500);

    const t4 = setTimeout(() => {
      setStep(4); // "But one small condition..."
    }, 6200);

    const t5 = setTimeout(() => {
      setStep(5); // CTA reveal
      sounds.playKeyEarned();
    }, 7800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030108] text-white select-none overflow-hidden animate-fade-in font-sans">
      {/* Cosmic background radiance */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(88,28,135,0.45)_0%,rgba(3,1,8,0.98)_100%)] pointer-events-none" />
      <div className="absolute top-[15%] left-[20%] w-80 h-80 rounded-full bg-purple-600/25 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[15%] right-[20%] w-80 h-80 rounded-full bg-amber-500/20 blur-[120px] pointer-events-none animate-pulse" />

      {/* Main Glass Card */}
      <div className="relative max-w-xl w-full min-h-[500px] bg-slate-950/85 backdrop-blur-2xl border-2 border-amber-400/40 rounded-3xl p-6 sm:p-12 shadow-[0_0_80px_rgba(245,158,11,0.25)] flex flex-col justify-between items-center text-center">
        
        {/* Glowing / Shattering Lock Visual */}
        <div className="relative my-2">
          {!lockBroken ? (
            <div className="relative flex justify-center items-center w-24 h-24 rounded-full border-2 border-amber-400/60 bg-amber-500/10 shadow-[0_0_50px_rgba(245,158,11,0.5)] animate-pulse">
              <Lock className="w-12 h-12 text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
            </div>
          ) : (
            <div className="relative flex justify-center items-center w-24 h-24 rounded-full border-2 border-pink-400/60 bg-gradient-to-tr from-pink-500/20 to-purple-600/20 shadow-[0_0_60px_rgba(236,72,153,0.5)] animate-scale-up">
              <Sparkles className="w-12 h-12 text-amber-300 animate-spin-slow" />
            </div>
          )}
        </div>

        {/* Narrative Flow */}
        <div className="flex-1 flex flex-col justify-center items-center space-y-4 my-6">
          {step >= 1 && (
            <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-amber-300 uppercase animate-fade-in">
              ✨ The wait is over...
            </p>
          )}

          {step >= 2 && (
            <h1 className="text-2xl sm:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-300 to-purple-300 tracking-wide leading-tight animate-scale-up">
              Happy Birthday Sumantha ❤️
            </h1>
          )}

          {step >= 3 && (
            <div className="space-y-1 animate-fade-in">
              <p className="text-sm sm:text-base text-slate-200 font-light">
                Okayyy...
              </p>
              <p className="text-sm sm:text-base font-semibold text-pink-400">
                Ippo than actual surprise start 😌
              </p>
            </div>
          )}

          {step >= 4 && (
            <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-500/30 max-w-md animate-fade-in">
              <p className="text-xs text-slate-300 mb-1 font-mono">
                But one small condition...
              </p>
              <p className="text-xs sm:text-sm text-amber-300 font-medium">
                Namma memories-la unakku evlo nyabagam irukku nu first paakalam 😂
              </p>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className="w-full pt-4">
          {step >= 5 ? (
            <button
              onClick={() => {
                sounds.playCelebrate();
                onEnter();
              }}
              className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-slate-950 hover:text-white font-black text-sm tracking-wider shadow-xl shadow-amber-500/30 transition-all flex items-center justify-center space-x-2 animate-bounce-subtle cursor-pointer"
            >
              <span>ENTER OUR LITTLE UNIVERSE</span>
              <ArrowRight className="w-4 h-4 text-current" />
            </button>
          ) : (
            <button
              onClick={() => setStep(5)}
              className="text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors tracking-widest uppercase cursor-pointer"
            >
              Skip intro sequence →
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
