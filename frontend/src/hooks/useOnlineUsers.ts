import { useState, useEffect } from 'react';

export const useOnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState<number>(0);

  useEffect(() => {
    // Tạo số người online ban đầu
    const generateRandomUsers = () => {
      return Math.floor(Math.random() * (2000 - 500 + 1)) + 500;
    };

    // Set giá trị ban đầu
    setOnlineUsers(generateRandomUsers());

    // Cập nhật mỗi 5 giây
    const interval = setInterval(() => {
      setOnlineUsers(generateRandomUsers());
    }, 5000);

    // Cleanup interval khi component unmount
    return () => clearInterval(interval);
  }, []);

  return onlineUsers;
};
