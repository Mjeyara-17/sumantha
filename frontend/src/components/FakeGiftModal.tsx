import React, { useState } from 'react';
import { Gift, Sparkles, ArrowRight, Heart, Video } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { birthdayConfig } from '../config/birthdayConfig';
import SafeImage from './SafeImage';

interface FakeGiftModalProps {
  onComplete: () => void;
}

export default function FakeGiftModal({ onComplete }: FakeGiftModalProps) {
  const [giftPhase, setGiftPhase] = useState<'FAKE_REVEAL' | 'REAL_GIFT'>('FAKE_REVEAL');

  const handleSeriousAh = () => {
    sounds.playCelebrate();
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#f59e0b', '#ec4899', '#a855f7']
    });
    setGiftPhase('REAL_GIFT');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl select-none animate-fade-in font-sans">
      <div className="max-w-lg w-full bg-slate-950/95 border-2 border-pink-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center text-white">
        
        {/* PHASE 1: Fake Gift (Ice cream reveal) */}
        {giftPhase === 'FAKE_REVEAL' && (
          <div className="space-y-6 animate-scale-up">
            <span className="text-[10px] font-mono tracking-widest text-pink-400 uppercase bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/30">
              GIFT PROTOCOL • UNBOXED
            </span>

            <div className="relative py-4">
              <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500/20 via-pink-500/20 to-purple-500/20 border-2 border-amber-400/50 flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.3)] animate-bounce-subtle">
                <span className="text-6xl sm:text-7xl select-none">🍦</span>
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-amber-300 mb-1">
                ONE VIRTUAL ICE CREAM 🍦
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-semibold italic">
                "Budget avlo than 😭"
              </p>
              <p className="text-xs text-slate-400 mt-2">
                100% digital sugar-free calories. Don't eat it all at once! 😂
              </p>
            </div>

            <button
              onClick={handleSeriousAh}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-black text-sm tracking-wider shadow-lg shadow-rose-600/30 transition-all cursor-pointer hover:scale-[1.01]"
            >
              SERIOUS AH? 😑 →
            </button>
          </div>
        )}

        {/* PHASE 2: Real Gift Reveal */}
        {giftPhase === 'REAL_GIFT' && (
          <div className="space-y-6 animate-scale-up">
            <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/30">
              ✨ ACTUAL BIRTHDAY SURPRISE UNLOCKED
            </span>

            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-display font-bold text-amber-300">
                Okay okay 😂 actual gift next!
              </h3>
              <p className="text-xs text-slate-300">
                Crafted with love, laughter, and zero budget restrictions ❤️
              </p>
            </div>

            {/* Real Gift Showcase Frame */}
            <div className="relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-[0_0_40px_rgba(245,158,11,0.3)] bg-black">
              {birthdayConfig.enableVideoGift ? (
                <div className="p-4 flex flex-col items-center">
                  <Video className="w-12 h-12 text-pink-400 mb-2 animate-pulse" />
                  <span className="text-xs text-slate-300">Birthday Video Gift Ready</span>
                </div>
              ) : (
                <div className="relative aspect-[4/3] w-full">
                  <SafeImage
                    src="/images/sumantha/photo-21.jpg"
                    alt="Birthday Hero Sumantha"
                    className="w-full h-full object-cover"
                    focusX="50%"
                    focusY="30%"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-left">
                    <span className="text-[10px] font-mono text-amber-300 uppercase">CELESTIAL HERO EDITION</span>
                    <h4 className="text-sm font-bold text-white font-display">TO THE ONE & ONLY SUMANTHA ✨</h4>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-xs text-slate-300 leading-relaxed">
              "The best gift isn't wrapped in paper — it's every real conversation, funny moment, and genuine memory we share."
            </div>

            <button
              onClick={() => {
                sounds.playSparkle();
                onComplete();
              }}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-pink-600 hover:from-amber-400 hover:to-pink-500 text-slate-950 font-black text-sm tracking-wider shadow-xl shadow-amber-500/30 transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.01]"
            >
              <span>Proceed to 3D Birthday Cake 🎂</span>
              <ArrowRight className="w-4 h-4 text-current" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
