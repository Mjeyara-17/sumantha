import React from 'react';
import { RotateCcw, Play, Sparkles, Key } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface ResumeSessionModalProps {
  memoryKeys: number;
  unlockedCount: number;
  onResume: () => void;
  onRestart: () => void;
}

export default function ResumeSessionModal({
  memoryKeys,
  unlockedCount,
  onResume,
  onRestart
}: ResumeSessionModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl select-none animate-fade-in font-sans">
      <div className="max-w-md w-full bg-slate-950/95 border-2 border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center text-white">
        <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center mx-auto mb-4 text-purple-300">
          <Sparkles className="w-8 h-8 animate-spin-slow text-amber-300" />
        </div>

        <h2 className="text-xl sm:text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-300 to-purple-300 mb-2">
          Welcome back Sumantha 👀
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mb-6">
          We found your celestial session saved in the memory vault.
        </p>

        <div className="flex justify-around items-center bg-white/[0.03] border border-white/10 rounded-2xl p-4 mb-6 text-xs font-mono">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Unlocked</span>
            <span className="text-amber-300 text-base font-bold">{unlockedCount} / 22</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Memory Keys</span>
            <span className="text-pink-400 text-base font-bold">{memoryKeys} / 7 🔑</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              sounds.playSparkle();
              onResume();
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.01]"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Continue Journey</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onRestart();
            }}
            className="w-full py-2.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 text-xs font-medium transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start Again from Beginning</span>
          </button>
        </div>
      </div>
    </div>
  );
}
