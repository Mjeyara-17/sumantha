import React, { useState, useEffect } from 'react';
import { Globe, ArrowRight, HeartHandshake, Sparkles } from 'lucide-react';
import SafeImage from './SafeImage';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface Photo12KoreanMatchProps {
  photoSrc: string;
  onComplete?: () => void;
  onNext?: () => void;
}

export default function Photo12KoreanMatch({
  photoSrc,
  onComplete,
  onNext
}: Photo12KoreanMatchProps) {
  const [stage, setStage] = useState<'SEARCHING' | 'MATCHED'>('SEARCHING');
  const [country, setCountry] = useState('France 🇫🇷');
  const [matchPercent, setMatchPercent] = useState(25);

  useEffect(() => {
    sounds.playSparkle();

    const t1 = setTimeout(() => {
      setCountry('Sri Lanka 🇱🇰');
      setMatchPercent(48);
      sounds.playUnlock();
    }, 900);

    const t2 = setTimeout(() => {
      setCountry('Korea 🇰🇷');
      setMatchPercent(79);
      sounds.playUnlock();
    }, 1800);

    const t3 = setTimeout(() => {
      setMatchPercent(99);
    }, 2500);

    const t4 = setTimeout(() => {
      setMatchPercent(100);
      setStage('MATCHED');
      sounds.playCelebrate();
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 }
      });
      if (onComplete) onComplete();
    }, 3400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-950/95 backdrop-blur-2xl border-2 border-pink-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(236,72,153,0.25)] text-center text-white">
      {/* Badge */}
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 text-xs font-mono mb-4 animate-pulse">
        <Globe className="w-4 h-4 text-pink-400" />
        <span>GLOBAL MATRIMONIAL PROTOCOL • PHOTO 12</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-200 to-amber-300 mb-2">
        {stage === 'SEARCHING' ? "SEARCHING GLOBAL DATABASE..." : "🚨 MATCH FOUND!"}
      </h3>

      {/* Searching Status */}
      <div className="mb-4">
        <span className="text-xs font-mono text-slate-300">Target Region: </span>
        <span className="text-xs font-mono font-bold text-amber-300">{country}</span>
        <div className="w-48 mx-auto mt-2 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
          <div 
            className="bg-gradient-to-r from-pink-500 to-rose-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${matchPercent}%` }}
          />
        </div>
      </div>

      {/* Sumantha Profile Card */}
      <div className="relative w-64 h-72 sm:w-72 sm:h-80 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-pink-500/50 bg-black shadow-2xl">
        <SafeImage
          src={photoSrc}
          alt="Sumantha Profile"
          className="w-full h-full object-cover"
          focusX="50%"
          focusY="30%"
        />

        {stage === 'MATCHED' && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 animate-fade-in">
            <span className="text-xs font-mono text-pink-300 font-bold">KOREAN COMPATIBILITY: 100% 🇰🇷</span>
          </div>
        )}
      </div>

      {/* Match Result Banner */}
      {stage === 'MATCHED' && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-4 bg-gradient-to-r from-pink-950/80 to-purple-950/80 rounded-2xl border border-pink-500/40">
            <p className="text-xs text-slate-300 mb-1">Wait... System-la oru important result vandhirukku 👀</p>
            <h4 className="text-base sm:text-lg font-black text-amber-300 leading-snug">
              UNAKKU KOREAN MAPPILLAI KIDAICHITTU 😭🇰🇷
            </h4>
          </div>

          {onNext && (
            <button
              onClick={onNext}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-pink-600/30 transition-all flex items-center justify-center space-x-2"
            >
              <span>ACCESS 2030 FUTURE WEDDING TIMELINE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
