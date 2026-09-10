import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Wind } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface MakeAWishModalProps {
  onWishBlown: () => void;
}

export default function MakeAWishModal({ onWishBlown }: MakeAWishModalProps) {
  const [stage, setStage] = useState<'INTRO' | 'COUNTDOWN' | 'WISH_QUESTION' | 'BLACKOUT'>('INTRO');
  const [countdownNum, setCountdownNum] = useState(3);

  // Intro step transition
  useEffect(() => {
    sounds.playSparkle();
    const t = setTimeout(() => {
      setStage('COUNTDOWN');
    }, 2000);

    return () => clearTimeout(t);
  }, []);

  // Countdown: 3... 2... 1...
  useEffect(() => {
    if (stage === 'COUNTDOWN') {
      if (countdownNum > 1) {
        const t = setTimeout(() => {
          setCountdownNum(n => n - 1);
          sounds.playClick();
        }, 1100);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setStage('WISH_QUESTION');
          sounds.playSparkle();
        }, 1100);
        return () => clearTimeout(t);
      }
    }
  }, [stage, countdownNum]);

  const handleBlowCandles = () => {
    sounds.playWind();
    setStage('BLACKOUT');

    // 1.8 seconds blackout before triggering finale
    setTimeout(() => {
      onWishBlown();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl select-none animate-fade-in font-sans">
      {stage === 'BLACKOUT' ? (
        // Complete darkness for 1.8 seconds
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center animate-fade-in">
          <span className="text-slate-600 text-xs font-mono tracking-widest uppercase animate-pulse">
            ✦ Making your wish come true... ✦
          </span>
        </div>
      ) : (
        <div className="max-w-md w-full bg-slate-950/95 border-2 border-amber-400/40 rounded-3xl p-6 sm:p-10 shadow-2xl text-center text-white animate-scale-up">
          
          {stage === 'INTRO' && (
            <div className="space-y-4 py-4 animate-fade-in">
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/30">
                FINAL CEREMONY • CANDLE PROTOCOL
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-black text-amber-300">
                Okay Sumantha...
              </h2>
              <p className="text-sm sm:text-base text-slate-200">
                One last thing. ❤️
              </p>
            </div>
          )}

          {stage === 'COUNTDOWN' && (
            <div className="space-y-6 py-6 animate-fade-in">
              <span className="text-xs font-mono tracking-widest text-pink-400 uppercase">
                PREPARE YOUR MIND & HEART
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-pink-300">
                CLOSE YOUR EYES ❤️
              </h2>
              <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/20 border-2 border-amber-400/60 flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.4)]">
                <span className="font-display font-black text-4xl text-amber-300">
                  {countdownNum}
                </span>
              </div>
              <p className="text-xs text-slate-400 italic">
                Think about your dream wish for this new year...
              </p>
            </div>
          )}

          {stage === 'WISH_QUESTION' && (
            <div className="space-y-6 py-4 animate-scale-up">
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/30">
                CEREMONIAL BLOWOUT
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-amber-300 leading-snug">
                Wish pannitiya? 👀
              </h2>
              <p className="text-xs text-slate-300">
                Blow the candles to seal your wish into the stars!
              </p>

              <button
                onClick={handleBlowCandles}
                className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950 font-black text-base shadow-xl shadow-amber-500/40 transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02]"
              >
                <Wind className="w-5 h-5 text-slate-950 animate-pulse" />
                <span>YES ❤️ (BLOW CANDLES)</span>
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
