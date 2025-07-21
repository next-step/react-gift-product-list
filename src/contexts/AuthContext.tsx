import { createContext, useEffect, useState, type ReactNode } from 'react';

type User = {
  email: string;
  name: string;
};

interface AuthContextType {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = 'auth';
const LEGACY_EMAIL = 'email';
const LEGACY_TOKEN = 'token';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const { email, name } = JSON.parse(raw) as { email: string; name: string };
        setUser({ email, name });
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    } else {
      const legacyEmail = localStorage.getItem(LEGACY_EMAIL);
      const legacyToken = localStorage.getItem(LEGACY_TOKEN);
      if (legacyEmail && legacyToken) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ email: legacyEmail, name: '', authToken: legacyToken })
        );
        setUser({ email: legacyEmail, name: '' });
      }
      localStorage.removeItem(LEGACY_EMAIL);
      localStorage.removeItem(LEGACY_TOKEN);
    }
  }, []);

  const login = (user: User, authToken: string) => {
    setUser(user);
    localStorage.removeItem(LEGACY_EMAIL);
    localStorage.removeItem(LEGACY_TOKEN);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ email: user.email, name: user.name, authToken })
    );
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_EMAIL);
    localStorage.removeItem(LEGACY_TOKEN);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
