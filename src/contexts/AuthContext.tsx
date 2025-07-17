import { createContext, useContext, useState } from 'react';

interface UserInfo {
  email: string;
  name: string;
  authToken: string;
}
interface AuthContextType {
  isAuthenticated: boolean;
  userInfo: UserInfo | null;
  login: (info: UserInfo) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
    const stored = localStorage.getItem('userInfo');
    return stored ? JSON.parse(stored) : null;
  });

  const isAuthenticated = userInfo !== null;

  const login = (info: UserInfo) => {
    setUserInfo(info);
    localStorage.setItem('userInfo', JSON.stringify(info));
  };

  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userInfo, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('AuthContext must be used within AuthProvider');
  return context;
};
