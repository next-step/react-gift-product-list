// 테마 관련 타입
export interface Theme {
  id: number;
  title: string;
  imageUrl: string;
  description?: string;
}

export interface ThemeResponse {
  themes: Theme[];
}

// 상품 관련 타입
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  brand?: string;
  category?: string;
  rank?: number;
}

export interface RankingResponse {
  products: Product[];
}

// 필터 옵션 타입
export type FilterOption = 'all' | 'price-asc' | 'price-desc' | 'popular';

// API 에러 타입
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}
