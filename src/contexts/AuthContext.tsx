import { getUserNameFromEmail } from "@/utils/getUserNameFromEmail";
import React, { createContext, useContext, useState } from "react";

type UserInfo = {
  email: string;
  name: string;
  authToken: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  login: (userInfo: UserInfo) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
    const stored = localStorage.getItem("userInfo");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (user: UserInfo) => {
    setIsLoggedIn(true);
    setUserInfo(user);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userInfo", JSON.stringify(user));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userInfo");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  const { userInfo, ...rest } = context;
  const userName = getUserNameFromEmail(userInfo?.email ?? null);
  return { userInfo, userName, ...rest };
};
