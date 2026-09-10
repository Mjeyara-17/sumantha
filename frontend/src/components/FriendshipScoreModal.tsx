import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, ArrowRight, BarChart3, AlertCircle } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface FriendshipScoreModalProps {
  onContinue: () => void;
}

export default function FriendshipScoreModal({ onContinue }: FriendshipScoreModalProps) {
  const [revealed, setRevealed] = useState(false);

  const metrics = [
    { label: "Shared Memories", score: "99%", color: "text-amber-300" },
    { label: "Teasing Frequency", score: "100%", color: "text-rose-400" },
    { label: "Random Midnight Talks", score: "100%", color: "text-emerald-300" },
    { label: "Food Cravings", score: "1000%", color: "text-amber-400 font-bold" },
    { label: "BTS Obsession", score: "∞%", color: "text-purple-400 font-bold" },
    { label: "Korean Boys Rating", score: "∞%", color: "text-teal-300 font-bold" },
    { label: "Chaos Level", score: "∞%", color: "text-pink-400 font-bold" }
  ];

  useEffect(() => {
    sounds.playScanner();
    const timer = setTimeout(() => {
      setRevealed(true);
      sounds.playCelebrate();
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 }
      });
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl select-none animate-fade-in font-sans">
      <div className="max-w-md w-full bg-slate-950/95 border-2 border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center text-white">
        
        {/* Top Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-mono mb-4">
          <BarChart3 className="w-4 h-4 text-purple-300" />
          <span>FRIENDSHIP AUDIT PROTOCOL</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-300 to-purple-300 mb-6">
          Calculating Friendship Score... 📊
        </h2>

        {/* Breakdown List */}
        <div className="space-y-2.5 bg-white/[0.02] border border-white/10 rounded-2xl p-4 mb-6 text-left text-xs sm:text-sm">
          {metrics.map((m, idx) => (
            <div key={idx} className="flex justify-between items-center py-1 border-b border-white/5 last:border-0">
              <span className="text-slate-300">{m.label}:</span>
              <span className={`font-mono font-semibold ${m.color}`}>{m.score}</span>
            </div>
          ))}
        </div>

        {/* Climax Score Card */}
        {revealed ? (
          <div className="space-y-4 animate-scale-up">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-pink-950/70 via-purple-950/70 to-amber-950/70 border-2 border-pink-400/60 shadow-[0_0_40px_rgba(236,72,153,0.3)]">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block mb-1">
                FINAL CERTIFIED SCORE
              </span>
              <h1 className="text-4xl sm:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-purple-300 tracking-wider">
                ∞ / 100 ❤️
              </h1>
              <p className="text-xs sm:text-sm text-amber-300 font-semibold mt-2">
                "System calculation fail aayiduchu 😂"
              </p>
              <p className="text-[11px] text-slate-300 mt-1">
                Friendship cannot be contained within standard scientific limits!
              </p>
            </div>

            <button
              onClick={() => {
                sounds.playKeyEarned();
                onContinue();
              }}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.01]"
            >
              <span>Proceed to Voice Message 🎧</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="py-6 flex flex-col items-center justify-center space-y-2">
            <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono text-slate-400 animate-pulse">Running advanced chaos quantum algorithms...</span>
          </div>
        )}

      </div>
    </div>
  );
}
