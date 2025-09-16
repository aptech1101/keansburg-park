import React, { useState, useEffect } from 'react';
import { useRealTime } from '../hooks/useRealTime';

const PromotionBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { currentTime, formatTime, formatDate, getLocation } = useRealTime();

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    // No need to adjust body padding since banner is inline now
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="promotion-banner">
      <div className="scrolling-text">
        🎉 Welcome to Keansburg Park! 
        📍 Location: {getLocation()} | 
        📅 {formatDate(currentTime)} | 
        🕐 {formatTime(currentTime)} | 
         
        🎉 Welcome to Keansburg Park! 
        📍 Location: {getLocation()} | 
        📅 {formatDate(currentTime)} | 
        🕐 {formatTime(currentTime)} | 
        
      </div>
      <button className="close-banner" onClick={handleClose}>
        ×
      </button>
    </div>
  );
};

export default PromotionBanner;
