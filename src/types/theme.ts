import type { Product } from './Product';

export interface GiftThemeType {
  themeId: number;
  name: string;
  image: string;
}

export interface ThemeListType {
  list: Product[];
  cursor: number;
  hasMoreList: boolean;
}
