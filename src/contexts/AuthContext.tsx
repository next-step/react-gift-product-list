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
    } catch (error: any) {
      // axios 에러 처리
      if (error.response && error.response.data && error.response.data.data) {
        const apiError = error.response.data.data;
        throw new Error(apiError.message || '로그인에 실패했습니다.');
      }
      throw new Error('로그인에 실패했습니다.');
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
