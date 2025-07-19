//테마 목록 조회용
import { client } from "./client";

export interface Theme {
  themeId: number;
  name: string;
  image: string;
}
export interface ThemeInfo {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

interface FetchThemesResponse {
  data: Theme[];
}


export const fetchThemes = async (): Promise<Theme[]> => {
  const response = await client.get<FetchThemesResponse>("/api/themes");
  return response.data.data;
};

export const fetchThemeInfo = async (
  themeId: number
): Promise<ThemeInfo> => {
  const response = await client.get<{ data: ThemeInfo }>(
    `/api/themes/${themeId}/info`
  );
  return response.data.data;
};