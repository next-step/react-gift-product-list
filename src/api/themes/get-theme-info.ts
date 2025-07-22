import { api } from "@/api/api";

export interface ThemeInfoResponseBody {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

export const getThemeInfo = async (
  themeId: number,
): Promise<ThemeInfoResponseBody> => {
  const { data: response } = await api.get<BaseResponse<ThemeInfoResponseBody>>(
    `/themes/${themeId}/info`,
  );
  return response.data;
};
