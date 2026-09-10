import React, { useState } from 'react';
import { sounds } from '../utils/soundEffects';

export interface CakeConfig {
  flavor: 'chocolate' | 'strawberry' | 'vanilla';
  topping: 'strawberry' | 'chocolate' | 'icecream';
  theme: 'purple' | 'seoul' | 'galaxy' | 'classic';
}

interface CakeCustomizerModalProps {
  currentConfig: CakeConfig;
  onChange: (config: CakeConfig) => void;
  onConfirm: () => void;
}

export default function CakeCustomizerModal({
  currentConfig,
  onChange,
  onConfirm
}: CakeCustomizerModalProps) {
  const [confirmed, setConfirmed] = useState(false);

  const handleFlavorSelect = (flavor: CakeConfig['flavor']) => {
    sounds.playClick();
    onChange({ ...currentConfig, flavor });
  };

  const handleToppingSelect = (topping: CakeConfig['topping']) => {
    sounds.playClick();
    onChange({ ...currentConfig, topping });
  };

  const handleThemeSelect = (theme: CakeConfig['theme']) => {
    sounds.playClick();
    onChange({ ...currentConfig, theme });
  };

  return (
    <div className="my-auto pointer-events-auto w-full max-w-md bg-space-card border border-amber-400/30 p-6 rounded-2xl shadow-2xl backdrop-blur-xl animate-fade-in flex flex-col text-center">
      <span className="text-[10px] text-amber-400 font-mono tracking-widest uppercase mb-1">
        INTERACTIVE PATISSERIE LAB
      </span>
      <h3 className="font-display text-white text-base sm:text-lg font-bold tracking-wide mb-4">
        DESIGN YOUR BIRTHDAY CAKE 🎂
      </h3>

      {/* Flavour Selector */}
      <div className="flex flex-col text-left mb-4">
        <span className="text-[11px] text-slate-400 font-medium mb-1.5 uppercase tracking-wider">
          1. Base Flavour:
        </span>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'chocolate', label: '🍫 Chocolate' },
            { id: 'strawberry', label: '🍓 Strawberry' },
            { id: 'vanilla', label: '🍦 Vanilla' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => handleFlavorSelect(f.id as any)}
              className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                currentConfig.flavor === f.id
                  ? 'border-amber-400 bg-amber-500/20 text-white shadow-md'
                  : 'border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Topping Selector */}
      <div className="flex flex-col text-left mb-4">
        <span className="text-[11px] text-slate-400 font-medium mb-1.5 uppercase tracking-wider">
          2. Decadent Topping:
        </span>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'strawberry', label: '🍓 Berries' },
            { id: 'chocolate', label: '🍫 Choco Truffle' },
            { id: 'icecream', label: '🍦 Ice Cream Dollop' }
          ].map((top) => (
            <button
              key={top.id}
              onClick={() => handleToppingSelect(top.id as any)}
              className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                currentConfig.topping === top.id
                  ? 'border-pink-400 bg-pink-500/20 text-white shadow-md'
                  : 'border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20'
              }`}
            >
              {top.label}
            </button>
          ))}
        </div>
      </div>

      {/* Theme Selector */}
      <div className="flex flex-col text-left mb-6">
        <span className="text-[11px] text-slate-400 font-medium mb-1.5 uppercase tracking-wider">
          3. Cosmic Visual Theme:
        </span>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'purple', label: '💜 Purple Dream' },
            { id: 'seoul', label: '🌸 Seoul Night' },
            { id: 'galaxy', label: '✨ Galaxy' },
            { id: 'classic', label: '🎂 Classic Premium' }
          ].map((thm) => (
            <button
              key={thm.id}
              onClick={() => handleThemeSelect(thm.id as any)}
              className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                currentConfig.theme === thm.id
                  ? 'border-purple-400 bg-purple-500/20 text-white shadow-md'
                  : 'border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20'
              }`}
            >
              {thm.label}
            </button>
          ))}
        </div>
      </div>

      {confirmed ? (
        <div className="flex flex-col items-center animate-scale-up mb-2">
          <p className="text-amber-400 font-display text-sm font-bold tracking-wide mb-1">
            Perfect 😌
          </p>
          <p className="text-slate-300 text-xs italic mb-4">
            Saapda mudiyathu though 😂
          </p>
          <button
            onClick={onConfirm}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs tracking-widest rounded-xl uppercase transition-all shadow-lg hover:scale-[1.01]"
          >
            Light Candles & Make A Wish 🎂✨ →
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            sounds.playKeyEarned();
            setConfirmed(true);
          }}
          className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs tracking-widest rounded-xl uppercase transition-all shadow-lg hover:scale-[1.01]"
        >
          Confirm Custom Cake 🍰
        </button>
      )}
    </div>
  );
}
