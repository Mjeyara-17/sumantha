import React from 'react';
import { Sparkles, Cake, Heart, ArrowRight } from 'lucide-react';
import SafeImage from './SafeImage';

interface Photo21BirthdayHeroProps {
  photoSrc: string;
  onExploreMemoryMap?: () => void;
}

export default function Photo21BirthdayHero({
  photoSrc,
  onExploreMemoryMap
}: Photo21BirthdayHeroProps) {
  return (
    <div className="w-full max-w-lg mx-auto bg-slate-950/95 backdrop-blur-3xl border-2 border-amber-400/80 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(245,158,11,0.4)] text-center text-white relative animate-fade-in">
      {/* Badge */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-mono mb-4 animate-bounce">
        <Cake className="w-4 h-4 text-amber-300" />
        <span>SEPTEMBER 11 • OFFICIAL BIRTHDAY HERO</span>
      </div>

      <h2 className="text-2xl sm:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-amber-400 mb-1 tracking-tight">
        HAPPY BIRTHDAY
      </h2>
      <h3 className="text-xl sm:text-3xl font-display font-black text-white mb-2">
        SUMANTHA ❤️
      </h3>
      <p className="text-xs sm:text-sm font-mono text-amber-300 tracking-widest uppercase mb-6">
        11 SEPTEMBER 🎂
      </p>

      {/* Hero Photo in Gold Glow Frame */}
      <div className="relative w-64 h-80 sm:w-72 sm:h-96 mx-auto mb-6 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-[0_0_50px_rgba(245,158,11,0.5)] bg-black">
        <SafeImage
          src={photoSrc}
          alt="Happy Birthday Sumantha Hero"
          className="w-full h-full object-cover"
          focusX="50%"
          focusY="30%"
        />
        <div className="absolute inset-0 ring-4 ring-inset ring-amber-400/40 rounded-3xl pointer-events-none" />
      </div>

      {/* Birthday Celebratory Poem / Tanglish Lines */}
      <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4 mb-6 text-xs sm:text-sm text-slate-200 space-y-1.5 leading-relaxed">
        <p>More laughs. ✨</p>
        <p>More random talks. 💬</p>
        <p>More teasing. 😌</p>
        <p>More food. 🍜😂</p>
        <p>More crazy moments.</p>
        <p className="font-bold text-amber-300 text-sm sm:text-base pt-2">
          "Innum neraya memories create pannuvom ❤️"
        </p>
      </div>

      {/* Memory Counter Callout */}
      <div className="p-3 bg-purple-950/60 border border-purple-400/40 rounded-2xl mb-6">
        <span className="text-xs font-mono text-purple-300">
          21 / 22 MEMORIES FOUND 💫
        </span>
      </div>

      {onExploreMemoryMap && (
        <button
          onClick={onExploreMemoryMap}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-500/30 transition-all flex items-center justify-center space-x-2"
        >
          <span>OPEN 3D MEMORY MAP & DISCOVERIES</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
