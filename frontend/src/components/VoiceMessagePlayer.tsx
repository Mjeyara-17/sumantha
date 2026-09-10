import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Headphones, ArrowRight, Volume2 } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { sounds } from '../utils/soundEffects';

interface VoiceMessagePlayerProps {
  onComplete: () => void;
}

export default function VoiceMessagePlayer({ onComplete }: VoiceMessagePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(birthdayConfig.voiceMessageFile);
    audioRef.current = audio;

    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => {
      // If voice message file is not yet dropped in, we allow user to experience waveform simulation
      setAudioError(true);
    };

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    sounds.playClick();
    if (audioRef.current && !audioError) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(true); // fallback to simulated playback
        });
      }
    } else {
      // Toggle simulated waveform
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="my-auto pointer-events-auto w-full max-w-md bg-space-card border border-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-xl animate-fade-in flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-amber-400 mb-6 shadow-inner">
        <Headphones className="w-5 h-5 animate-pulse" />
      </div>

      <div className="flex flex-col gap-1.5 mb-8">
        <span className="text-slate-400 text-xs font-light tracking-widest">Sometimes...</span>
        <span className="text-slate-400 text-xs font-light tracking-widest">Photo venam.</span>
        <span className="text-slate-400 text-xs font-light tracking-widest">Chat venam.</span>
        <h3 className="font-display text-white text-lg font-bold tracking-wider mt-2">
          A voice is enough. ❤️
        </h3>
      </div>

      {/* Animated Waveform Visualizer */}
      <div className="flex items-center justify-center gap-1.5 h-14 w-full px-6 mb-8 bg-black/40 rounded-2xl border border-white/5">
        {[18, 32, 45, 20, 50, 38, 25, 48, 30, 42, 22, 40, 28, 46, 20].map((height, i) => (
          <div
            key={i}
            style={{
              height: isPlaying ? `${height}px` : '4px',
              transition: 'all 0.2s ease-in-out',
              animationDelay: `${i * 0.08}s`
            }}
            className={`w-1 rounded-full ${
              isPlaying 
                ? 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)] animate-pulse' 
                : 'bg-slate-700'
            }`}
          />
        ))}
      </div>

      {/* Audio Play CTA */}
      <button
        onClick={togglePlay}
        className="flex items-center gap-2 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs tracking-widest rounded-full uppercase transition-all shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:scale-105 mb-4"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        <span>{isPlaying ? "Pause Audio" : "🎧 PLAY THIS"}</span>
      </button>

      {audioError && (
        <span className="text-[10px] text-slate-500 mb-6 italic">
          [Drop voice recording in /audio/message-from-me.mp3]
        </span>
      )}

      <button
        onClick={() => {
          if (audioRef.current) audioRef.current.pause();
          onComplete();
        }}
        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors tracking-widest uppercase mt-4"
      >
        <span>Proceed to Letter</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
