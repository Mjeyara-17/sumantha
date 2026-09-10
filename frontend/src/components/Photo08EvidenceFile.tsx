import React, { useState } from 'react';
import { ShieldAlert, ArrowRight, Eye, Ban } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import SafeImage from './SafeImage';

interface Photo08EvidenceFileProps {
  photoSrc: string;
  onComplete: () => void;
  onNext?: () => void;
}

export default function Photo08EvidenceFile({
  photoSrc,
  onComplete,
  onNext
}: Photo08EvidenceFileProps) {
  const [stage, setStage] = useState<'INITIAL' | 'VIEWED' | 'EXPLAINED'>('INITIAL');

  const handleViewEvidence = () => {
    sounds.playUnlock();
    setStage('VIEWED');
    onComplete();
  };

  const handleExplain = () => {
    sounds.playUnlock();
    setStage('EXPLAINED');
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-950/95 backdrop-blur-2xl border-2 border-rose-500/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(244,63,94,0.25)] text-center text-white">
      {/* Evidence Badge */}
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono mb-4 animate-pulse">
        <ShieldAlert className="w-4 h-4 text-rose-400" />
        <span>CLASSIFIED EVIDENCE • FILE #008</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-mono font-bold text-rose-400 mb-2">
        🚨 EVIDENCE DOSSIER #008
      </h3>
      <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
        Nee appadi pannala nu sollalam...<br />
        <span className="text-rose-300 font-semibold">But unfortunately... Evidence irukku madam 😂</span>
      </p>

      {/* Evidence Photo Frame */}
      <div className="relative w-64 h-72 sm:w-72 sm:h-80 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-rose-500/40 bg-black shadow-2xl flex items-center justify-center">
        {stage === 'INITIAL' ? (
          <div className="flex flex-col items-center justify-center p-6 space-y-3">
            <span className="text-5xl animate-bounce">📁</span>
            <span className="text-xs font-mono text-rose-300 tracking-wider">
              CONFIDENTIAL CLASSIFIED FILE
            </span>
            <span className="text-[10px] text-slate-400">RESTRICTED ACCESS</span>
          </div>
        ) : (
          <div className="relative w-full h-full animate-fade-in">
            <SafeImage
              src={photoSrc}
              alt="Evidence Photo 08"
              className="w-full h-full object-cover"
              focusX="50%"
              focusY="35%"
            />

            {/* CAUGHT IN 4K Stamp */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 -rotate-12 border-4 border-rose-500 bg-rose-950/80 px-4 py-1.5 rounded-lg shadow-xl animate-bounce">
              <span className="text-base sm:text-lg font-black font-mono tracking-widest text-rose-300">
                CAUGHT IN 4K 😂
              </span>
            </div>

            {/* REJECTED Stamp */}
            {stage === 'EXPLAINED' && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rotate-6 border-4 border-amber-400 bg-black/90 px-4 py-2 rounded-xl shadow-2xl animate-fade-in">
                <span className="text-sm sm:text-base font-black font-mono tracking-wider text-amber-300 flex items-center space-x-1.5">
                  <Ban className="w-5 h-5 text-rose-500" />
                  <span>EXPLANATION REJECTED ❌</span>
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {stage === 'INITIAL' && (
        <button
          onClick={handleViewEvidence}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-bold text-sm shadow-lg shadow-rose-600/40 transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>VIEW EVIDENCE</span>
        </button>
      )}

      {stage === 'VIEWED' && (
        <div className="space-y-3 animate-fade-in">
          <p className="text-xs font-mono text-slate-300">Explain this madam 👀</p>
          <button
            onClick={handleExplain}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-sm shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center space-x-2"
          >
            <span>I CAN EXPLAIN 😭</span>
          </button>
        </div>
      )}

      {stage === 'EXPLAINED' && onNext && (
        <button
          onClick={onNext}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center space-x-2 animate-fade-in"
        >
          <span>Next Memory File</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
