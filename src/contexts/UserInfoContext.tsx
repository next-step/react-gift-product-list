import { SESSION_USER_INFO_KEY } from "@/constants/storageKeys";
import useSessionStorage from "@/hooks/useSessionStorage";
import React, { createContext, useContext } from "react";

type UserInfo = {
  email: string | undefined;
  name: string | undefined;
  authToken: string | undefined;
};

type UserInfoContextType = UserInfo & {
  setUserInfo: (userInfo: UserInfo) => void;
  removeUserInfo: () => void;
};

const UserInfoContext = createContext<UserInfoContextType | null>(null);

export const UserInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const userInfo = useSessionStorage<UserInfo>(SESSION_USER_INFO_KEY, {
    email: undefined,
    name: undefined,
    authToken: undefined,
  });

  return (
    <UserInfoContext.Provider
      value={{
        email: userInfo.value.email,
        name: userInfo.value.name,
        authToken: userInfo.value.authToken,
        setUserInfo: userInfo.updateValue,
        removeUserInfo: userInfo.removeValue,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};
export const useUserInfo = () => useContext(UserInfoContext);
