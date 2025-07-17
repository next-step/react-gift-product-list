import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  email: string;
};

type AuthContextType = {
  isInitialized: boolean;
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setIsInitialized(true);
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    setToken(token);
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        isInitialized,
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 반드시 AuthProvider 내부에서 사용되어야 합니다.");
  }
  return context;
};
