export type Theme = {
  themeId: number;
  name: string;
  image: string;
};

export type ThemesInfo = {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
};

export type ProductPrice = {
  basicPrice: number;
  sellingPrice: number;
  discountRate: number;
};

export type BrandInfo = {
  id: number;
  name: string;
  imageURL: string;
};

export type ThemesProduct = {
  id: number;
  name: string;
  price: ThemesProductPrice;
  imageURL: string;
  brandInfo: ThemesBrandInfo;
};
