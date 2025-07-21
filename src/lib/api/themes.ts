import { api } from "./core";
import type { Theme, ThemeInfo } from "../../types/api";

export const getThemes = async (): Promise<Theme[]> => {
    const response = await api.get<{data: Theme[]}>("/themes");
    return response.data.data;
}

export const getThemeInfo = async (themeId: number): Promise<ThemeInfo> => {
    const response = await api.get<{data: ThemeInfo}>(`/themes/${themeId}/info`);
    return response.data.data;
}