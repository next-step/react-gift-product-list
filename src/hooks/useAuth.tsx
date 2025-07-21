import { createContext, useContext, useState } from 'react';
import { type ReactNode } from 'react';
import { loginApi } from '@/api/LoginApi';
import { createStorage } from '@/utils/storage';

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

const userStorage = createStorage<User>('auth_user');

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => userStorage.get());

  const login = async (email: string, password: string) => {
    const res = await loginApi({ email, password });
    const userInfo: User = {
      authToken: res.authToken,
      email: res.email,
      name: res.name,
    };
    setUser(userInfo);
    userStorage.set(userInfo);
  };

  const logout = () => {
    setUser(null);
    userStorage.remove();
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
