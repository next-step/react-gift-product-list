export interface ThemeInfo {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

export interface Price {
  basicPrice: number;
  sellingPrice: number;
  discountRate: number;
}

export interface BrandInfo {
  id: number;
  name: string;
  imageURL: string;
}

export interface Product {
  id: number;
  name: string;
  imageURL: string;
  price: Price;
  brandInfo: BrandInfo;
}
