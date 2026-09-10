import { useState, useEffect } from 'react';

export type PerformanceTier = 'high' | 'balanced' | 'low';

export interface PerformanceState {
  tier: PerformanceTier;
  particleCount: number;
  shadows: boolean;
  dpr: number;
  reducedMotion: boolean;
}

export function usePerformanceMode(): PerformanceState {
  const [pref, setPref] = useState<PerformanceState>({
    tier: 'high',
    particleCount: 1000,
    shadows: true,
    dpr: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 2,
    reducedMotion: false
  });

  useEffect(() => {
    // Detect mobile or low-end device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || (window.innerWidth < 768);

    // Detect reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hasReducedMotion = motionQuery.matches;

    // Detect high dpr screens
    const originalDpr = window.devicePixelRatio || 1;

    let tier: PerformanceTier = 'high';
    let particleCount = 1200;
    let shadows = true;
    let dpr = Math.min(originalDpr, 2);

    if (isMobile) {
      tier = 'low';
      particleCount = 250;
      shadows = false;
      dpr = Math.min(originalDpr, 1.2); // Limit mobile rendering resolution
    } else if (originalDpr > 2 || hasReducedMotion) {
      // High-DPI screens or reduced motion gets Balanced to avoid lag
      tier = 'balanced';
      particleCount = 600;
      shadows = true;
      dpr = Math.min(originalDpr, 1.5);
    }

    setPref({
      tier,
      particleCount,
      shadows,
      dpr,
      reducedMotion: hasReducedMotion
    });

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPref(prev => ({
        ...prev,
        reducedMotion: e.matches,
        tier: e.matches ? 'low' : prev.tier
      }));
    };

    motionQuery.addEventListener('change', handleMotionChange);
    return () => motionQuery.removeEventListener('change', handleMotionChange);
  }, []);

  return pref;
}
