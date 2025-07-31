import { useState, useEffect } from 'react';
import { createStorage } from '@/utils/creaateStorage';

interface User {
  name: string;
  email: string;
}

const storage = createStorage<{ name: string; email: string }>('userInfo');

export const useAuthUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const stored = storage.get();
      if (stored && stored.name && stored.email) {
        setUser({ name: stored.name, email: stored.email });
        setIsLoggedIn(true);
      } else {
        throw new Error('Invalid session user');
      }
    } catch (error) {
      console.error(error);
      storage.clear();
      setUser(null);
      setIsLoggedIn(false);
    }
  }, []);

  return { user, isLoggedIn, setUser, setIsLoggedIn, storage };
};
