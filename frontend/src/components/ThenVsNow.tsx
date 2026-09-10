import React, { useState } from 'react';
import { sounds } from '../utils/soundEffects';

interface ThenVsNowProps {
  onComplete: () => void;
}

export default function ThenVsNow({ onComplete }: ThenVsNowProps) {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
    if (!hasInteracted) setHasInteracted(true);
  };

  return (
    <div className="my-auto pointer-events-auto w-full max-w-md bg-space-card border border-space-border p-6 rounded-2xl shadow-2xl backdrop-blur-xl animate-fade-in flex flex-col items-center text-center">
      <span className="text-[10px] text-amber-400 font-mono tracking-widest uppercase mb-1">
        TIME COMPARISON PROTOCOL
      </span>
      <h3 className="font-display text-white text-base sm:text-lg font-bold tracking-wide mb-1">
        Konjam things change aachu... 👀
      </h3>
      <p className="text-slate-400 text-xs font-light mb-6">
        Drag slider to compare THEN vs NOW
      </p>

      {/* Split Comparison Frame */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 select-none mb-4 shadow-2xl">
        {/* RIGHT IMAGE: NOW */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center flex items-end justify-end p-3"
          style={{
            backgroundImage: 'url(/images/sumantha/now-photo.jpg), linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)'
          }}
        >
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-cyan-300 border border-cyan-400/30">
            NOW 📸
          </span>
        </div>

        {/* LEFT IMAGE: THEN (Clipped based on slider position) */}
        <div 
          className="absolute inset-0 h-full overflow-hidden bg-cover bg-center flex items-end justify-start p-3"
          style={{
            width: `${sliderPos}%`,
            backgroundImage: 'url(/images/sumantha/then-photo.jpg), linear-gradient(135deg, #ec4899 0%, #a855f7 100%)'
          }}
        >
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-pink-300 border border-pink-400/30">
            THEN ⏳
          </span>
        </div>

        {/* Divider line */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-amber-400 pointer-events-none shadow-[0_0_10px_rgba(245,158,11,0.8)]"
          style={{ left: `${sliderPos}%` }}
        />
      </div>

      {/* Slider Input */}
      <input 
        type="range" 
        min="5" 
        max="95" 
        value={sliderPos}
        onChange={handleSliderChange}
        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-ew-resize accent-amber-400 mb-6"
      />

      {/* Punchline */}
      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 mb-6 w-full">
        <h4 className="font-display text-amber-400 text-sm font-bold tracking-wide">
          Namma nonsense mattum same than 😂❤️
        </h4>
        <p className="text-slate-400 text-[11px] font-light mt-1">
          Years pass, cities change, but our chaotic wavelength remains undefeated.
        </p>
      </div>

      <button
        onClick={() => {
          sounds.playClick();
          onComplete();
        }}
        className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs tracking-widest rounded-xl uppercase transition-all shadow-lg hover:scale-[1.01]"
      >
        View Friendship Timeline 📅 →
      </button>
    </div>
  );
}
