import { useState, useEffect, useRef, useCallback } from 'react';

export const useOnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const targetRef = useRef<number>(0);
  const animationRef = useRef<number | null>(null);

  const clamp = useCallback((val: number, min: number, max: number) => Math.max(min, Math.min(max, val)), []);

  useEffect(() => {
    const initial = Math.floor(Math.random() * 201);
    setOnlineUsers(initial);
    targetRef.current = initial;

    const targetTimer = setInterval(() => {
      const delta = Math.floor(Math.random() * 21) - 10; // [-10, +10]
      targetRef.current = clamp(targetRef.current + delta, 0, 200);
    }, 5000);

    const animateToTarget = () => {
      setOnlineUsers(current => {
        const target = targetRef.current;
        if (current === target) return current;
        const step = Math.max(1, Math.min(2, Math.abs(target - current)));
        const next = current + (target > current ? step : -step);
        const clampedNext = clamp(next, 0, 200);
        if (clampedNext !== target) {
          animationRef.current = requestAnimationFrame(animateToTarget);
        }
        return clampedNext;
      });
    };

    const startAnimation = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animationRef.current = requestAnimationFrame(animateToTarget);
    };

    startAnimation();
    const animationTimer = setInterval(startAnimation, 100);

    return () => {
      clearInterval(targetTimer);
      clearInterval(animationTimer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [clamp]);

  return onlineUsers;
};
