import { createContext } from "react";
import type { LoginRequestDto, LoginResponseDto } from "@/types/DTO/authDTO";
import { useAuth } from "@/hooks/useAuth";
import type { ReactNode } from "react";

interface AuthContextType {
  user: LoginResponseDto | null;
  login: (user: LoginRequestDto) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, login, logout } = useAuth();

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
