import React, { useState, useRef, useEffect } from 'react';
import { sounds } from '../utils/soundEffects';

interface RunawayAnswerButtonProps {
  label: string;
  onAttempt?: (count: number) => void;
  onClickAnyway?: () => void;
  scale?: number;
  className?: string;
}

export default function RunawayAnswerButton({
  label,
  onAttempt,
  onClickAnyway,
  scale = 1,
  className = ''
}: RunawayAnswerButtonProps) {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const escapeToSafety = () => {
    sounds.playBoing();
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    if (onAttempt) {
      onAttempt(newAttempts);
    }

    // Determine safe bounds (stay within viewport boundaries: -100px to 100px on X, -70px to 70px on Y)
    const angle = Math.random() * Math.PI * 2;
    const distance = 90 + Math.random() * 50; // 90 to 140px jump
    
    let nextX = Math.cos(angle) * distance;
    let nextY = Math.sin(angle) * distance;

    // Keep within safe bounding box so it doesn't escape the screen or touch edge
    const maxBoundX = typeof window !== 'undefined' ? Math.min(window.innerWidth * 0.28, 120) : 100;
    const maxBoundY = typeof window !== 'undefined' ? Math.min(window.innerHeight * 0.2, 90) : 70;

    nextX = Math.max(-maxBoundX, Math.min(maxBoundX, nextX));
    nextY = Math.max(-maxBoundY, Math.min(maxBoundY, nextY));

    setPosition({ x: nextX, y: nextY });
  };

  // Mouse proximity trigger (desktop)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);
    if (dist < 85) {
      escapeToSafety();
    }
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={escapeToSafety}
      onTouchStart={(e) => {
        e.preventDefault();
        escapeToSafety();
      }}
      onClick={() => {
        escapeToSafety();
        if (onClickAnyway) onClickAnyway();
      }}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        transition: 'transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
      className={`select-none font-bold cursor-pointer transition-all ${className}`}
    >
      {label}
    </button>
  );
}
