import React from 'react';
import { birthdayConfig } from '../config/birthdayConfig';
import { sounds } from '../utils/soundEffects';
import { Sparkles, X, Heart } from 'lucide-react';

interface SecretEndingModalProps {
  onClose: () => void;
}

export default function SecretEndingModal({ onClose }: SecretEndingModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-fade-in pointer-events-auto select-none">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#140b22] to-[#08040d] border border-amber-400/40 p-6 sm:p-8 rounded-3xl shadow-[0_0_60px_rgba(245,158,11,0.3)] flex flex-col items-center text-center animate-scale-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-400/40 flex items-center justify-center text-amber-400 mb-4 animate-pulse">
          <Sparkles className="w-6 h-6" />
        </div>

        <span className="text-[10px] text-amber-400 font-mono tracking-[0.25em] uppercase mb-1">
          ✦ CELESTIAL COORDINATE UNLOCKED ✦
        </span>

        <h3 className="font-display text-white text-lg sm:text-xl font-bold tracking-wider mb-6">
          YOU FOUND THE SECRET MEMORY ❤️
        </h3>

        {/* Secret Photo Slot */}
        <div className="w-full h-52 rounded-2xl bg-black/60 border border-white/10 overflow-hidden relative mb-6 shadow-2xl flex items-center justify-center">
          <img 
            src="/images/sumantha/secret-memory.jpg" 
            alt="Secret Memory"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-left">
            <span className="text-[10px] text-amber-300 font-mono">
              COORDINATE #911-S • PRIVATE ARCHIVE
            </span>
            <span className="text-white text-xs font-semibold">
              The Unforgettable Moment
            </span>
          </div>
        </div>

        {/* Message Content */}
        <div className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed tracking-wide whitespace-pre-line text-left mb-6 bg-white/[0.02] p-4 rounded-xl border border-white/5">
          {birthdayConfig.secretEndingMessage}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs tracking-widest rounded-xl uppercase transition-all shadow-lg hover:scale-[1.01]"
        >
          Return to Universe 🌌
        </button>
      </div>
    </div>
  );
}
