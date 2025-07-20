import { api } from "@/api/api";

export interface GetThemesResponseBody {
  themeId: number;
  name: string;
  image: string;
}
export const getThemes = async (): Promise<GetThemesResponseBody[]> => {
  const { data: response } =
    await api.get<BaseResponse<GetThemesResponseBody[]>>("/themes");
  return response.data;
};
