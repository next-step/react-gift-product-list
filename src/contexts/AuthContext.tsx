import { createContext } from "react";

export type User = {
  token: string;
  name: string;
  email: string;
};

export type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoggedIn: boolean;
  isInitialized: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
