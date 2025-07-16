import { createContext, useContext } from 'react';

export interface UserInfo {
  email: string;
  name: string;
  authToken: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  login: (email: string, password: string, onSuccess?: () => void) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthProvider 내부사용 필요');
  }
  return context;
};
