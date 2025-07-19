export const END_POINTS = {
  THEMES: "/api/themes",
  RANKING: "/api/products/ranking",
  LOGIN: "/api/login",
  PRODUCT_INFO: "/api/products/:id/summary",
  ORDER: "/api/order",
  THEME_INFO: "/api/themes/:themeId/info",
  THEME_PRODUCTS: "/api/themes/:themeId/products",
} as const;
