import axiosInstance from '@apis/axiosInstance';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  email: string;
  name: string;
  authToken: string;
}

interface AuthContextType {
  user: User | null;
  login: (loginInfo: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('userInfo');
    if (savedUser) setUser(JSON.parse(savedUser));
    setIsInitialized(true);
  }, []);

  const login = async ({
    email,
    password,
  }: LoginCredentials): Promise<boolean> => {
    //임시 검증 로직

    try {
      const res = await axiosInstance.post('/login', { email, password });

      const data = res.data.data;
      console.log(data);

      setUser(data);

      sessionStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('로그인 성공');
      return true;
    } catch (error) {
      console.log('로그인 실패', error);

      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response.status;
        const errorMessage =
          error.response.data?.data?.message ||
          '알 수 없는 에러가 발생했습니다.';

        if (statusCode >= 400 && statusCode < 500) {
          toast.error(errorMessage);
        } else {
          toast.error('서버 오류 또는 네트워크 문제 발생');
        }
      } else {
        toast.error('예상치 못한 오류가 발생했습니다.');
      }

      return false;
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
