import { api } from "./core";
import { type Theme } from "../../types/api";

export const getThemes = async (): Promise<Theme[]> => {
    try {
        const response = await api.get<{data: Theme[]}>("/themes");
        return response.data.data;
    } catch (error) {
        throw error;
    }
}