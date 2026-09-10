import React, { useState } from 'react';
import { X, Lock, Sparkles, Image as ImageIcon, Eye, Heart } from 'lucide-react';
import { photoMemories, PhotoMemoryItem } from '../data/photoMemories';
import SafeImage from './SafeImage';

interface MemoryMapModalProps {
  unlockedPhotos: number[];
  onSelectPhoto: (id: number) => void;
  onOpenConstellation: () => void;
  onClose: () => void;
}

export default function MemoryMapModal({
  unlockedPhotos,
  onSelectPhoto,
  onOpenConstellation,
  onClose
}: MemoryMapModalProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All 22 Memories' },
    { id: 'opening', label: 'Mystery & 3D' },
    { id: 'funny', label: 'Comedy & Evidence' },
    { id: 'korean', label: 'Korean Match' },
    { id: 'emotional', label: 'Emotional' }
  ];

  const filteredPhotos = photoMemories.filter((p) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'opening') return ['opening', 'universe'].includes(p.category);
    if (selectedFilter === 'funny') return ['detective', 'emoji', 'puzzle', 'evidence', 'recovery', 'food', 'scanner'].includes(p.category);
    if (selectedFilter === 'korean') return ['korean', 'wedding'].includes(p.category);
    if (selectedFilter === 'emotional') return ['then_now', 'timeline', 'thoughts', 'emotional', 'hero', 'secret'].includes(p.category);
    return true;
  });

  const totalUnlocked = unlockedPhotos.length;
  const hasSecret = unlockedPhotos.includes(22);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl text-white select-none animate-fade-in overflow-hidden">
      <div className="max-w-4xl w-full h-[88vh] bg-slate-950/95 border-2 border-purple-500/40 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-600/20 border border-purple-400/30 rounded-2xl">
              <ImageIcon className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-300 to-purple-300">
                SUMANTHA'S 22 MEMORY ARCHIVE
              </h2>
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                <span className="text-amber-300 font-bold">
                  {hasSecret ? "22 / 22" : `${Math.min(totalUnlocked, 21)} / 22`} MEMORIES FOUND
                </span>
                {!hasSecret && (
                  <span className="text-[10px] text-pink-400 bg-pink-950/60 px-2 py-0.5 rounded-full border border-pink-500/30">
                    #22 — ????? 🔒
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenConstellation}
              className="px-3 py-1.5 rounded-xl bg-pink-600/30 hover:bg-pink-600/50 border border-pink-400/40 text-pink-300 text-xs font-bold transition-all flex items-center space-x-1.5"
            >
              <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
              <span className="hidden sm:inline">3D Constellation</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto py-3 no-scrollbar border-b border-purple-500/10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedFilter === cat.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 22 Photo Grid */}
        <div className="flex-1 overflow-y-auto py-4 pr-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 no-scrollbar">
          {filteredPhotos.map((photo) => {
            const isUnlocked = unlockedPhotos.includes(photo.id);
            const isSecretLocked = photo.id === 22 && !hasSecret;

            return (
              <div
                key={photo.id}
                onClick={() => {
                  if (isUnlocked) onSelectPhoto(photo.id);
                }}
                className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                  isUnlocked
                    ? 'border-purple-500/30 hover:border-amber-400 cursor-pointer hover:scale-[1.02] bg-slate-900/70 shadow-lg'
                    : 'border-slate-800 bg-slate-950/60 opacity-60'
                }`}
              >
                {/* Photo Thumbnail */}
                <div className="w-full aspect-[4/5] bg-black relative overflow-hidden">
                  {isUnlocked ? (
                    <SafeImage
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                      focusX={photo.focusX}
                      focusY={photo.focusY}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-slate-950">
                      <Lock className="w-6 h-6 text-slate-600 mb-1" />
                      <span className="text-[10px] font-mono text-slate-500">
                        {isSecretLocked ? "SECRET ⭐" : "LOCKED"}
                      </span>
                    </div>
                  )}

                  {/* Top Badge */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-[9px] font-mono text-amber-300 border border-white/10">
                    #{photo.id.toString().padStart(2, '0')}
                  </div>
                </div>

                {/* Footer Info */}
                <div className="p-2.5">
                  <div className="text-xs font-bold font-display text-slate-200 truncate">
                    {isUnlocked ? photo.title : isSecretLocked ? "?? Secret Memory ??" : "Hidden Memory"}
                  </div>
                  <div className="text-[9px] font-mono text-purple-300 mt-0.5 capitalize truncate">
                    {isUnlocked ? photo.category : "Locked Zone"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <span>Tap any discovered memory to view high-res full image & story.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold"
          >
            Close Archive
          </button>
        </div>
      </div>
    </div>
  );
}
