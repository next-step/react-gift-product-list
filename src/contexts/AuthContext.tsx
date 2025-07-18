import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "@/hooks/useSessionStorage";

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
  const [isInitialized, setIsInitialized] = useState(false);
  const { user, token, saveAuth, clearAuth } = useSessionStorage();
  const navigate = useNavigate();

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  const login = (userData: User, token: string) => {
    saveAuth(userData, token);
  };

  const logout = () => {
    clearAuth();
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
