import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import SafeImage from './SafeImage';
import confetti from 'canvas-confetti';

interface Photo06EmojiChallengeProps {
  photoSrc: string;
  onComplete: () => void;
  onNext?: () => void;
}

export default function Photo06EmojiChallenge({
  photoSrc,
  onComplete,
  onNext
}: Photo06EmojiChallengeProps) {
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [animatingBurst, setAnimatingBurst] = useState(false);

  const emojis = ['🍦', '📱', '😂', '🌙'];
  const options = [
    "Midnight ice cream run & non-stop gossip 🍦",
    "Watching K-drama till 3 AM 🌙",
    "Sending 50 memes without context 📱",
    "Debating life choices with snacks 🍜"
  ];
  const correctIndex = 0;

  const handleSelect = (idx: number) => {
    setSelectedOpt(idx);
    setAnimatingBurst(true);
    sounds.playCelebrate();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setRevealed(true);
      setAnimatingBurst(false);
      onComplete();
    }, 700);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900/90 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-center text-white">
      {/* Badge */}
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-mono mb-4">
        <span>PHOTO 06 • EMOJI CODE MEMORY</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-300 to-purple-300 mb-2">
        Emoji Code Memory 🧩
      </h3>
      <p className="text-xs sm:text-sm text-slate-300 mb-6">
        Indha memory enna nu kandupidikka mudiyuma? 👀
      </p>

      {/* Emoji Stage or Materialized Photo */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-xl bg-purple-950/40 flex items-center justify-center">
        {!revealed ? (
          <div className="flex items-center space-x-3 sm:space-x-4 p-4">
            {emojis.map((em, i) => (
              <span
                key={i}
                className={`text-3xl sm:text-4xl filter drop-shadow-lg transition-transform duration-500 ${
                  animatingBurst 
                    ? 'scale-150 -translate-y-8 opacity-0' 
                    : 'animate-bounce'
                }`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {em}
              </span>
            ))}
          </div>
        ) : (
          <div className="w-full h-full animate-fade-in relative">
            <SafeImage
              src={photoSrc}
              alt="Materialized Photo 06"
              className="w-full h-full object-cover"
              focusX="50%"
              focusY="35%"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-purple-900/80 text-[10px] font-mono text-purple-200 border border-purple-400/30">
              EVIDENCE FOUND 📸
            </span>
          </div>
        )}
      </div>

      {/* Options */}
      {!revealed ? (
        <div className="space-y-2.5 mb-6 text-left">
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className="w-full p-3.5 rounded-2xl text-xs sm:text-sm font-medium bg-slate-800/60 hover:bg-purple-900/40 border border-purple-500/20 hover:border-purple-400/50 text-slate-200 hover:scale-[1.01] transition-all flex items-center justify-between"
            >
              <span>{opt}</span>
              <Sparkles className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-400/30 text-center">
            <p className="text-sm font-semibold text-amber-300 mb-1">
              Correct-ah irundhalum seri... Wrong-ah irundhalum seri...
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Evidence inga irukku madam 😂 The legendary night of endless laughing!
            </p>
          </div>

          {onNext && (
            <button
              onClick={onNext}
              className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-500/30 transition-all flex items-center justify-center space-x-2"
            >
              <span>Continue Memory Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
