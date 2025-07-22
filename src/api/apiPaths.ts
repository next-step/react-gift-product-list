export const API_PATHS = {
  PRODUCTS_RANKING: "/api/products/ranking",
  THEMES: "/api/themes",
  LOGIN: "/api/login",
  PRODUCT_SUMMARY: (productId: string | number) =>
    `/api/products/${productId}/summary`,
  THEMES_INFO: (themeId: string | number) => `/api/themes/${themeId}/info`,
  THEMES_PRODUCTS: (themeId: string | number) =>
    `/api/themes/${themeId}/products`,
  ORDER: "/api/order",
};
