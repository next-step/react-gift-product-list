import { createContext, useContext, useState } from 'react';
import { type ReactNode } from 'react';
import { loginApi } from '@/api/LoginApi';

interface User {
  authToken: string;
  email: string;
  name: string;
}

interface AuthCtx {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem('auth_user');
    return raw ? JSON.parse(raw) : null;
  });

  const login = async (email: string, password: string) => {
    const res = await loginApi({ email, password });
    const userInfo = {
      authToken: res.authToken,
      email: res.email,
      name: res.name,
    };

    setUser(userInfo);
    localStorage.setItem('auth_user', JSON.stringify(userInfo));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
