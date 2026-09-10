import React, { useEffect, useState } from 'react';
import { allAchievements, Achievement } from '../data/achievements';
import { sounds } from '../utils/soundEffects';

interface AchievementToastProps {
  currentAchievementId: string | null;
  onDismiss: () => void;
}

export default function AchievementToast({ currentAchievementId, onDismiss }: AchievementToastProps) {
  const [visible, setVisible] = useState(false);
  const [achievement, setAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    if (currentAchievementId && allAchievements[currentAchievementId]) {
      setAchievement(allAchievements[currentAchievementId]);
      setVisible(true);
      sounds.playAchievement();

      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onDismiss, 400); // allow exit animation to complete
      }, 4200);

      return () => clearTimeout(timer);
    }
  }, [currentAchievementId]);

  if (!visible || !achievement) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 pointer-events-auto max-w-sm w-[90vw] animate-scale-up">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/15 via-purple-500/15 to-pink-500/15 border border-amber-400/40 p-4 shadow-[0_10px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(245,158,11,0.2)] backdrop-blur-xl flex items-center gap-3.5">
        {/* Shimmer sweep highlight */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />

        {/* Icon container with pulsing ring */}
        <div className="relative shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-black/40 border border-amber-400/30 text-2xl shadow-inner">
          <span>{achievement.icon}</span>
        </div>

        {/* Text */}
        <div className="flex flex-col grow pr-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-amber-400 font-display">
              ACHIEVEMENT UNLOCKED ✨
            </span>
          </div>
          <h4 className="text-white text-xs sm:text-sm font-bold tracking-wide mt-0.5">
            {achievement.title}
          </h4>
          <p className="text-slate-300 text-[10px] leading-tight font-light mt-0.5">
            {achievement.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
