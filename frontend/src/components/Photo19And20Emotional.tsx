import React, { useState } from 'react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import SafeImage from './SafeImage';

interface Photo19And20EmotionalProps {
  photo19Src: string;
  photo20Src: string;
  onComplete?: () => void;
  onNext?: () => void;
}

export default function Photo19And20Emotional({
  photo19Src,
  photo20Src,
  onComplete,
  onNext
}: Photo19And20EmotionalProps) {
  const [slide, setSlide] = useState<1 | 2>(1);

  const handleNextSlide = () => {
    if (slide === 1) {
      setSlide(2);
    } else {
      if (onComplete) onComplete();
      if (onNext) onNext();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-950/95 backdrop-blur-3xl border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-center text-white">
      {/* Badge */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-mono mb-4">
        <Heart className="w-3.5 h-3.5 text-pink-400" />
        <span>EMOTIONAL CHAPTER • PHOTO {slide === 1 ? '19' : '20'} OF 22</span>
      </div>

      {slide === 1 ? (
        <div className="space-y-4 animate-fade-in">
          <p className="text-xs sm:text-sm text-slate-300 italic">
            "Ivlo neram jokes pannom..."
          </p>
          <h3 className="text-lg sm:text-xl font-display font-medium text-purple-200">
            "Sometimes photos are just photos."
          </h3>

          <div className="relative w-64 h-80 sm:w-72 sm:h-96 mx-auto rounded-3xl overflow-hidden border-2 border-purple-400/40 shadow-2xl bg-black">
            <SafeImage
              src={photo19Src}
              alt="Emotional Photo 19"
              className="w-full h-full object-cover filter brightness-95"
              focusX="50%"
              focusY="35%"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          <p className="text-xs sm:text-sm text-slate-300">
            "But sometimes... they become memories. ❤️"
          </p>
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          <p className="text-xs sm:text-sm text-slate-300 italic">
            "And some people make those memories special."
          </p>
          <h3 className="text-lg sm:text-xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-purple-200">
            "Namma random talks, silly jokes, teasing..."
          </h3>

          <div className="relative w-64 h-80 sm:w-72 sm:h-96 mx-auto rounded-3xl overflow-hidden border-2 border-pink-400/50 shadow-[0_0_40px_rgba(236,72,153,0.3)] bg-black">
            <SafeImage
              src={photo20Src}
              alt="Emotional Photo 20"
              className="w-full h-full object-cover"
              focusX="50%"
              focusY="35%"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          <p className="text-xs sm:text-sm text-pink-200 font-medium leading-relaxed">
            "Later than puriyum... Idhellam than actual memories nu. ❤️"
          </p>
        </div>
      )}

      {/* Button */}
      <button
        onClick={handleNextSlide}
        className="w-full mt-6 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center space-x-2"
      >
        <span>{slide === 1 ? "Read Next Reflection" : "Open Sumantha's Personal Letter"}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
