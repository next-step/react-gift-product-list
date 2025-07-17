// * API 엔드포인트 통합 상수 관리
export const API_ENDPOINTS = {
  // Auth 관련
  AUTH: {
    LOGIN: '/api/login',
  },

  // Product 관련
  PRODUCTS: {
    RANKING: '/api/products/ranking',
    SUMMARY: (productId: number) => `/api/products/${productId}/summary`,
  },

  // Theme 관련
  THEMES: {
    LIST: '/api/themes',
  },
} as const
