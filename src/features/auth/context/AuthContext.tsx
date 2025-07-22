import { createContext, useContext } from "react";

import { AUTH_TOKEN_STORAGE_KEY } from "@/features/auth/utils/getStoredAuthToken";

import { useLocalStorageState, type SerializableRecord } from "@/shared/hooks/useLocalStorageState";

export interface UserInfo extends SerializableRecord {
    isAuthenticated: boolean;
    nickname?: string;
    email?: string;
}

export const USER_INFO_STORAGE_KEY = "userInfo";

export const AuthContext = createContext<{
    userInfo: UserInfo;
    setUserInfo: (value: UserInfo) => void;
    authToken: string | null;
    setAuthToken: (value: string | null) => void;
} | null>(null);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
    const [userInfo, setUserInfo] = useLocalStorageState<UserInfo>(USER_INFO_STORAGE_KEY, {
        isAuthenticated: false,
        nickname: undefined,
        email: undefined,
    });

    const [authToken, setAuthToken] = useLocalStorageState<string | null>(
        AUTH_TOKEN_STORAGE_KEY,
        null,
    );

    return (
        <AuthContext.Provider
            value={{
                userInfo,
                setUserInfo,
                authToken,
                setAuthToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }
    return context;
};
