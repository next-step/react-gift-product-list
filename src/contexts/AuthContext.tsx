import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorageItem, setStorageItem, removeStorageItem } from '@/utils/storage';

const USER_INFO_KEY = 'userInfo';
const AUTH_TOKEN_KEY = 'authToken';

interface User {
  name : string;
  email: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null; 
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const isLoggedIn = !!user;
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = getStorageItem(USER_INFO_KEY);
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    setStorageItem(USER_INFO_KEY, userData);
    setStorageItem(AUTH_TOKEN_KEY, token);

    console.log('User Info (name, email):', getStorageItem(USER_INFO_KEY));
    // authToken은 JSON이 아니므로 sessionStorage에서 직접 가져옵니다.
    console.log('Auth Token:', sessionStorage.getItem(AUTH_TOKEN_KEY));
  };

  const logout = () => {
    setUser(null);
    removeStorageItem(USER_INFO_KEY);
    removeStorageItem(AUTH_TOKEN_KEY);
    navigate('/login');
  };

  const value = { isLoggedIn, user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
