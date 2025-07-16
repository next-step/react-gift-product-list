import axiosInstance from "./axiosInstance";

export interface Theme {
    themeId: number;
    name: string;
    image: string;
}

export async function fetchThemes(): Promise<Theme[]> {
    const response = await axiosInstance.get<{ data: Theme[] }>("/api/themes");
    return response.data.data;
}
