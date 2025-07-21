export const API_THEMES_PATH = {
  base: '/api/themes',
  themeInfo: (themeId: string) => `/api/themes/${themeId}/info`,
  themeProducts: (themeId: string) => `/api/themes/${themeId}/products`,
};
