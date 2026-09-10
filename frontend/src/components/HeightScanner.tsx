import React, { useState, useEffect } from 'react';
import { Ruler, Sparkles, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface HeightScannerProps {
  onComplete: () => void;
}

export default function HeightScanner({ onComplete }: HeightScannerProps) {
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    sounds.playScanner();
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          sounds.playKeyEarned();
          return 100;
        }
        return prev + 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-auto pointer-events-auto w-full max-w-md bg-space-card border border-pink-500/30 p-6 sm:p-8 rounded-2xl shadow-[0_0_40px_rgba(236,72,153,0.2)] backdrop-blur-xl animate-scale-up text-center">
      <div className="flex items-center justify-center gap-2 text-pink-400 text-xs font-mono tracking-widest uppercase mb-4">
        <Ruler className="w-4 h-4 animate-pulse" />
        <span>SYSTEM CALIBRATION SCAN</span>
      </div>

      <h3 className="font-display text-white text-base sm:text-lg font-bold tracking-wide mb-2">
        Wait... System needs one more measurement 👀
      </h3>
      <p className="text-slate-400 text-xs font-light tracking-wide mb-6">
        Target biometric dimensions: Sumantha
      </p>

      {/* Holographic Ruler Graphic */}
      <div className="relative w-full h-8 bg-black/60 border border-pink-500/40 rounded-xl overflow-hidden mb-6 flex items-center justify-between px-3 text-[9px] font-mono text-slate-500">
        <div 
          className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-pink-500/20 via-purple-500/30 to-amber-500/40 transition-all duration-300 border-r-2 border-pink-400"
          style={{ width: `${scanProgress}%` }}
        />
        <span className="relative z-10">4'10"</span>
        <span className="relative z-10">5'0"</span>
        <span className="relative z-10">5'2"</span>
        <span className="relative z-10">5'4"</span>
        <span className="relative z-10">TALL ENOUGH 😂</span>
      </div>

      {isScanning ? (
        <div className="py-4 text-xs text-amber-400 font-mono tracking-widest uppercase animate-pulse">
          SCANNING BIOMETRICS... {scanProgress}%
        </div>
      ) : (
        <div className="flex flex-col gap-3 text-left py-2 animate-fade-in mb-6">
          <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-3 rounded-xl">
            <span className="text-xs text-slate-400">Height:</span>
            <span className="text-xs font-bold font-mono text-amber-400">CLASSIFIED 🤫</span>
          </div>

          <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-3 rounded-xl">
            <span className="text-xs text-slate-400">Cuteness:</span>
            <span className="text-xs font-bold font-mono text-pink-400">MAXIMUM ❤️</span>
          </div>

          <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-3 rounded-xl">
            <span className="text-xs text-slate-400">Attitude:</span>
            <span className="text-xs font-bold font-mono text-purple-400">PROCESSING... ⚡</span>
          </div>

          <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-3 rounded-xl">
            <span className="text-xs text-slate-400">Food Capacity:</span>
            <span className="text-xs font-bold font-mono text-emerald-400">UNLIMITED 🍜</span>
          </div>

          <p className="text-center text-xs text-slate-300 italic mt-2">
            Okay okay... don't kill me 😂
          </p>
        </div>
      )}

      {!isScanning && (
        <button
          onClick={onComplete}
          className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs tracking-widest rounded-xl uppercase transition-all shadow-lg hover:scale-[1.01]"
        >
          Forgive & Continue 😌 →
        </button>
      )}
    </div>
  );
}
