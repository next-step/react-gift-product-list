import { api } from "@/api/api";
import type { ProductType } from "@/types";

export interface ThemeProductRequestBody {
  themeId: number;
  cursor?: number;
  limit?: number;
}

export interface ThemeProductResponseBody {
  list: ProductType[];
  cursor: number;
  hasMoreList: boolean;
}

export const getThemeProducts = async ({
  themeId,
  limit = 10,
  cursor = 0,
}: ThemeProductRequestBody): Promise<ThemeProductResponseBody> => {
  const { data: response } = await api.get<
    BaseResponse<ThemeProductResponseBody>
  >(`/themes/${themeId}/products`, {
    params: {
      limit,
      cursor,
    },
  });
  return response.data;
};
