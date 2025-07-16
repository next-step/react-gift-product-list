import { api } from "@/api/api";
import { executeApi } from "@/api/ErrorHandler";
import { API_ERROR_MESSAGE } from "@/constants";

export interface GetThemesResponseBody {
  themeId: number;
  name: string;
  image: string;
}
export const getThemes = async (): Promise<GetThemesResponseBody[]> => {
  return executeApi(async () => {
    const { data: response } =
      await api.get<BaseResponse<GetThemesResponseBody[]>>("/themes");
    return response.data;
  }, API_ERROR_MESSAGE.THEMES);
};
