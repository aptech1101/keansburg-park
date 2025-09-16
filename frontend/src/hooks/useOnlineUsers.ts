import { useState, useEffect, useRef } from 'react';

export const useOnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const targetRef = useRef<number>(0);

  useEffect(() => {
    const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

    // Giá trị khởi tạo 0 - 200
    const initial = Math.floor(Math.random() * 201);
    setOnlineUsers(initial);
    targetRef.current = initial;

    // Mỗi 5s chọn mục tiêu mới cách hiện tại tối đa 10, và giữ trong 0-200
    const targetTimer = setInterval(() => {
      const delta = Math.floor(Math.random() * 21) - 10; // [-10, +10]
      targetRef.current = clamp(targetRef.current + delta, 0, 200);
    }, 5000);

    // Mượt mà tiến về mục tiêu mỗi 500ms, bước nhỏ (1-3)
    const tickTimer = setInterval(() => {
      const current = onlineUsers;
      const target = targetRef.current;
      if (current === target) return;
      const step = Math.max(1, Math.min(3, Math.abs(target - current)));
      const next = current + (target > current ? step : -step);
      setOnlineUsers(clamp(next, 0, 200));
    }, 500);

    return () => {
      clearInterval(targetTimer);
      clearInterval(tickTimer);
    };
  }, [onlineUsers]);

  return onlineUsers;
};
