export const PATH = {
  HOME: "/",
  LOGIN: "/login",
  MY_PAGE: "/my",
  ORDER: (id: string | number = ":id") => `/order/${id}`,
  NOT_FOUND: "/not-found",
} as const;
