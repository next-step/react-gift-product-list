import type { Product } from '@/api/types/product'

// * 테마 인터페이스
export interface Theme {
  themeId: number
  name: string
  image: string
}

// * 테마 상세 정보 타입
export interface ThemeInfo {
  themeId: number
  name: string
  title: string
  description: string
  backgroundColor: string
}

// * 테마별 상품 목록 응답 타입
export interface ThemeProductListResponse {
  list: Product[]
  cursor: number
  hasMoreList: boolean
}
