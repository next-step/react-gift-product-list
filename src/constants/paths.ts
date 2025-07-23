export const PATH = {
  ROOT: '/',
  LOGIN: '/login',
  MY_PAGE: '/my',
  ORDER_DETAIL: (id: string | number) => `/order/${id}`,
  ORDER_DETAIL_PATH: '/order/:id', // router 설정용
};
