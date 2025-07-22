import Login from "@/pages/Login";
import Main from "@/pages/Main";
import My from "@/pages/My";
import NotFound from "@/pages/NotFound";
import Order from "@/pages/Order";
import Theme from '@/pages/Theme';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export const ROUTE_PATH = {
  HOME: "/",
  LOGIN: "/login",
  NOT_FOUND: "*",
  MY: "/my",
  ORDER: "/order/:productId",
  THEME: "/themes/:themeId",
};
const router = createBrowserRouter([
  { path: ROUTE_PATH.HOME, element: <Main /> },
  { path: ROUTE_PATH.LOGIN, element: <Login /> },
  { path: ROUTE_PATH.MY, element: <My /> },
  { path: ROUTE_PATH.ORDER, element: <Order /> },
  { path: ROUTE_PATH.THEME, element: <Theme/> }, // 테마 경로
  { path: ROUTE_PATH.NOT_FOUND, element: <NotFound /> }, // * 와일드카드 위치
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
