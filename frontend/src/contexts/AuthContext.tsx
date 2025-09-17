import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  user_id: number;
  username: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loginUser: (user: User, token: string, remember: boolean) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loginUser: () => {},
  logoutUser: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const loginUser = (u: User, t: string, remember: boolean) => {
    setUser(u);
    setToken(t);
    if (remember) {
      localStorage.setItem("auth_user", JSON.stringify(u));
      localStorage.setItem("auth_token", t);
    }
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
