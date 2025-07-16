import React, { createContext, useContext, useState } from 'react';
import { USER_INFO_KEY, ERROR } from './storageKeys';

interface UserInfo {
    email: string;
    name: string;
    authToken: string;
}

interface LoginContextType {
    isLoggedIn: boolean;
    userInfo: UserInfo | null;
    login: (userInfo: UserInfo) => void;
    logout: () => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
        const storedUserInfo = localStorage.getItem(USER_INFO_KEY);
        return storedUserInfo ? JSON.parse(storedUserInfo) : null;
    });
    const [isLoggedIn, setIsLoggedIn] = useState(() => !!userInfo);

    const login = (newUserInfo: UserInfo) => {
        localStorage.setItem(USER_INFO_KEY, JSON.stringify(newUserInfo));
        setIsLoggedIn(true);
        setUserInfo(newUserInfo);
    };

    const logout = () => {
        localStorage.removeItem(USER_INFO_KEY);
        setIsLoggedIn(false);
        setUserInfo(null);
    };

    return (
        <LoginContext.Provider value={{ isLoggedIn, userInfo, login, logout }}>
            {children}
        </LoginContext.Provider>
    );
};

export function useLogin() {
    const ctx = useContext(LoginContext);
    if (!ctx) throw new Error(ERROR);
    return ctx;
}
