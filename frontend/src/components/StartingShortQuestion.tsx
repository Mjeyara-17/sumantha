import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Trophy, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface StartingShortQuestionProps {
  onComplete: () => void;
}

export default function StartingShortQuestion({ onComplete }: StartingShortQuestionProps) {
  const [phase, setPhase] = useState<'INTRO' | 'QUESTION' | 'FALLBACK_ERROR' | 'ACCEPTED' | 'SCANNER'>('INTRO');
  const [introStep, setIntroStep] = useState(0);
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intro text sequence
  useEffect(() => {
    const t1 = setTimeout(() => setIntroStep(1), 700);
    const t2 = setTimeout(() => setIntroStep(2), 2000);
    const t3 = setTimeout(() => {
      setIntroStep(3);
      setPhase('QUESTION');
      sounds.playSparkle();
    }, 3400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Runaway NO button logic (safe within container bounding box)
  const moveNoButton = () => {
    sounds.playClick();
    setNoAttempts((prev) => prev + 1);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Keep within safe inner margins
      const maxX = Math.max(100, (rect.width / 2) - 90);
      const maxY = Math.max(80, (rect.height / 2) - 80);

      // Random offset ensuring it jumps far enough
      const signX = Math.random() > 0.5 ? 1 : -1;
      const signY = Math.random() > 0.5 ? 1 : -1;
      const newX = (Math.random() * (maxX - 40) + 40) * signX;
      const newY = (Math.random() * (maxY - 30) + 30) * signY;

      setNoPosition({ x: newX, y: newY });
    } else {
      // Fallback relative jump
      const angles = [45, 135, 225, 315, 90, 270];
      const angle = (angles[noAttempts % angles.length] * Math.PI) / 180;
      const dist = 120 + Math.random() * 60;
      setNoPosition({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist
      });
    }
  };

  // Runaway reaction messages
  const getReactionText = () => {
    if (noAttempts === 1) return "👀";
    if (noAttempts === 2) return "Adei 😂";
    if (noAttempts === 3) return "Still trying ah? 😭";
    if (noAttempts === 4) return "NO press panna mudiyadhu madam 😌";
    if (noAttempts === 5) return "Accept the truth 😂";
    if (noAttempts >= 6) return "⚠️ SYSTEM HAS DISABLED THIS OPTION.";
    return "";
  };

  // Fallback if NO is clicked somehow
  const handleNoClickFallback = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sounds.playAlarm();
    setPhase('FALLBACK_ERROR');
    setTimeout(() => {
      setPhase('QUESTION');
      moveNoButton();
    }, 1800);
  };

  // When YES is clicked
  const handleYesClick = () => {
    sounds.playCelebrate();
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 }
    });
    setPhase('ACCEPTED');
  };

  // Scales based on attempts
  const yesScale = Math.min(1 + noAttempts * 0.08, 1.45);
  const noScale = Math.max(1 - noAttempts * 0.05, 0.75);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030108] text-white select-none overflow-hidden animate-fade-in font-sans">
      {/* Deep space radial aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(88,28,135,0.45)_0%,rgba(3,1,8,0.95)_100%)] pointer-events-none" />
      <div className="absolute top-[20%] left-[20%] w-72 h-72 rounded-full bg-purple-600/20 blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[20%] right-[20%] w-72 h-72 rounded-full bg-pink-600/20 blur-[100px] pointer-events-none animate-pulse" />

      {/* Main Container */}
      <div 
        ref={containerRef}
        className="relative max-w-lg w-full min-h-[460px] bg-slate-950/85 backdrop-blur-2xl border-2 border-purple-500/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_60px_rgba(168,85,247,0.25)] flex flex-col justify-between items-center text-center"
      >
        {/* Top Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-mono mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
          <span>MANDATORY PROTOCOL • QUESTION 0</span>
        </div>

        {/* 1. INTRO SEQUENCE */}
        {phase === 'INTRO' && (
          <div className="my-auto space-y-4 py-8 animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-300 to-purple-200">
              Okay Sumantha...
            </h2>
            {introStep >= 1 && (
              <p className="text-sm sm:text-base text-slate-300 animate-fade-in">
                Surprise start panna munnadi...
              </p>
            )}
            {introStep >= 2 && (
              <p className="text-sm sm:text-base text-amber-300 font-semibold animate-fade-in">
                Oru very important question irukku 👀
              </p>
            )}
          </div>
        )}

        {/* 2. MAIN QUESTION WITH RUNAWAY NO BUTTON */}
        {phase === 'QUESTION' && (
          <div className="my-auto w-full flex flex-col items-center animate-fade-in py-4">
            <span className="text-xs font-mono text-slate-400 mb-2">VERY SERIOUS QUESTION:</span>
            <h1 className="text-3xl sm:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-purple-300 mb-6 tracking-wide drop-shadow-lg">
              I'M SHORT? 🤨
            </h1>

            {/* Reaction Text Banner */}
            {noAttempts > 0 && (
              <div className="h-8 mb-4 flex items-center justify-center animate-fade-in">
                <span className="text-xs sm:text-sm font-mono font-bold text-amber-300 bg-amber-950/60 px-4 py-1 rounded-full border border-amber-500/40 shadow-md">
                  {getReactionText()}
                </span>
              </div>
            )}

            {/* Interactive Button Arena */}
            <div className="relative w-full h-36 flex items-center justify-center">
              {/* YES BUTTON (Grows larger with attempts) */}
              <button
                onClick={handleYesClick}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-base shadow-xl shadow-emerald-600/30 transition-all duration-300 transform active:scale-95 z-10"
                style={{
                  transform: `scale(${yesScale})`
                }}
              >
                YES 😂
              </button>

              {/* RUNAWAY NO BUTTON */}
              <div
                className="absolute z-20 transition-all duration-200 ease-out"
                style={{
                  transform: noPosition 
                    ? `translate(${noPosition.x}px, ${noPosition.y}px) scale(${noScale})`
                    : `translate(90px, 0px) scale(${noScale})`
                }}
                onMouseEnter={moveNoButton}
                onMouseMove={moveNoButton}
                onTouchStart={(e) => {
                  moveNoButton();
                  e.preventDefault();
                }}
              >
                <button
                  onClick={handleNoClickFallback}
                  className="px-7 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 border-2 border-rose-500/60 text-rose-300 font-bold text-sm shadow-lg backdrop-blur-md cursor-not-allowed select-none"
                >
                  NO 😌
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 font-mono mt-2">
              (Choose carefully madam, system is recording 😂)
            </p>
          </div>
        )}

        {/* 3. SAFETY ERROR 404 FALLBACK */}
        {phase === 'FALLBACK_ERROR' && (
          <div className="my-auto space-y-3 py-6 animate-fade-in text-rose-400">
            <ShieldAlert className="w-12 h-12 mx-auto text-rose-500 animate-bounce" />
            <h3 className="text-xl font-mono font-bold">ERROR 404</h3>
            <p className="text-sm font-semibold">Wrong answer not supported 😂</p>
            <p className="text-xs text-slate-400">Recalibrating self-awareness...</p>
          </div>
        )}

        {/* 4. YES ACCEPTED SCREEN */}
        {phase === 'ACCEPTED' && (
          <div className="my-auto space-y-4 py-4 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-pink-400">
              FINALLY 😭😂
            </h2>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/40 rounded-full text-emerald-300 text-xs font-mono">
              <CheckCircle2 className="w-4 h-4" />
              <span>Self awareness level: 100% ✅</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-1">
              <p>Okay okay... Height pathi inime pesa maaten...</p>
              <p className="text-amber-300 font-bold text-sm sm:text-base pt-1">Probably 😂</p>
            </div>

            {/* Achievement Unlocked Badge */}
            <div className="p-4 bg-gradient-to-r from-purple-950/80 to-amber-950/60 rounded-2xl border-2 border-amber-400/50 shadow-xl flex items-center space-x-3 text-left">
              <div className="p-3 bg-amber-400/20 rounded-xl border border-amber-400/40 text-2xl">
                🏆
              </div>
              <div>
                <div className="text-[10px] font-mono text-amber-300 uppercase tracking-wider">
                  ACHIEVEMENT UNLOCKED
                </div>
                <div className="text-sm font-bold font-display text-white">
                  CERTIFIED SHORT QUEEN
                </div>
                <div className="text-[11px] text-slate-300">
                  Congratulations madam 😂
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playSparkle();
                setPhase('SCANNER');
              }}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <span>View Official Biometric Result</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 5. QUICK HEIGHT SCANNER */}
        {phase === 'SCANNER' && (
          <div className="my-auto w-full space-y-4 py-4 animate-fade-in">
            <h3 className="text-xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
              OFFICIAL BIOMETRIC REPORT
            </h3>

            <div className="bg-slate-900/80 border border-purple-500/30 rounded-2xl p-4 text-left space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>HEIGHT:</span>
                  <span className="text-amber-300 font-bold">CLASSIFIED 🤫</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-amber-400 h-full w-[60%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>CUTENESS:</span>
                  <span className="text-pink-400 font-bold">MAXIMUM ❤️</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-pink-500 h-full w-[100%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>ATTITUDE:</span>
                  <span className="text-rose-400 font-bold">DANGEROUS 😂</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-rose-500 h-full w-[100%]" />
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 italic">
              "System result save panniduchu 👀"
            </p>

            <button
              onClick={() => {
                sounds.playCelebrate();
                onComplete();
              }}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-500/40 transition-all flex items-center justify-center space-x-2 animate-bounce"
            >
              <span>ENTER OUR LITTLE UNIVERSE →</span>
            </button>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-[10px] text-slate-500 font-mono mt-2">
          SUMANTHA SPECIAL EDITION • SEPTEMBER 11
        </div>
      </div>
    </div>
  );
}
