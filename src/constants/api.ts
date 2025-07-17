export const SESSION_STORAGE_KEY = 'kakaotech/userInfo';
export const LOGIN_API_PATH = '/api/login';
export const ORDER_API_PATH = '/api/order';
export const PRODUCT_RANKING_API_PATH = '/api/products/ranking';
export const CATEGORY_THEMES_API_PATH = '/api/themes';

export const getProductSummaryPath = (productId: string): string =>
  `/api/products/${productId}/summary`;
