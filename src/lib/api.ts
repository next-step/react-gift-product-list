import axios from "axios";
import { type Theme } from "../types/api";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

export const getThemes = async (): Promise<Theme[]> => {
    try {
        const response = await api.get<{data: Theme[]}>("/themes");
        return response.data.data;
    } catch (error) {
        throw error;
    }
}