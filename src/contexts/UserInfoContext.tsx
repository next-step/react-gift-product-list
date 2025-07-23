import { createContext } from 'react';

interface User {
  email: string;
  password: string;
}

interface UserInfoContextType {
  isValid: boolean;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserInfoContext = createContext<UserInfoContextType | null>(null);
