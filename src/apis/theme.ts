import axiosInstance from "./axiosInstance";

export interface ThemeInfo {
    themeId: number;
    name: string;
    title: string;
    description: string;
    backgroundColor: string;
}

export async function getThemeInfo(themeId: string): Promise<ThemeInfo> {
    const res = await axiosInstance.get<{ data: ThemeInfo }>(`/api/themes/${themeId}/info`);
    return res.data.data;
}