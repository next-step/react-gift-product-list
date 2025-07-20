import { useAuthContext } from "@/features/auth/context/AuthContext";

export const useAuth = () => {
    const { authState, setAuthState } = useAuthContext();

    const signIn = async (email: string, authToken: string) => {
        setAuthState({
            isAuthenticated: true,
            nickname: email.split("@")[0],
            email,
            authToken,
        });
    };

    const signOut = () => {
        setAuthState({
            isAuthenticated: false,
            nickname: undefined,
            email: undefined,
            authToken: undefined,
        });
    };

    return {
        ...authState,
        signIn,
        signOut,
    };
};
