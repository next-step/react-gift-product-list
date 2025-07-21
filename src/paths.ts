export const PATH = {
  HOME: "/",
  LOGIN: "/login",
  MY: "/my",
  ORDER: "/order/:itemId",
  toORDER: (itemId: string | number) => `/order/${itemId}`,
  THEME: "/themes/:themeId",
  NOTFOUND: "*",
};
