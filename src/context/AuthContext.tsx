import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import apiClient from '@/api/apiClient';

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface UserInfo {
  name: string;
  email: string;
  authToken: string;
}

function isValidUserInfo(data: unknown): data is UserInfo {
  return (
    typeof data === 'object' &&
    data !== null &&
    'name' in data &&
    'email' in data &&
    'authToken' in data &&
    typeof (data as any).name === 'string' &&
    typeof (data as any).email === 'string' &&
    typeof (data as any).authToken === 'string'
  );
}

const getErrorMessage = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  switch (error.response?.status) {
    case 400:
      return '잘못된 요청입니다. 이메일과 비밀번호를 확인해주세요.';
    case 401:
      return '이메일 또는 비밀번호가 잘못되었습니다.';
    case 404:
      return '존재하지 않는 계정입니다.';
    case 500:
      return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    default:
      if (error.message === 'Network Error') {
        return '네트워크 연결을 확인해주세요.';
      }
      return '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUserInfo = sessionStorage.getItem('userInfo');
      if (storedUserInfo) {
        const parsed = JSON.parse(storedUserInfo);
        if (isValidUserInfo(parsed)) {
          setUser({ name: parsed.name, email: parsed.email });
          setIsLoggedIn(true);
        } else {
          throw new Error('Invalid user data structure');
        }
      }
    } catch (error) {
      console.error('Failed to restore user session:', error);
      sessionStorage.removeItem('userInfo');
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await apiClient.post('/api/login', {
        email,
        password,
      });

      const { data } = response.data;

      if (data && data.email && data.name && data.authToken) {
        const userInfo: UserInfo = {
          name: data.name,
          email: data.email,
          authToken: data.authToken,
        };

        setUser({ name: data.name, email: data.email });
        setIsLoggedIn(true);
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));

        toast.success(`${data.name}님, 환영합니다!`);
        navigate('/');
      } else {
        throw new Error('Invalid response data');
      }
    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage = getErrorMessage(error);

      if (error.response?.status === 401) {
        const storedUserInfo = sessionStorage.getItem('userInfo');
        if (storedUserInfo) {
          toast.error('세션이 만료되었습니다. 다시 로그인해주세요.');
          setUser(null);
          setIsLoggedIn(false);
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error(errorMessage);
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem('userInfo');
    toast.success('로그아웃되었습니다.');
    navigate('/login');
  };

  const value = useMemo(
    () => ({
      isLoggedIn,
      user,
      login,
      logout,
      isLoading,
    }),
    [isLoggedIn, user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth는 반드시 AuthProvider 안에서 사용해야 합니다.');
  }
  return context;
};
