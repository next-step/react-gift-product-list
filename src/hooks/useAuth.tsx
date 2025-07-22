import { createContext, useContext } from 'react';
import { type ReactNode } from 'react';
import { loginApi } from '@/api/LoginApi';
import { useStorageState } from './useStorageState';

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
  const [user, setUser, clearUser] = useStorageState<User | null>('auth_user', null);

  const login = async (email: string, password: string) => {
    const res = await loginApi({ email, password });
    const userInfo: User = {
      authToken: res.authToken,
      email: res.email,
      name: res.name,
    };
    setUser(userInfo);
  };

  const logout = () => {
    clearUser();
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
