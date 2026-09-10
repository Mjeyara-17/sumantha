import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import SafeImage from './SafeImage';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface Photo22SecretEndingProps {
  photoSrc: string;
  onOpenConstellation: () => void;
  onClose: () => void;
}

export default function Photo22SecretEnding({
  photoSrc,
  onOpenConstellation,
  onClose
}: Photo22SecretEndingProps) {
  const [developed, setDeveloped] = useState(false);

  useEffect(() => {
    sounds.playUnlock();
    const timer = setTimeout(() => {
      setDeveloped(true);
      sounds.playCelebrate();
      confetti({
        particleCount: 120,
        spread: 140,
        origin: { y: 0.5 }
      });
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl text-center text-white animate-fade-in overflow-y-auto">
      <div className="max-w-md w-full bg-slate-950/90 border-2 border-pink-500/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(236,72,153,0.3)] my-8">
        {/* Secret Star Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 text-xs font-mono mb-4 animate-pulse">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>⭐ SECRET MEMORY • 22 / 22 DISCOVERED</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-300 to-purple-300 mb-2">
          Website mudinjiduchu nu nenachiya? 👀
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mb-6">
          Actually... One last secret memory innum irukku!
        </p>

        {/* Instant Developing Film Polaroid */}
        <div className="w-64 sm:w-72 bg-white text-slate-900 p-3 pb-6 rounded-2xl mx-auto mb-6 shadow-2xl transition-all duration-1000">
          <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-black flex items-center justify-center">
            <SafeImage
              src={photoSrc}
              alt="Secret Memory 22"
              className={`w-full h-full object-cover transition-all duration-1000 ${
                developed ? 'filter brightness-100 contrast-100' : 'filter brightness-0 contrast-200'
              }`}
              focusX="50%"
              focusY="35%"
            />
            {!developed && (
              <span className="absolute text-xs font-mono text-white/70 animate-pulse">
                DEVELOPING INSTANT FILM...
              </span>
            )}
          </div>
          <div className="text-center font-display font-black text-sm tracking-widest mt-3 text-slate-800">
            22 / 22 • THE FINAL SECRET ❤️
          </div>
        </div>

        {developed && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 bg-purple-950/60 rounded-2xl border border-purple-400/30">
              <p className="text-xs text-slate-300 mb-1 italic">
                "Ithu last photo..."
              </p>
              <h4 className="text-base sm:text-lg font-bold text-pink-300">
                "But hopefully last memory illa. ❤️"
              </h4>
            </div>

            <button
              onClick={onOpenConstellation}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-amber-500 hover:from-pink-400 hover:to-amber-400 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center space-x-2 animate-bounce"
            >
              <span>ENTER 22-PHOTO 3D HEART CONSTELLATION</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
