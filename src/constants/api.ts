export const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/';

export const SESSION_STORAGE_KEY = 'kakaotech/userInfo';
export const LOGIN_API_PATH = '/api/login';
export const ORDER_API_PATH = '/api/order';
export const PRODUCT_RANKING_API_PATH = '/api/products/ranking';
export const CATEGORY_THEMES_API_PATH = '/api/themes';

export const getProductSummaryPath = (productId: string): string =>
  `/api/products/${productId}/summary`;
export const getProductSummaryUrl = (productId: string): string =>
  `${BASE_URL}${getProductSummaryPath(productId)}`;

export const LOGIN_API_URL = `${BASE_URL}${LOGIN_API_PATH}`;
export const ORDER_API_URL = `${BASE_URL}${ORDER_API_PATH}`;
export const PRODUCT_RANKING_API_URL = `${BASE_URL}${PRODUCT_RANKING_API_PATH}`;
export const CATEGORY_THEMES_API_URL = `${BASE_URL}${CATEGORY_THEMES_API_PATH}`;
