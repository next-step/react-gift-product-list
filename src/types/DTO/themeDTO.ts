import type { CardItemData } from "@/types/DTO/productDTO";

export type Themetype = {
  themeId: number;
  name: string;
  image: string;
};

export interface ThemeProductsResponseDTO {
  list: CardItemData[];
  cursor: number;
  hasMoreList: boolean;
}

export interface ThemeInfoResponseDTO {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}
