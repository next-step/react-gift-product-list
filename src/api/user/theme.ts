import apiUser from "@/api/common/apiUser";
import type {
  Themetype,
  ThemeInfoResponseDTO,
  ThemeProductsResponseDTO,
} from "@/types/DTO/themeDTO";
import type { CardItemData } from "@/types/DTO/productDTO";

export async function getThemes(): Promise<Themetype[]> {
  const response = await apiUser.get<{ data: Themetype[] }>("/themes");
  return response.data.data;
}

export async function getThemeInfo(
  themeId: number
): Promise<ThemeInfoResponseDTO> {
  const response = await apiUser.get<{ data: ThemeInfoResponseDTO }>(
    `/themes/${themeId}/info`
  );
  return response.data.data;
}

export async function getThemeProducts(
  themeId: number,
  cursor: number = 0,
  limit: number = 15
): Promise<{
  list: CardItemData[];
  cursor: number;
  hasMoreList: boolean;
}> {
  const response = await apiUser.get<{ data: ThemeProductsResponseDTO }>(
    `/themes/${themeId}/products`,
    {
      params: {
        cursor,
        limit,
      },
    }
  );
  return response.data.data;
}
