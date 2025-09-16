import React, { memo } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeInDown' | 'zoomIn' | 'slideInUp';
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = memo(({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
  style = {}
}) => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold,
    triggerOnce,
    delay
  });

  const getAnimationClass = () => {
    if (!isVisible) {
      return `scroll-animation scroll-animation--${animation} scroll-animation--hidden`;
    }
    return `scroll-animation scroll-animation--${animation} scroll-animation--visible`;
  };

  const animationStyle: React.CSSProperties = {
    transitionDuration: `${duration}s`,
    ...style
  };

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`${getAnimationClass()} ${className}`}
      style={animationStyle}
    >
      {children}
    </div>
  );
});

ScrollAnimation.displayName = 'ScrollAnimation';

export default ScrollAnimation;
