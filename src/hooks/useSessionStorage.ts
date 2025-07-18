import { useState, useEffect } from "react";

const USER_KEY = "user";
const TOKEN_KEY = "token";

type User = {
  id: string;
  email: string;
};

export function useSessionStorage() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem(USER_KEY);
    const storedToken = sessionStorage.getItem(TOKEN_KEY);

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const saveAuth = (userData: User, token: string) => {
    sessionStorage.setItem(USER_KEY, JSON.stringify(userData));
    sessionStorage.setItem(TOKEN_KEY, token);
    setUser(userData);
    setToken(token);
  };

  const clearAuth = () => {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setToken(null);
  };

  return { user, token, saveAuth, clearAuth };
}
