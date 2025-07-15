import apiClient from "./apiClient";

export type Theme = {
  themeId: number;
  name: string;
  image: string;
};

export const fetchThemes = async (): Promise<Theme[]> => {
  return await apiClient.get("/themes");
};
