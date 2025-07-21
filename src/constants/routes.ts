export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  MY: "/my",
  ORDER_DETAIL: (productId: number | string) => `/order/${productId}`,
  ORDER_DETAIL_TEMPLATE: "/order/:productId",
  THEME_DETAIL_TEMPLATE: "/themes/:themeId",
};
