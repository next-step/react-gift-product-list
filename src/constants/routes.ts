export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  MY: '/my',
  ORDER: (id: number | string) => `/order/${id}`,
  ORDER_PATH: '/order/:id',
  THEME: (themeId: number | string) => `/themes/${themeId}`,
  THEME_PATH: '/themes/:themeid',
  NOT_FOUND: '*',
} as const;
