export const PRODUCT_GRID_TYPES = {
  TRENDING_GIFTS: "trendingGifts",
  THEME_PRODUCTS: "themeProducts",
} as const;

export type ProductGridType =
  (typeof PRODUCT_GRID_TYPES)[keyof typeof PRODUCT_GRID_TYPES];
