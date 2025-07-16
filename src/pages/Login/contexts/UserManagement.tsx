import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

interface User {
  authToken: string;
  email: string;
  name: string;
}

interface UserManagementContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const UserManagementContext = createContext<
  UserManagementContextType | undefined
>(undefined);

const LOCAL_STORAGE_KEY = 'kakao-login-user';

function useStorageState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    if (state) {
      localStorage.setItem(key, JSON.stringify(state));
    } else {
      localStorage.removeItem(key);
    }
  }, [key, state]);

  return [state, setState] as const;
}

export const UserManagementProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useStorageState<User | null>(LOCAL_STORAGE_KEY, null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const contextValue: UserManagementContextType = {
    user,
    login,
    logout,
  };

  return (
    <UserManagementContext.Provider value={contextValue}>
      {children}
    </UserManagementContext.Provider>
  );
};
export const UserManagement = () => {
  const context = useContext(UserManagementContext);
  if (!context)
    throw new Error(
      'UserManagement must be used within UserManagementProvider'
    );
  return context;
};
