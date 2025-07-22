export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  NOT_FOUND: '*',
  MY_PAGE: '/my',
  ORDER: (id = ':id') => `/order/${id}`,
  THEME: (themeId = ':themeId') => `/themes/${themeId}`,
};
