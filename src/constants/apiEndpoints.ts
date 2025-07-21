const API_ENDPOINTS = {
  LOGIN: "/api/login",

  THEMES: "/api/themes",
  THEME_INFO: "/api/themes/:themeId/info",
  THEME_PRODUCTS: "/api/themes/:themeId/products",

  PRODUCTS_RANKING: "/api/products/ranking",
  PRODUCT_INFO: "/api/products/:productId",
  PRODUCT_DETAIL: "/api/products/:productId/detail",
  PRODUCT_WISH: "/api/products/:productId/wish",
  PRODUCT_HIGHLIGHT_REVIEW: "/api/products/:productId/highlight-review",
  PRODUCT_SUMMARY: "/api/products/:productId/summary",

  ORDER: "/api/orders",
} as const;

export default API_ENDPOINTS;
