import React from 'react';
import { GameZoneType } from '../scenes/UniverseScene';
import { Key, Map } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface NavigationProps {
  activeZone: GameZoneType;
  onZoneSelect: (zone: GameZoneType) => void;
  memoryKeys: number;
  firstPlaythroughComplete: boolean;
  onOpenMemoryMap: () => void;
  visible: boolean;
}

export default function Navigation({ 
  activeZone, 
  onZoneSelect, 
  memoryKeys,
  firstPlaythroughComplete,
  onOpenMemoryMap,
  visible 
}: NavigationProps) {
  if (!visible) return null;

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[95%] pointer-events-auto flex flex-col items-center gap-2">
      <div className="flex items-center gap-2 bg-space-card border border-space-border backdrop-blur-xl px-4 py-2 rounded-full shadow-2xl">
        
        {/* Subtle Memory Key Counter */}
        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-amber-400 font-bold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/20">
          <Key className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>{memoryKeys} / 7 MEMORY KEYS</span>
        </div>

        {/* MEMORY MAP Trigger (Unlocked after first playthrough completion) */}
        {firstPlaythroughComplete && (
          <button
            onClick={() => {
              sounds.playClick();
              onOpenMemoryMap();
            }}
            className="flex items-center gap-1.5 text-[10px] sm:text-xs font-display font-bold tracking-widest px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-slate-950 uppercase transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:scale-105 ml-1"
          >
            <Map className="w-3.5 h-3.5" />
            <span>MEMORY MAP ✨</span>
          </button>
        )}
      </div>
    </nav>
  );
}
