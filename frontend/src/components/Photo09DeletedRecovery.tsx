import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, ArrowRight, Trash2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import SafeImage from './SafeImage';

interface Photo09DeletedRecoveryProps {
  photoSrc: string;
  onComplete: () => void;
  onNext?: () => void;
}

export default function Photo09DeletedRecovery({
  photoSrc,
  onComplete,
  onNext
}: Photo09DeletedRecoveryProps) {
  const [status, setStatus] = useState<'IDLE' | 'RECOVERING' | 'STALLED_99' | 'COMPLETED'>('IDLE');
  const [progress, setProgress] = useState(0);

  const startRecovery = () => {
    setStatus('RECOVERING');
    sounds.playSparkle();

    const sequence = [
      { val: 10, delay: 300 },
      { val: 29, delay: 600 },
      { val: 48, delay: 1000 },
      { val: 71, delay: 1400 },
      { val: 93, delay: 1800 },
      { val: 99, delay: 2200 }
    ];

    sequence.forEach(({ val, delay }) => {
      setTimeout(() => {
        setProgress(val);
        sounds.playUnlock();
        if (val === 99) {
          setStatus('STALLED_99');
          // Stall dramatically for 2 seconds
          setTimeout(() => {
            setProgress(100);
            setStatus('COMPLETED');
            sounds.playCelebrate();
            onComplete();
          }, 2000);
        }
      }, delay);
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-950/95 backdrop-blur-2xl border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center text-white font-sans">
      {/* File Header */}
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono mb-4">
        <span>MEMORY FILE #009 • RECOVERY PROTOCOL</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200 mb-2">
        {status === 'COMPLETED' ? "MEMORY RECOVERED ✅" : "STATUS: DELETED ❌"}
      </h3>
      <p className="text-xs sm:text-sm text-slate-300 mb-6">
        {status === 'COMPLETED' ? (
          <span className="text-emerald-300 font-medium">
            Unfortunately evidence successfully recovered 😂 Backups never lie!
          </span>
        ) : (
          <>
            Oops... Someone tried to delete the evidence 👀<br />
            <span className="text-amber-300">Run quantum memory restoration protocol?</span>
          </>
        )}
      </p>

      {/* Frame */}
      <div className="relative w-64 h-72 sm:w-72 sm:h-80 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-emerald-500/40 bg-black flex items-center justify-center shadow-xl">
        {status !== 'COMPLETED' ? (
          <div className="flex flex-col items-center justify-center p-6 space-y-4 w-full">
            <Trash2 className="w-12 h-12 text-rose-400 animate-pulse" />
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs font-mono text-emerald-400">
              {progress}% {status === 'STALLED_99' && "• STALLED..."}
            </div>
            {status === 'STALLED_99' && (
              <p className="text-xs text-amber-300 font-medium animate-bounce">
                Why always 99%? 😭 Wait konjam...
              </p>
            )}
          </div>
        ) : (
          <div className="relative w-full h-full animate-fade-in">
            <SafeImage
              src={photoSrc}
              alt="Recovered Photo 09"
              className="w-full h-full object-cover"
              focusX="50%"
              focusY="35%"
            />
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/60 text-[10px] font-mono text-emerald-300 shadow-md">
              100% RESTORED 💾
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      {status === 'IDLE' && (
        <button
          onClick={startRecovery}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>RECOVER MEMORY</span>
        </button>
      )}

      {status === 'COMPLETED' && onNext && (
        <button
          onClick={onNext}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center space-x-2 animate-fade-in"
        >
          <span>Continue Journey</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
