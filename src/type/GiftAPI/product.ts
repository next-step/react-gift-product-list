export interface ProductItem {
  id: number;
  name: string;
  imageURL: string;
  price: {
    basicPrice: number;
    discountRate: number;
    sellingPrice: number;
  };
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
}

export interface ProductItemFromTheme {
  list: ProductItem[];
  cursor: number;
  hasMoreList: boolean;
}

export const defaultProductItemFromTheme = {
  list: [],
  cursor: 0,
  hasMoreList: true
}

export interface ProductItemSummary {
  id: number;
  name: string;
  brandName: string;
  price: number
  imageURL: string;
}

export const defaultProductItemSummary = {
  id: 0,
  name: '',
  brandName: '',
  price: 0,
  imageURL: ''
}

export interface ThemeInfo {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

export const defaultThemeInfo = {
  themeId: 0,
  name: '',
  title: '',
  description: '',
  backgroundColor: '',
}