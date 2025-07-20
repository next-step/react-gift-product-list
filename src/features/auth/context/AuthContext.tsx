import { createContext, useContext } from "react";

import { useLocalStorageState, type SerializableRecord } from "@/shared/hooks/useLocalStorageState";
import { JSONSerializer } from "@/shared/utils/json";

export interface AuthContextValue extends SerializableRecord {
    isAuthenticated: boolean;
    nickname?: string;
    email?: string;
    authToken?: string;
}

export const AUTH_STORAGE_KEY = "auth";

export const AuthContext = createContext<{
    authState: AuthContextValue;
    setAuthState: (value: AuthContextValue) => void;
} | null>(null);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
    const [authState, setAuthState] = useLocalStorageState<AuthContextValue>(AUTH_STORAGE_KEY, {
        isAuthenticated: false,
        nickname: undefined,
        email: undefined,
        authToken: undefined,
    });

    return (
        <AuthContext.Provider
            value={{
                authState,
                setAuthState,
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

export const getAuthToken = () => {
    return JSONSerializer.parse<AuthContextValue>(localStorage.getItem(AUTH_STORAGE_KEY) ?? "");
};
