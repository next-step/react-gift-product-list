export const BASE_URL = import.meta.env.VITE_BASE_URL;

const ENDPOINTS = {
  THEMES: '/themes',
  RANKING: '/products/ranking',
  LOGIN: '/login',
  ORDER: '/order',
};

export const THEME_URL = `${BASE_URL}${ENDPOINTS.THEMES}`;

export const RANKING_URL = `${BASE_URL}${ENDPOINTS.RANKING}`;

export const LOGIN_URL = `${BASE_URL}${ENDPOINTS.LOGIN}`;

export const ORDER_URL = `${BASE_URL}${ENDPOINTS.ORDER}`;

export const PRODUCT_SUMMARY_URL = (id: number) => `${BASE_URL}/products/${id}/summary`;

export const THEMES_INFO = (themesId: number) => `${BASE_URL}/themes/${themesId}/info`;

export const THEMES_PRODUCTS = (themesId: number) => `${BASE_URL}/themes/${themesId}/products`;
