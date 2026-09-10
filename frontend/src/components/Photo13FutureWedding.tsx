import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, ArrowRight, Flower2 } from 'lucide-react';
import SafeImage from './SafeImage';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface Photo13FutureWeddingProps {
  photoSrc: string;
  onComplete?: () => void;
  onNext?: () => void;
}

export default function Photo13FutureWedding({
  photoSrc,
  onComplete,
  onNext
}: Photo13FutureWeddingProps) {
  const [revealed, setRevealed] = useState(false);
  const [scanProgress, setScanProgress] = useState(17);

  useEffect(() => {
    sounds.playSparkle();

    const t1 = setTimeout(() => setScanProgress(38), 500);
    const t2 = setTimeout(() => setScanProgress(61), 1000);
    const t3 = setTimeout(() => setScanProgress(82), 1500);
    const t4 = setTimeout(() => {
      setScanProgress(100);
      setRevealed(true);
      sounds.playCelebrate();
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.5 }
      });
      if (onComplete) onComplete();
    }, 2100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto bg-slate-950/95 backdrop-blur-2xl border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(245,158,11,0.3)] text-center text-white relative overflow-hidden">
      {/* Background Cherry Blossom Petals */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Future Database Badge */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-mono mb-4">
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
        <span>ACCESSING FUTURE DATABASE • YEAR: 2030</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-amber-300 mb-1">
        {revealed ? "FUTURE MEMORY FOUND 👀" : "SCANNING FUTURE TIMELINE..."}
      </h3>
      <p className="text-xs font-mono text-slate-400 mb-6">
        {revealed ? "The Grand East Palace Hanbok Wedding Ceremony 🌸" : `Decrypting quantum timeline... ${scanProgress}%`}
      </p>

      {/* Future Wedding Floating Frame */}
      <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[3/4] mx-auto mb-6 rounded-3xl overflow-hidden border-4 border-amber-400/90 shadow-[0_0_50px_rgba(245,158,11,0.4)] bg-black group">
        <SafeImage
          src={photoSrc}
          alt="Sumantha Future Korean Wedding"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          focusX="50%"
          focusY="25%"
        />

        {/* Gold & Blossom Frame Overlay */}
        <div className="absolute inset-0 ring-4 ring-inset ring-amber-400/40 rounded-3xl pointer-events-none" />

        {revealed && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col items-center animate-fade-in">
            <span className="text-xs font-mono text-amber-300 tracking-widest uppercase">
              SEOUL • PALACE GARDENS
            </span>
            <h4 className="text-base sm:text-lg font-black text-white font-display mt-0.5">
              SUMANTHA ❤️ MR. CLASSIFIED 🇰🇷
            </h4>
          </div>
        )}
      </div>

      {revealed && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30">
            <p className="text-sm font-semibold text-amber-300 mb-1">
              "Adei... Nijamave nadanthudumo 😭😂"
            </p>
            <p className="text-xs text-slate-300">
              Living the ultimate K-drama main character fairytale!
            </p>
          </div>

          {onNext && (
            <button
              onClick={onNext}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-500/30 transition-all flex items-center justify-center space-x-2"
            >
              <span>View Then vs Now Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
