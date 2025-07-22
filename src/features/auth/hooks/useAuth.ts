import { useAuthContext } from "@/features/auth/context/AuthContext";

export const useAuth = () => {
    const { userInfo, setUserInfo, authToken, setAuthToken } = useAuthContext();

    const signIn = async (email: string, token: string) => {
        setUserInfo({
            isAuthenticated: true,
            nickname: email.split("@")[0],
            email,
        });
        setAuthToken(token);
    };

    const signOut = () => {
        setUserInfo({
            isAuthenticated: false,
            nickname: undefined,
            email: undefined,
        });
        setAuthToken(null);
    };

    return {
        ...userInfo,
        authToken,
        signIn,
        signOut,
    };
};
