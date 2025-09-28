// frontend/src/contexts/FeedbackContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getPendingFeedbackCount } from "../services/api"; // ⚡ chỗ này import từ api.ts

interface FeedbackContextType {
  pendingCount: number;
  setPendingCount: React.Dispatch<React.SetStateAction<number>>;
  refreshPendingCount: () => Promise<void>;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pendingCount, setPendingCount] = useState(0);

  // 🔄 Hàm refresh để gọi lại API
  const refreshPendingCount = async () => {
    try {
      const count = await getPendingFeedbackCount();
      setPendingCount(count);
    } catch (err) {
      console.error("Failed to fetch feedback count:", err);
    }
  };

  useEffect(() => {
    refreshPendingCount(); // load lần đầu
  }, []);

  return (
    <FeedbackContext.Provider value={{ pendingCount, setPendingCount, refreshPendingCount }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const ctx = useContext(FeedbackContext);
  if (!ctx) throw new Error("useFeedback must be used within FeedbackProvider");
  return ctx;
};
