export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  USER_DETAIL: (id: string | number) => `/users/${id}`,
};
