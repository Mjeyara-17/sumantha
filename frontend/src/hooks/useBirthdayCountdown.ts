import { useState, useEffect } from 'react';
import { birthdayConfig } from '../config/birthdayConfig';
import { getTargetTime, parseConfigDate } from '../utils/timezone';

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isUnlocked: boolean;
}

export function useBirthdayCountdown(): CountdownState {
  const [countdown, setCountdown] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isUnlocked: false
  });

  useEffect(() => {
    const targetDate = parseConfigDate(
      birthdayConfig.birthdayYear,
      birthdayConfig.birthdayMonth,
      birthdayConfig.birthdayDay,
      birthdayConfig.birthdayTime
    );
    
    const calculateTimeLeft = () => {
      // Get current date representation in the target timezone
      const nowInTz = getTargetTime(birthdayConfig.timezone);
      const difference = targetDate.getTime() - nowInTz.getTime();
      
      if (difference <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isUnlocked: true
        });
        return true;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      setCountdown({
        days,
        hours,
        minutes,
        seconds,
        isUnlocked: false
      });
      return false;
    };
    
    // Initial calculation
    const unlocked = calculateTimeLeft();
    if (unlocked) return;
    
    const timer = setInterval(() => {
      const isNowUnlocked = calculateTimeLeft();
      if (isNowUnlocked) {
        clearInterval(timer);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return countdown;
}
