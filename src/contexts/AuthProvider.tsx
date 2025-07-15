import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<User | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUserState(JSON.parse(storedUser));
        }
        setIsInitialized(true);
    }, []);

    const setUser = (user: User) => {
        setUserState(user);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const logout = () => {
        setUserState(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, isLoggedIn: !!user, logout, isInitialized }}>
            {children}
        </AuthContext.Provider>
    );
};