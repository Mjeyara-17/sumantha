import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Sliders } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { sounds } from '../utils/soundEffects';

interface MusicControllerProps {
  isPlaying: boolean;
  onStateChange?: (playing: boolean) => void;
}

export default function MusicController({ isPlaying, onStateChange }: MusicControllerProps) {
  const [muted, setMuted] = useState(() => {
    const saved = localStorage.getItem('birthday_music_muted');
    return saved === 'true';
  });
  const [volume, setVolume] = useState(0.4);
  const [showSlider, setShowSlider] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and update audio element
  useEffect(() => {
    audioRef.current = new Audio(birthdayConfig.musicFile);
    audioRef.current.loop = true;
    audioRef.current.volume = muted ? 0 : volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Sync isPlaying prop with HTMLAudio play state
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying && !muted) {
      audioRef.current.play().catch(err => {
        console.warn('Audio play failed (waiting for user click interaction)', err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, muted]);

  // Sync volume state with HTMLAudio volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  const toggleMute = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    localStorage.setItem('birthday_music_muted', String(nextMuted));
    sounds.setMuted(nextMuted);
    if (onStateChange) onStateChange(!nextMuted && isPlaying);
  };

  return (
    <div 
      className="fixed top-6 right-6 z-50 flex items-center gap-3 pointer-events-auto"
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      {/* Volume slider (expand on hover) */}
      <div 
        className={`flex items-center bg-space-card border border-space-border backdrop-blur-md px-3 py-2 rounded-full shadow-lg transition-all duration-300 ${
          showSlider ? 'opacity-100 max-w-[120px] scale-100' : 'opacity-0 max-w-0 scale-95 pointer-events-none'
        }`}
      >
        <Sliders className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.05"
          value={volume}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            setVolume(val);
            if (val > 0 && muted) toggleMute();
          }}
          className="w-16 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
      </div>

      {/* Speaker Button */}
      <button
        onClick={toggleMute}
        aria-label={muted ? "Unmute Music" : "Mute Music"}
        className="flex items-center justify-center w-12 h-12 bg-space-card border border-space-border hover:border-amber-400 rounded-full text-slate-300 hover:text-amber-400 backdrop-blur-xl shadow-xl transition-all hover:scale-105"
      >
        {muted ? (
          <VolumeX className="w-5 h-5 text-rose-400" />
        ) : (
          <div className="relative w-5 h-5 flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-amber-400" />
            {isPlaying && (
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            )}
          </div>
        )}
      </button>
    </div>
  );
}
