import { api } from "./core";
import type { Theme, ThemeInfo, ThemeProductsResponse } from "../../types/api";

export const getThemes = async (): Promise<Theme[]> => {
    const response = await api.get<{data: Theme[]}>("/themes");
    return response.data.data;
}

export const getThemeInfo = async (themeId: number): Promise<ThemeInfo> => {
    const response = await api.get<{data: ThemeInfo}>(`/themes/${themeId}/info`);
    return response.data.data;
}

export const getThemeProducts = async (
    themeId: number,
    cursor = 0,
    limit = 10
): Promise<ThemeProductsResponse> => {
    const response = await api.get<{data: ThemeProductsResponse}>(
        `/themes/${themeId}/products`,
        { params: { cursor, limit } }
    );
    return response.data.data;
}