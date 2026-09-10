import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface FakeSeriousQuestionProps {
  onComplete: () => void;
}

export default function FakeSeriousQuestion({ onComplete }: FakeSeriousQuestionProps) {
  const [stage, setStage] = useState<'dramatic-warning' | 'question' | 'result'>('dramatic-warning');
  const [timeLeft, setTimeLeft] = useState(5);
  const [chosenOption, setChosenOption] = useState<string | null>(null);

  // Phase 1: Dramatic alarm and tension
  useEffect(() => {
    sounds.playAlarm();
    const timer = setTimeout(() => {
      setStage('question');
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  // 5-second countdown timer during question phase
  useEffect(() => {
    if (stage === 'question') {
      if (timeLeft > 0) {
        const t = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearTimeout(t);
      } else {
        // Time ran out!
        handleSelect('TIMEOUT');
      }
    }
  }, [stage, timeLeft]);

  const handleSelect = (option: string) => {
    setChosenOption(option);
    sounds.playClick();
    setStage('result');
  };

  return (
    <div className="my-auto pointer-events-auto w-full max-w-md bg-[#120509]/90 border border-rose-500/40 p-6 sm:p-8 rounded-2xl shadow-[0_0_50px_rgba(244,63,94,0.3)] backdrop-blur-xl animate-scale-up text-center">
      {stage === 'dramatic-warning' && (
        <div className="flex flex-col items-center animate-pulse">
          <div className="w-16 h-16 rounded-full bg-rose-600/20 border border-rose-500/50 flex items-center justify-center mb-4 text-rose-500">
            <AlertTriangle className="w-8 h-8 animate-bounce" />
          </div>

          <h3 className="font-display text-rose-400 text-lg font-black tracking-widest uppercase mb-2">
            ⚠️ IMPORTANT QUESTION
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm font-light tracking-wider leading-relaxed">
            Please answer carefully. <br />
            <strong className="text-white font-semibold">Your future depends on this.</strong>
          </p>
        </div>
      )}

      {stage === 'question' && (
        <div className="flex flex-col items-center animate-fade-in">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-mono tracking-widest uppercase mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>TIME REMAINING: {timeLeft}s</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-widest uppercase mb-6">
            CAKE OR ICE CREAM?
          </h2>

          <div className="grid grid-cols-2 gap-4 w-full mb-4">
            <button
              onClick={() => handleSelect('CAKE')}
              className="py-4 px-4 bg-white/[0.04] hover:bg-rose-500/20 border border-white/10 hover:border-rose-500 rounded-xl text-white font-display text-base font-bold tracking-wider transition-all hover:scale-105"
            >
              🍰 CAKE
            </button>
            <button
              onClick={() => handleSelect('ICE_CREAM')}
              className="py-4 px-4 bg-white/[0.04] hover:bg-rose-500/20 border border-white/10 hover:border-rose-500 rounded-xl text-white font-display text-base font-bold tracking-wider transition-all hover:scale-105"
            >
              🍦 ICE CREAM
            </button>
          </div>

          <p className="text-[11px] text-slate-400 italic">
            Pick fast... clock is ticking! ⏳
          </p>
        </div>
      )}

      {stage === 'result' && (
        <div className="flex flex-col items-center animate-scale-up">
          {chosenOption === 'TIMEOUT' ? (
            <p className="text-rose-400 font-display text-base sm:text-lg font-bold tracking-wide mb-3">
              Adei idhukku kooda ivlo yosikkiriya 😭😂
            </p>
          ) : (
            <div className="flex flex-col items-center mb-3">
              <span className="text-rose-500 text-xs font-mono tracking-widest uppercase mb-1">
                SYSTEM VERDICT:
              </span>
              <h3 className="font-display text-rose-400 text-xl font-black tracking-widest">
                INCORRECT. ❌
              </h3>
            </div>
          )}

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 w-full mb-6">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
              The Only Acceptable Solution:
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-amber-400 tracking-widest">
              BOTH 😌🍰🍦
            </h2>
            <p className="text-slate-300 text-xs font-light mt-1">
              Cake + Ice Cream = Universal Happiness Law.
            </p>
          </div>

          <button
            onClick={onComplete}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs tracking-widest rounded-xl uppercase transition-all shadow-lg hover:scale-[1.01]"
          >
            Obviously! Continue →
          </button>
        </div>
      )}
    </div>
  );
}
