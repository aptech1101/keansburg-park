import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    delay = 0
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      if (delay > 0) {
        setTimeout(() => {
          setIsVisible(true);
          if (triggerOnce) {
            setHasAnimated(true);
          }
        }, delay);
      } else {
        setIsVisible(true);
        if (triggerOnce) {
          setHasAnimated(true);
        }
      }
    } else if (!triggerOnce) {
      setIsVisible(false);
    }
  }, [delay, triggerOnce]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, handleIntersection]);

  return {
    elementRef,
    isVisible: triggerOnce ? (hasAnimated || isVisible) : isVisible,
    hasAnimated
  };
};
