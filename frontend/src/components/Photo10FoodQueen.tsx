import React from 'react';
import { Crown, ArrowRight, Utensils, Sparkles } from 'lucide-react';
import SafeImage from './SafeImage';

interface Photo10FoodQueenProps {
  photoSrc: string;
  onComplete?: () => void;
  onNext?: () => void;
}

export default function Photo10FoodQueen({
  photoSrc,
  onComplete,
  onNext
}: Photo10FoodQueenProps) {
  const stats = [
    { label: "Cake Interest", value: "100% 🍰", color: "text-pink-300" },
    { label: "Ice Cream Craving", value: "1000% 🍦", color: "text-amber-300" },
    { label: "Food Detection Radius", value: "50 KM 🍜", color: "text-emerald-300" },
    { label: "Sharing Food", value: "UNKNOWN ⚠️", color: "text-rose-400 font-bold" },
    { label: "Korean Food", value: "APPROVED 🇰🇷", color: "text-purple-300" }
  ];

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900/90 backdrop-blur-xl border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center text-white">
      {/* Crown Banner */}
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-mono mb-4 animate-bounce">
        <Crown className="w-4 h-4 text-amber-400" />
        <span>ROYAL PROTOCOL • PHOTO 10</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 mb-1">
        SUMANTHA
      </h3>
      <h4 className="text-sm font-semibold tracking-widest text-amber-200 mb-4 uppercase">
        INTERNATIONAL FOOD QUEEN 👑
      </h4>

      {/* Royal Photo with animated floating crown */}
      <div className="relative w-64 h-72 sm:w-72 sm:h-80 mx-auto mb-6 rounded-2xl overflow-hidden border-4 border-amber-400/80 shadow-[0_0_35px_rgba(245,158,11,0.3)] bg-black">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 text-3xl filter drop-shadow-lg">
          👑
        </div>
        <SafeImage
          src={photoSrc}
          alt="Food Queen Sumantha"
          className="w-full h-full object-cover"
          focusX="50%"
          focusY="30%"
        />
        <div className="absolute inset-0 ring-2 ring-inset ring-amber-400/30 rounded-2xl pointer-events-none" />
      </div>

      {/* Fake Royal Analysis Matrix */}
      <div className="bg-slate-950/70 border border-amber-500/20 rounded-2xl p-4 mb-6 text-left space-y-2.5">
        <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 border-b border-slate-800 pb-1 flex items-center justify-between">
          <span>Official Foodie Metrics</span>
          <Utensils className="w-3.5 h-3.5 text-amber-400" />
        </div>
        {stats.map((s, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-300">{s.label}:</span>
            <span className={`font-mono ${s.color}`}>{s.value}</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-300 mb-4 italic">
        "Evidence irukku madam... Escape aaga mudiyathu 😂"
      </p>

      {onNext && (
        <button
          onClick={() => {
            if (onComplete) onComplete();
            onNext();
          }}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-sm shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center space-x-2"
        >
          <span>Continue Next Chapter</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
