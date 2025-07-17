import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthContextType } from '@/types/auth';
import { useLocalStorageState } from '@/hooks';
import { loginApi } from '@/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorageState<User | null>(
    'kakao-gift-auth',
    null
  );
  const [loading, setLoading] = useState(false); // useLocalStorageState는 동기 초기화되므로 loading 불필요

  const isAuthenticated = !!user;

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      // 실제 API 호출
      const {
        email: userEmail,
        name,
        authToken,
      } = await loginApi(email, password);
      const userData: User = {
        email: userEmail,
        name,
        authToken,
      };
      setUser(userData);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null); // useLocalStorageState가 자동으로 localStorage에서 삭제
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
