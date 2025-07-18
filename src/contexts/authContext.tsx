import { clearCookieValue, getCookieValue, setCookieValue } from "@/utils/cookie";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export const AUTH_COOKIE_KEY_EMAIL = "email";
export const AUTH_COOKIE_KEY_NAME = "name";
export const AUTH_COOKIE_KEY_TOKEN = "authToken";

export type Auth = {
  email: string;
  name: string;
  authToken: string;
};

type AuthContextType = {
  auth: Auth | undefined;
  login: (userInfo: Auth) => void;
  logout: () => void;
  isValidAuth: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<Auth | undefined>(undefined);

  const login = useCallback((userInfo: Auth) => {
    setAuth(userInfo);
    setCookieValue(AUTH_COOKIE_KEY_EMAIL, userInfo.email);
    setCookieValue(AUTH_COOKIE_KEY_NAME, userInfo.name);
    setCookieValue(AUTH_COOKIE_KEY_TOKEN, userInfo.authToken);
  }, []);
  const logout = useCallback(() => {
    setAuth(undefined);
    clearCookieValue(AUTH_COOKIE_KEY_EMAIL);
    clearCookieValue(AUTH_COOKIE_KEY_NAME);
    clearCookieValue(AUTH_COOKIE_KEY_TOKEN);
  }, []);
  const isValidAuth = useMemo(
    () =>
      !!auth &&
      auth.email === getCookieValue(AUTH_COOKIE_KEY_EMAIL) &&
      auth.name === getCookieValue(AUTH_COOKIE_KEY_NAME) &&
      auth.authToken === getCookieValue(AUTH_COOKIE_KEY_TOKEN),
    [auth],
  );
  const value = useMemo(
    () => ({
      auth,
      login,
      logout,
      isValidAuth,
    }),
    [auth, login, logout, isValidAuth],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Auth Provider 안에서 사용해야함");
  return context;
};
