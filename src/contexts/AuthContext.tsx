import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'react-toastify';

type UserInfo = {
  email: string;
  name: string;
  authToken: string;
};

type LoginCredentials = {
  email: string;
  pw: string;
};

type AuthContextType = {
  userInfo: UserInfo | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  });

  const login = async (credentials: LoginCredentials) => {
    try {
      console.log('로컬 로그인 시도:', credentials);

      if (!credentials.email || !credentials.pw) {
        throw new Error('이메일과 비밀번호를 모두 입력해주세요.');
      }
      if (!credentials.email.includes('@')) {
        throw new Error('유효한 이메일 형식이 아닙니다.');
      }

      const name = credentials.email.split('@')[0];

      const authToken = `local-token-${Date.now()}`;

      const newUserInfo: UserInfo = {
        email: credentials.email,
        name: name,
        authToken: authToken,
      };

      await new Promise((resolve) => setTimeout(resolve, 500)); //요거는 가상지연입니다

      setUserInfo(newUserInfo);
      localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
      console.log('로컬 로그인/등록 성공:', newUserInfo);
      toast.success('로그인 성공!');
    } catch (error: any) {
      console.error('로컬 로그인 실패:', error.message);
      toast.error(error.message || '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      throw error;
    }
  };

  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem('userInfo');
    console.log('로그아웃 되었습니다.');
    toast.info('로그아웃 되었습니다.');
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내에서 사용되어야 합니다.');
  }
  return context;
};
