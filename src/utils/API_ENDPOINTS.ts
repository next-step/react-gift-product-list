export const API_ENDPOINTS = {
  THEMES: "/api/themes",
  THEME_INFO: (themeId: number) => `/api/themes/${themeId}/info`,
  THEME_PRODUCTS: (themeId: number) => `/api/themes/${themeId}/products`,
  RANKING: "/api/products/ranking",
  LOGIN: "/api/login",
  PRODUCT_SUMMARY: (productId: number) => `/api/products/${productId}/summary`,
  ORDER: "/api/order",
};
