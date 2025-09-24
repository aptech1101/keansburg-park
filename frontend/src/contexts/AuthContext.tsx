import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  id: number;
  username: string;
  email?: string;
  phone?: string;
  role?: string;
  lastProfileUpdate?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loginUser: (user: User, token: string, remember: boolean) => void;
  logoutUser: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loginUser: () => {},
  logoutUser: () => {},
  updateUser: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const lsUser = localStorage.getItem("auth_user");
    const lsToken = localStorage.getItem("auth_token");
    const ssUser = sessionStorage.getItem("auth_user");
    const ssToken = sessionStorage.getItem("auth_token");
    if (lsUser && lsToken) {
      setUser(JSON.parse(lsUser));
      setToken(lsToken);
      return;
    }
    if (ssUser && ssToken) {
      setUser(JSON.parse(ssUser));
      setToken(ssToken);
    }
  }, []);

  const loginUser = (u: User, t: string, remember: boolean) => {
    setUser(u);
    setToken(t);
    if (remember) {
      localStorage.setItem("auth_user", JSON.stringify(u));
      localStorage.setItem("auth_token", t);
      sessionStorage.removeItem("auth_user");
      sessionStorage.removeItem("auth_token");
    } else {
      sessionStorage.setItem("auth_user", JSON.stringify(u));
      sessionStorage.setItem("auth_token", t);
      localStorage.removeItem("auth_user");
      localStorage.removeItem("auth_token");
    }
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_token");
    sessionStorage.removeItem("auth_user");
    sessionStorage.removeItem("auth_token");
  };

  const updateUser = (data: Partial<User>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated: User = { ...prev, ...data };
      const hasLS = !!localStorage.getItem("auth_token");
      if (hasLS) {
        localStorage.setItem("auth_user", JSON.stringify(updated));
      } else {
        sessionStorage.setItem("auth_user", JSON.stringify(updated));
      }
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



