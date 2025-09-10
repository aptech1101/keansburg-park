// frontend/src/auth/AuthProvider.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { get, post } from '../api/client';

// User type definition
interface User {
  id: number;
  full_name: string;
  email: string;
  role: string;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Refresh user data from server
   * Calls GET /auth/me to get current user info
   */
  const refresh = async (): Promise<void> => {
    try {
      setLoading(true);
      const userData = await get('/auth/me.php');
      
      // If we get user data, set it
      if (userData && userData.id) {
        setUser({
          id: userData.id,
          full_name: userData.full_name,
          email: userData.email,
          role: userData.role || 'user'
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      // If refresh fails (401, etc.), clear user state
      console.log('Auth refresh failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login user with email and password
   * Calls POST /auth/login and sets user state
   */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      
      const response = await post('/auth/login.php', {
        email,
        password
      });

      // Set user data from login response
      if (response && response.id) {
        setUser({
          id: response.id,
          full_name: response.full_name,
          email: response.email,
          role: response.role || 'user'
        });
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error) {
      // Clear user state on login failure
      setUser(null);
      throw error; // Re-throw for component error handling
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout user
   * Calls POST /auth/logout and clears user state
   */
  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      
      // Call logout endpoint
      await post('/auth/logout.php', {});
      
      // Clear user state
      setUser(null);
    } catch (error) {
      // Even if logout call fails, clear local state
      console.log('Logout error:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Effect to refresh user data on mount
  useEffect(() => {
    refresh();
  }, []);

  // Context value
  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    refresh
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to use auth context
 * @returns AuthContextType
 * @throws Error if used outside AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthProvider;
