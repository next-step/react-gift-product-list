import { createContext } from "react";

export interface User {
  email: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  isLoggedIn: boolean;
  logout: () => void;
  isInitialized: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
