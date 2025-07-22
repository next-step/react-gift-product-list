import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useLogin } from '@/hooks/useLogin';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  redirectAfterLogin: string | null;
  onChangeRedirectAfterLogin: (path: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectAfterLogin, onChangeRedirectAfterLogin] = useState<
    string | null
  >(null);

  const { login: loginHandler, isLoading } = useLogin();

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('userInfo');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.name && parsed?.email) {
          setUser({ name: parsed.name, email: parsed.email });
          setIsLoggedIn(true);
        } else {
          throw new Error('Invalid session user');
        }
      }
    } catch (error) {
      console.error(error);
      sessionStorage.removeItem('userInfo');
    }
  }, []);

  const login = async (email: string, password: string) => {
    return loginHandler(
      email,
      password,
      (user) => {
        setUser(user);
        setIsLoggedIn(true);
      },
      () => {
        setUser(null);
        setIsLoggedIn(false);
      }
    );
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem('userInfo');
  };

  const value = useMemo(
    () => ({
      isLoggedIn,
      user,
      login,
      logout,
      isLoading,
      redirectAfterLogin,
      onChangeRedirectAfterLogin,
    }),
    [isLoggedIn, user, isLoading, redirectAfterLogin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 안에서만 사용할 수 있습니다.');
  }
  return context;
};
