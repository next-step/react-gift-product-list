import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import axios from 'axios';

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

const SESSION_KEY = 'kakaotech/userInfo';
const LOGIN_API_PATH = '/api/login';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem(SESSION_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async ({ email, password }: LoginParams) => {
    const res = await axios.post<{ data: User }>(
      `${import.meta.env.VITE_API_BASE_URL}${LOGIN_API_PATH}`,
      { email, password }
    );
    const userData = res.data.data;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
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
