// src/context/AuthContext.tsx
import { logInAPI } from '@/utils/logInAPI';
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const AUTH_KEY = 'login_user';

type UserInfo = {
  email: string;
  name: string;
  authToken: string;
}

type AuthContextType = {
  user: UserInfo | null;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(AUTH_KEY);
    if (saved)
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem(AUTH_KEY);
      }
  }, []);

  const logIn = useCallback(async (email: string, password: string) => {
    try {
      const response = await logInAPI(email, password);
      setUser(response.data)
      localStorage.setItem(AUTH_KEY, JSON.stringify(response.data));
    } catch (error) {
      throw new Error(`${(error as Error).message}`);
    }
  }, [])

  const logOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  }, [])

  const value = useMemo(() => ({
    user,
    logIn,
    logOut
  }), [user, logIn, logOut])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth는 <AuthProvider> 안에서 사용되어야 합니다.');
  return context;
};
