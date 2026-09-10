import { useState, useEffect } from 'react';

const STORAGE_KEY = 'sumantha_universe_progress_v2';

export interface ProgressState {
  completedScenes: string[];
  memoryKeys: number;
  unlockedPhotos: number[];
  achievements: string[];
  firstPlaythroughComplete: boolean;
  secretEndingDiscovered: boolean;
  puzzleCompleted: boolean;
  currentSection: string;
}

const defaultProgress: ProgressState = {
  completedScenes: [],
  memoryKeys: 0,
  unlockedPhotos: [1], // Photo 01 is unlocked by default on start
  achievements: [],
  firstPlaythroughComplete: false,
  secretEndingDiscovered: false,
  puzzleCompleted: false,
  currentSection: 'intro'
};

export function useProgressSave() {
  const [progress, setProgress] = useState<ProgressState>(() => {
    if (typeof window === 'undefined') return defaultProgress;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultProgress, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to parse progress from localStorage', e);
    }
    return defaultProgress;
  });

  const [hasSavedSession, setHasSavedSession] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.unlockedPhotos && parsed.unlockedPhotos.length > 2) {
          setHasSavedSession(true);
        }
      }
    } catch (e) {}
  }, []);

  const saveProgress = (newProgress: Partial<ProgressState>) => {
    setProgress((prev) => {
      const updated = { ...prev, ...newProgress };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const unlockPhoto = (photoId: number) => {
    setProgress((prev) => {
      if (prev.unlockedPhotos.includes(photoId)) return prev;
      const updated = {
        ...prev,
        unlockedPhotos: [...prev.unlockedPhotos, photoId].sort((a, b) => a - b)
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const markSceneComplete = (sceneId: string) => {
    setProgress((prev) => {
      if (prev.completedScenes.includes(sceneId)) return prev;
      const updated = {
        ...prev,
        completedScenes: [...prev.completedScenes, sceneId]
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const addMemoryKey = () => {
    setProgress((prev) => {
      const nextKey = Math.min(prev.memoryKeys + 1, 7);
      const updated = { ...prev, memoryKeys: nextKey };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const unlockAchievement = (achievementId: string) => {
    let newlyUnlocked = false;
    setProgress((prev) => {
      if (prev.achievements.includes(achievementId)) return prev;
      newlyUnlocked = true;
      const updated = {
        ...prev,
        achievements: [...prev.achievements, achievementId]
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    return newlyUnlocked;
  };

  const setPuzzleDone = () => {
    setProgress((prev) => {
      const updated = { ...prev, puzzleCompleted: true };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    setHasSavedSession(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  const completeFirstPlaythrough = () => {
    setProgress((prev) => {
      const updated = { ...prev, firstPlaythroughComplete: true };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const discoverSecretEnding = () => {
    setProgress((prev) => {
      const updated = { 
        ...prev, 
        secretEndingDiscovered: true,
        unlockedPhotos: prev.unlockedPhotos.includes(22) ? prev.unlockedPhotos : [...prev.unlockedPhotos, 22]
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  return {
    progress,
    hasSavedSession,
    saveProgress,
    unlockPhoto,
    markSceneComplete,
    addMemoryKey,
    unlockAchievement,
    setPuzzleDone,
    resetProgress,
    completeFirstPlaythrough,
    discoverSecretEnding,
    dismissResumeDialog: () => setHasSavedSession(false)
  };
}
