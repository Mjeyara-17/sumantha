import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { photoMemories, PhotoMemoryItem } from '../data/photoMemories';
import SafeImage from './SafeImage';

interface PhotoViewerModalProps {
  initialPhotoId: number;
  unlockedPhotos: number[];
  onClose: () => void;
}

export default function PhotoViewerModal({
  initialPhotoId,
  unlockedPhotos,
  onClose
}: PhotoViewerModalProps) {
  const [currentId, setCurrentId] = useState(initialPhotoId);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Filter photos that are allowed to be navigated (hide #22 if not unlocked)
  const allowedPhotos = photoMemories.filter(p => p.id !== 22 || unlockedPhotos.includes(22));
  const currentIndex = allowedPhotos.findIndex(p => p.id === currentId);
  const currentPhoto = allowedPhotos[currentIndex] || photoMemories[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, allowedPhotos]);

  const handleNext = () => {
    if (currentIndex < allowedPhotos.length - 1) {
      setCurrentId(allowedPhotos[currentIndex + 1].id);
      setZoomLevel(1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentId(allowedPhotos[currentIndex - 1].id);
      setZoomLevel(1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl text-white select-none animate-fade-in">
      {/* Top HUD */}
      <div className="absolute top-4 inset-x-4 flex justify-between items-center z-20">
        <div className="flex items-center space-x-2 bg-slate-900/80 px-4 py-1.5 rounded-full border border-purple-500/30">
          <span className="text-xs font-mono text-amber-300 font-bold">
            PHOTO #{currentPhoto.id.toString().padStart(2, '0')} / {allowedPhotos.length}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            • {currentPhoto.category.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setZoomLevel(z => Math.min(z + 0.3, 2.5))}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(z => Math.max(z - 0.3, 1))}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-rose-900/50 border border-slate-700 text-white"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Prev / Next Navigation Arrows */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/70 hover:bg-slate-800 border border-white/20 text-white z-20 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {currentIndex < allowedPhotos.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/70 hover:bg-slate-800 border border-white/20 text-white z-20 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Image Display */}
      <div className="max-w-2xl w-full flex flex-col items-center">
        <div 
          className="relative max-h-[65vh] w-full aspect-[3/4] sm:aspect-auto sm:h-[60vh] rounded-3xl overflow-hidden border-2 border-purple-500/40 shadow-2xl bg-black flex items-center justify-center transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <SafeImage
            src={currentPhoto.src}
            alt={currentPhoto.title}
            className="w-full h-full object-contain"
            focusX={currentPhoto.focusX}
            focusY={currentPhoto.focusY}
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center max-w-lg bg-slate-950/80 backdrop-blur-md p-4 rounded-2xl border border-white/10">
          <h4 className="text-base font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-300 to-purple-300">
            {currentPhoto.title}
          </h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            {currentPhoto.caption}
          </p>
          {currentPhoto.funnyCaption && (
            <p className="text-xs text-amber-300 italic mt-1 font-medium">
              {currentPhoto.funnyCaption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
