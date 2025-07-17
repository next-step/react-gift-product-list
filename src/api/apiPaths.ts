export const API_PATHS = {
  PRODUCTS_RANKING: "/api/products/ranking",
  THEMES: "/api/themes",
  LOGIN: "/api/login",
  PRODUCT_SUMMARY: (productId: string | number) =>
    `/api/products/${productId}/summary`,
  ORDER: "/api/order",
};
