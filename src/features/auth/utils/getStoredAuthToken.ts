export const AUTH_TOKEN_STORAGE_KEY = "authToken";

export const getStoredAuthToken = (): string | null => {
    try {
        const stored = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
};
