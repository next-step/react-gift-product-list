import { api } from "@/api/api";
import { executeApi } from "@/api/ErrorHandler";

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
  }, "테마를 불러오는 중 오류가 발생했습니다.");
};
