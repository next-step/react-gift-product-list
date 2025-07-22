import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import axios from 'axios';
import { LOGIN_API_URL, SESSION_STORAGE_KEY } from '@/hooks/constants/api';

type User = {
  email: string;
  name: string;
  authToken: string;
};

type LoginParams = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  login: (params: LoginParams) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
  isLoading: boolean;
  authToken: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async ({ email, password }: LoginParams) => {
    const res = await axios.post<{ data: User }>(`${LOGIN_API_URL}`, {
      email,
      password,
    });
    const userData = res.data.data;
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoggedIn: user !== null,
        isLoading,
        authToken: user?.authToken ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth는 AuthProvider 내부에서 사용해야 함');
  return context;
};
