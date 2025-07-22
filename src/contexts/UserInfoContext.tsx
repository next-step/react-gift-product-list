import { createContext, useContext, useState, type PropsWithChildren } from 'react';

interface UserInfo {
  name: string;
  email: string;
  token: string;
}

interface Ctx {
  userInfo: UserInfo;
  setLoginSession: (name: string, email: string, token: string) => void;
  setLogoutSession: () => void;
  isLoggedIn: boolean;
}

const UserInfoContext = createContext<Ctx | null>(null);

export const useUserInfo = () => {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error('useUserInfo must be used within a UserInfoProvider');
  }
  return context;
};

export const UserInfoProvider = ({ children }: PropsWithChildren) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(() => ({
    name: sessionStorage.getItem('name') ?? '',
    email: sessionStorage.getItem('email') ?? '',
    token: sessionStorage.getItem('token') ?? '',
  }));

  const isLoggedIn = Boolean(userInfo.email);

  const setLoginSession = (name: string, email: string, token: string) => {
    setUserInfo({ name, email, token });
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('token', token);
  };

  const setLogoutSession = () => {
    setUserInfo({ name: '', email: '', token: '' });
    sessionStorage.clear();
  };

  return (
    <UserInfoContext.Provider value={{ userInfo, setLoginSession, setLogoutSession, isLoggedIn }}>
      {children}
    </UserInfoContext.Provider>
  );
};
