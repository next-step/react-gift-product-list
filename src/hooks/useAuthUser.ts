import { useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
}

export const useAuthUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('userInfo');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.name && parsed?.email) {
          setUser({ name: parsed.name, email: parsed.email });
          setIsLoggedIn(true);
        } else {
          throw new Error('Invalid session user');
        }
      }
    } catch (error) {
      console.error(error);
      sessionStorage.removeItem('userInfo');
      setUser(null);
      setIsLoggedIn(false);
    }
  }, []);

  return { user, isLoggedIn, setUser, setIsLoggedIn };
};
