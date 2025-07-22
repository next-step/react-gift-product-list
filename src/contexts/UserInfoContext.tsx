import type { UserInfoData } from '@/page/Login/hooks/useLogin';
import { createContext, useContext, useState, type PropsWithChildren } from 'react';

interface UserInfo {
  name: string;
  email: string;
  authToken: string;
}

interface Ctx {
  userInfo: UserInfo;
  setLoginSession: (userInfoData: UserInfoData) => void;
  setLogoutSession: () => void;
  isLoggedIn: boolean;
}

const UserInfoContext = createContext<Ctx | null>(null);
const EMPTY_USER_INFO: UserInfoData = { name: '', email: '', authToken: '' };

export const useUserInfo = () => {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error('useUserInfo must be used within a UserInfoProvider');
  }
  return context;
};

export const UserInfoProvider = ({ children }: PropsWithChildren) => {
  const [userInfo, setUserInfo] = useState<UserInfoData>(() => {
    const saved = sessionStorage.getItem('user');
    return saved ? JSON.parse(saved) : EMPTY_USER_INFO;
  });

  const isLoggedIn = Boolean(userInfo.email);

  const setLoginSession = (userInfoData: UserInfoData) => {
    setUserInfo(userInfoData);
    sessionStorage.setItem('user', JSON.stringify(userInfoData));
  };

  const setLogoutSession = () => {
    setUserInfo(EMPTY_USER_INFO);
    sessionStorage.setItem('user', JSON.stringify(EMPTY_USER_INFO));
  };

  return (
    <UserInfoContext.Provider value={{ userInfo, setLoginSession, setLogoutSession, isLoggedIn }}>
      {children}
    </UserInfoContext.Provider>
  );
};
