import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface User {
  email: string;
  nickname: string;
  authToken: string;
}

interface UserContextType {
  user: User | null;
  login: (userInfo: User) => void;
  logout: () => void;
}

const STORAGE_KEY = {
  USER: 'kakaotech/userInfo',
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const storedUser = sessionStorage.getItem(STORAGE_KEY.USER);

  const [user, setUser] = useState<User | null>(
    storedUser ? JSON.parse(storedUser) : null
  );

  const login = (userInfo: User) => {
    sessionStorage.setItem(STORAGE_KEY.USER, JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY.USER);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error('useUserContext는 UserProvider 안에서만 사용해야 합니다.');
  return context;
};
