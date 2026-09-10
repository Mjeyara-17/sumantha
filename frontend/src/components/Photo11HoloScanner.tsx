import React, { useState, useEffect } from 'react';
import { Scan, ArrowRight, ShieldCheck, Lock, Heart, Flame } from 'lucide-react';
import SafeImage from './SafeImage';
import { sounds } from '../utils/soundEffects';

interface Photo11HoloScannerProps {
  photoSrc: string;
  onComplete?: () => void;
  onNext?: () => void;
}

export default function Photo11HoloScanner({
  photoSrc,
  onComplete,
  onNext
}: Photo11HoloScannerProps) {
  const [scanProgress, setScanProgress] = useState(0);
  const [scanFinished, setScanFinished] = useState(false);

  useEffect(() => {
    sounds.playSparkle();
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanFinished(true);
          sounds.playCelebrate();
          if (onComplete) onComplete();
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const traits = [
    { label: "Tamil Ponnu", value: "✅ APPROVED", color: "text-emerald-400" },
    { label: "Foodie Spirit", value: "✅ VERIFIED", color: "text-emerald-400" },
    { label: "Cake & Dessert Devotee", value: "✅ 100%", color: "text-pink-300" },
    { label: "BTS Department", value: "💜 BORAHAE", color: "text-purple-300" },
    { label: "Korean Interest Level", value: "⚠️ DANGEROUS", color: "text-amber-400 font-bold" },
    { label: "Official Height", value: "🔒 ACCESS DENIED 😂", color: "text-rose-400 font-bold flex items-center space-x-1" },
    { label: "Cuteness Quotient", value: "MAXIMUM ❤️", color: "text-pink-400 font-bold" },
    { label: "Daily Chaos Level", value: "999% 🔥", color: "text-amber-300 font-bold" }
  ];

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-950/95 backdrop-blur-2xl border-2 border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.2)] text-center text-white">
      {/* Header */}
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-mono mb-4">
        <Scan className="w-4 h-4 text-cyan-400 animate-spin-slow" />
        <span>HOLOGRAPHIC SCANNER • PHOTO 11</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-purple-300 mb-2">
        ANALYSING SUMANTHA...
      </h3>
      <p className="text-xs text-slate-400 mb-6 font-mono">
        Quantum biometric profile matching in progress [{scanProgress}%]
      </p>

      {/* Scanner Photo with Laser Line */}
      <div className="relative w-64 h-72 sm:w-72 sm:h-80 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-cyan-500/50 bg-black shadow-2xl">
        <SafeImage
          src={photoSrc}
          alt="Scanner Sumantha"
          className="w-full h-full object-cover"
          focusX="50%"
          focusY="35%"
        />

        {/* Laser Scanning Line */}
        {!scanFinished && (
          <div 
            className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee] transition-all duration-100 ease-linear pointer-events-none"
            style={{ top: `${scanProgress}%` }}
          />
        )}

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d415_1px,transparent_1px),linear-gradient(to_bottom,#06b6d415_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      </div>

      {/* Holographic Diagnostic Output */}
      <div className="bg-slate-900/80 border border-cyan-500/20 rounded-2xl p-4 mb-6 text-left space-y-2">
        {traits.map((t, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-300 font-mono">{t.label}:</span>
            <span className={`font-mono ${t.color}`}>{t.value}</span>
          </div>
        ))}
      </div>

      {scanFinished && (
        <div className="p-3 bg-cyan-950/60 rounded-xl border border-cyan-400/30 text-xs text-cyan-200 mb-4 animate-fade-in">
          ⚠️ System Overheating... Reason: too much data & cuteness overload 😂
        </div>
      )}

      {scanFinished && onNext && (
        <button
          onClick={onNext}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/30 transition-all flex items-center justify-center space-x-2 animate-fade-in"
        >
          <span>Proceed to K-Match Scanner</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
