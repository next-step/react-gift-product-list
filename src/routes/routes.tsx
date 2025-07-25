import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RouterPath } from "@/routes/path";
import HomePage from "@/pages/Home/Home";
import LoginPage from "@/pages/Login/Login";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
import MyPage from "@/pages/MyPage/MyPage";
import ThemePage from "@/pages/ThemePage/ThemePage";
import OrderPage from "@/pages/OrderPage/OrderPage";

const router = createBrowserRouter([
  {
    path: RouterPath.HOME,
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: RouterPath.LOGIN,
    element: <LoginPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: RouterPath.MYPAGE,
    element: <MyPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: RouterPath.THEME.DETAIL,
    element: <ThemePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: RouterPath.ORDER.DETAIL,
    element: <OrderPage />,
    errorElement: <NotFoundPage />,
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
