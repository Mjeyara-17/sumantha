import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import SafeImage from './SafeImage';

interface Photo05DetectiveGuessProps {
  photoSrc: string;
  onComplete: () => void;
  onNext?: () => void;
}

export default function Photo05DetectiveGuess({
  photoSrc,
  onComplete,
  onNext
}: Photo05DetectiveGuessProps) {
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const correctIndex = 1; // 2 seconds before bursting into laughter 😂

  const options = [
    "Full serious photoshoot mode 📸",
    "2 seconds before bursting into laughter 😂",
    "Thinking about what snack to eat next 🍰",
    "Planning how to win an argument 😌"
  ];

  const handleSelect = (idx: number) => {
    setSelectedOpt(idx);
    setRevealed(true);
    if (idx === correctIndex) {
      sounds.playCelebrate();
    } else {
      sounds.playUnlock();
    }
    onComplete();
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900/90 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-center text-white">
      {/* Badge */}
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-mono mb-4">
        <span>PHOTO 05 • DETECTIVE CHALLENGE</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-300 to-purple-300 mb-2">
        Okay detective madam 🕵️‍♀️
      </h3>
      <p className="text-xs sm:text-sm text-slate-300 mb-6">
        Indha photo enga / eppo eduthom nu nyabagam irukka? 👀
      </p>

      {/* Cropped vs Full Photo */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-xl bg-black">
        <SafeImage
          src={photoSrc}
          alt="Detective Photo 05"
          className={`w-full h-full transition-all duration-1000 ${
            revealed 
              ? 'scale-100 object-cover' 
              : 'scale-[2.2] object-cover origin-top-right filter blur-[1px]'
          }`}
          focusX="50%"
          focusY="30%"
        />

        {!revealed && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/50 text-[10px] font-mono text-amber-300">
            🔍 CROPPED EVIDENCE
          </div>
        )}
      </div>

      {/* Multiple Choice Options */}
      <div className="space-y-2.5 mb-6 text-left">
        {options.map((opt, idx) => {
          const isSelected = selectedOpt === idx;
          const isCorrect = idx === correctIndex;

          return (
            <button
              key={idx}
              disabled={revealed}
              onClick={() => handleSelect(idx)}
              className={`w-full p-3.5 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-between border ${
                revealed
                  ? isCorrect
                    ? 'bg-emerald-950/60 border-emerald-400/80 text-emerald-200 shadow-md'
                    : isSelected
                      ? 'bg-rose-950/60 border-rose-400/80 text-rose-200'
                      : 'bg-slate-900/40 border-slate-700/40 text-slate-400 opacity-60'
                  : 'bg-slate-800/60 hover:bg-purple-900/40 border-purple-500/20 hover:border-purple-400/50 text-slate-200 hover:scale-[1.01]'
              }`}
            >
              <span>{opt}</span>
              {revealed && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              {revealed && isSelected && !isCorrect && <AlertCircle className="w-4 h-4 text-rose-400" />}
            </button>
          );
        })}
      </div>

      {/* Reveal Feedback */}
      {revealed && (
        <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-400/30 animate-fade-in text-center mb-4">
          <p className="text-sm font-semibold text-amber-300 mb-1">
            {selectedOpt === correctIndex ? "YESSS 😂👏 Detective level 100!" : "Hmmm... memory konjam weak pola 😂"}
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            That time when we tried to take one normal serious photo, but laughing was strictly mandatory!
          </p>
        </div>
      )}

      {revealed && onNext && (
        <button
          onClick={onNext}
          className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-500/30 transition-all flex items-center justify-center space-x-2"
        >
          <span>Next Memory Challenge</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
