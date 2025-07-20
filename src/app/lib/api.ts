import axios from "axios";

import { getAuthToken } from "@/features/auth/context/AuthContext";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000, // 10s
});

api.interceptors.request.use((config) => {
    const { authToken } = getAuthToken();

    if (!authToken) return config;

    config.headers.Authorization = authToken;
    return config;
});

api.interceptors.response.use((response) => {
    return response;
});
