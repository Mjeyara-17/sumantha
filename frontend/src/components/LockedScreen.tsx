import React, { useState, useEffect } from 'react';
import { Lock, Sparkles, AlertCircle } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { CountdownState } from '../hooks/useBirthdayCountdown';
import { formatBirthdayDisplay } from '../utils/timezone';
import { sounds } from '../utils/soundEffects';

interface LockedScreenProps {
  countdown: CountdownState;
  onBypass: () => void;
  onUnlock?: () => void;
}

export default function LockedScreen({ countdown, onBypass, onUnlock }: LockedScreenProps) {
  const padZero = (num: number) => num.toString().padStart(2, '0');
  const [introStep, setIntroStep] = useState(0);

  // Staggered cinematic text sequence
  useEffect(() => {
    const t1 = setTimeout(() => setIntroStep(1), 800);
    const t2 = setTimeout(() => setIntroStep(2), 2200);
    const t3 = setTimeout(() => setIntroStep(3), 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const birthdayDisplay = formatBirthdayDisplay(
    birthdayConfig.birthdayYear,
    birthdayConfig.birthdayMonth,
    birthdayConfig.birthdayDay
  );

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center bg-[#050308] text-[#f8fafc] px-6 py-10 select-none overflow-hidden font-sans">
      {/* Deep space radial background with atmospheric nebulas */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,14,50,0.65)_0%,rgba(5,3,8,1)_100%)] pointer-events-none" />
      <div className="absolute top-[15%] left-[15%] w-[40vw] h-[40vw] rounded-full bg-purple-900/15 blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[15%] right-[15%] w-[40vw] h-[40vw] rounded-full bg-pink-900/15 blur-[140px] pointer-events-none animate-pulse" />

      {/* TOP: Header HUD */}
      <div className="relative z-10 w-full max-w-5xl flex justify-between items-center">
        <div className="flex items-center gap-2 border border-white/10 bg-white/[0.03] backdrop-blur-md px-4 py-2 rounded-full text-xs tracking-[0.2em] text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>SUMANTHA'S LITTLE UNIVERSE</span>
        </div>
        <div className="text-xs text-slate-400 bg-white/[0.02] px-4 py-2 rounded-full border border-white/10">
          Timezone: <span className="text-amber-400 font-semibold">{birthdayConfig.timezone}</span>
        </div>
      </div>

      {/* CENTER: Vault Card & Teasing Story */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto max-w-2xl animate-fade-in">
        {/* Glowing lock badge */}
        <div className="relative flex justify-center items-center w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-amber-400/30 bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(245,158,11,0.2)] mb-6 animate-pulse">
          <div className="absolute inset-0 rounded-full bg-amber-500/15 blur-lg" />
          <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
        </div>

        {/* Dynamic Tanglish Text Reveal Sequence */}
        <div className="min-h-[90px] flex flex-col items-center justify-center mb-6">
          <h2 className="font-display text-lg sm:text-2xl tracking-[0.15em] font-semibold text-slate-200 mb-1">
            Hey {birthdayConfig.friendName}... 👀
          </h2>
          
          {introStep >= 1 && (
            <p className="text-amber-400 font-display text-base sm:text-xl tracking-wider font-bold animate-fade-in">
              Enna ivlo seekiram vandhutta? 😂
            </p>
          )}

          {introStep >= 2 && (
            <p className="text-slate-400 text-xs sm:text-sm tracking-widest font-light mt-1 animate-fade-in">
              Surprise ready... but ippo open panna mudiyathu 😌
            </p>
          )}
        </div>

        {introStep >= 3 && (
          <div className="animate-scale-up flex flex-col items-center w-full">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] sm:text-xs tracking-[0.2em] font-bold uppercase mb-6">
              <span>🔒 THIS LITTLE UNIVERSE IS LOCKED</span>
            </div>

            {/* Countdown Grid */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mb-8">
              {[
                { label: 'DAYS', val: countdown.days },
                { label: 'HOURS', val: countdown.hours },
                { label: 'MINUTES', val: countdown.minutes },
                { label: 'SECONDS', val: countdown.seconds }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center justify-center bg-white/[0.03] border border-white/10 rounded-2xl p-3 sm:p-4 w-18 sm:w-24 md:w-28 backdrop-blur-xl shadow-2xl hover:border-amber-400/40 transition-all"
                >
                  <span className="font-display font-black text-2xl sm:text-4xl text-amber-400 tracking-normal mb-1 drop-shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                    {padZero(item.val)}
                  </span>
                  <span className="text-[8px] sm:text-[10px] text-slate-400 font-semibold tracking-[0.2em]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-sm sm:text-base text-amber-300/90 font-medium tracking-wide mb-2">
              September 11 varaikkum konjam wait pannunga madam 🎂😂
            </p>
            <p className="text-xs text-slate-400 tracking-wider font-light">
              Something special is waiting for you ❤️ <br />
              <span className="text-slate-500 text-[11px] font-mono mt-1 inline-block">
                Unlocks at 00:00 ({birthdayConfig.timezone})
              </span>
            </p>
          </div>
        )}
      </div>

      {/* BOTTOM: Dev Mode Bypass & Signature */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-3 text-center">
        {birthdayConfig.testMode && (
          <button 
            onClick={() => {
              sounds.playKeyEarned();
              onBypass();
            }}
            className="flex items-center gap-2 px-5 py-2.5 border border-dashed border-amber-400/40 hover:border-amber-400 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-medium text-xs tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:scale-105"
          >
            <AlertCircle className="w-4 h-4 animate-bounce text-amber-400" />
            <span>DEV PREVIEW: BYPASS LOCK</span>
          </button>
        )}
        <div className="text-[10px] text-slate-500 tracking-[0.1em] uppercase">
          Prepared for {birthdayConfig.friendName} • Tanglish Edition • Europe/Paris
        </div>
      </div>
    </div>
  );
}
