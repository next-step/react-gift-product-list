import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [user, setUser] = useState(() => {
    try {
    const savedUser = sessionStorage.getItem(USER_INFO_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Failed to parse user info from sessionStorage:', error); 
      sessionStorage.removeItem(USER_INFO_KEY); 
      return null;
    }
  });

  const isLoggedIn = !!user;
  const navigate = useNavigate();

  const login = (userData: User, token: string) => {
    setUser(userData);
    sessionStorage.setItem(USER_INFO_KEY, JSON.stringify(userData));
    sessionStorage.setItem(AUTH_TOKEN_KEY, token);
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem(USER_INFO_KEY);
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
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
