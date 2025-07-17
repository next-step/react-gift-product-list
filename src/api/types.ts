// 테마 관련 타입
export interface Theme {
  themeId: number;
  name: string;
  image: string;
}

export interface ThemeResponse {
  data: Theme[];
}

// 상품 관련 타입
export interface ProductPrice {
  basicPrice: number;
  sellingPrice: number;
  discountRate: number;
}

export interface ProductBrand {
  id: number;
  name: string;
  imageURL: string;
}

export interface Product {
  id: number;
  name: string;
  price: ProductPrice;
  imageURL: string;
  brandInfo: ProductBrand;
}

export interface RankingResponse {
  data: Product[];
}

export interface ProductResponse {
  data: Product;
}

// 랭킹 필터 타입 (API 명세에 맞게 수정)
export type TargetType = 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
export type RankType = 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';

// API 에러 타입
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}
