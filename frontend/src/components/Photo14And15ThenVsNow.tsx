import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeftRight } from 'lucide-react';
import SafeImage from './SafeImage';

interface Photo14And15ThenVsNowProps {
  thenSrc: string;
  nowSrc: string;
  onComplete?: () => void;
  onNext?: () => void;
}

export default function Photo14And15ThenVsNow({
  thenSrc,
  nowSrc,
  onComplete,
  onNext
}: Photo14And15ThenVsNowProps) {
  const [sliderPos, setSliderPos] = useState(50);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
    if (onComplete) onComplete();
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900/90 backdrop-blur-xl border-2 border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center text-white">
      {/* Badge */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-mono mb-4">
        <ArrowLeftRight className="w-4 h-4 text-purple-300" />
        <span>PHOTOS 14 & 15 • THEN VS NOW</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-300 to-purple-300 mb-2">
        Konjam years back pogalam... ⏳
      </h3>
      <p className="text-xs sm:text-sm text-slate-300 mb-6">
        Things konjam change aachu... But namma nonsense mattum same than 😂
      </p>

      {/* Interactive Split Slider Frame */}
      <div className="relative w-64 h-80 sm:w-72 sm:h-96 mx-auto mb-4 rounded-3xl overflow-hidden border-2 border-purple-500/50 shadow-2xl select-none">
        {/* Right / NOW Image */}
        <SafeImage
          src={nowSrc}
          alt="Now Sumantha"
          className="absolute inset-0 w-full h-full object-cover"
          focusX="50%"
          focusY="35%"
        />
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 border border-purple-400/50 text-[10px] font-mono text-purple-200">
          NOW ✨
        </div>

        {/* Left / THEN Image (Clipped by sliderPos) */}
        <div 
          className="absolute inset-0 overflow-hidden border-r-2 border-amber-400"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="w-64 h-80 sm:w-72 sm:h-96 relative">
            <SafeImage
              src={thenSrc}
              alt="Then Sumantha"
              className="w-full h-full object-cover"
              focusX="50%"
              focusY="35%"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 border border-amber-400/50 text-[10px] font-mono text-amber-300">
              THEN ⏳
            </div>
          </div>
        </div>

        {/* Divider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-amber-400 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg font-bold text-xs">
            ⇄
          </div>
        </div>
      </div>

      {/* Drag Slider Control */}
      <div className="w-64 sm:w-72 mx-auto mb-6">
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={handleSlider}
          className="w-full accent-amber-400 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
          <span>← SLIDE FOR THEN</span>
          <span>SLIDE FOR NOW →</span>
        </div>
      </div>

      <p className="text-xs text-slate-400 italic mb-6">
        "Height pathi comment panna vendam... Enakku life important 😭😂"
      </p>

      {onNext && (
        <button
          onClick={onNext}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center space-x-2"
        >
          <span>Continue to Timeline</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
