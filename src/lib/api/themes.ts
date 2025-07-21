import { api } from "./core";
import { type Theme } from "../../types/api";

export const getThemes = async (): Promise<Theme[]> => {
    const response = await api.get<{data: Theme[]}>("/themes");
    return response.data.data;
}