export type Theme = {
  themeId: number;
  name: string;
  image: string;
};

export type ThemeInfo = {
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

export type ThemeProduct = {
  id: number;
  name: string;
  price: ProductPrice;
  imageURL: string;
  brandInfo: BrandInfo;
};
