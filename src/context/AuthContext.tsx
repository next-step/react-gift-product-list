import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/login';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    try {
      const response = await api.post('/api/login', {
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
        navigate('/');
      } else {
        throw new Error('Invalid response data');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem('userInfo');
    navigate('/login');
  };

  const value = useMemo(
    () => ({
      isLoggedIn,
      user,
      login,
      logout,
    }),
    [isLoggedIn, user]
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
