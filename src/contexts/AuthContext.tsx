import axiosInstance from '@apis/axiosInstance';
import { createContext, useContext, useEffect, useState } from 'react';

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

      return true;
    } catch (error) {
      console.log(error);
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
