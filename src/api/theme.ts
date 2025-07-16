import apiClient from "@/api/apiClient";

export type Theme = {
  themeId: number;
  name: string;
  image: string;
};

export const fetchThemes = async (): Promise<Theme[]> => {
  return await apiClient.get("/themes");
};
