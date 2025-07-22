import axios from "axios";

import { getStoredAuthToken } from "@/features/auth/utils/getStoredAuthToken";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000, // 10s
});

api.interceptors.request.use((config) => {
    const authToken = getStoredAuthToken();

    if (!authToken) return config;

    config.headers.Authorization = authToken;
    return config;
});

api.interceptors.response.use((response) => {
    return response;
});
