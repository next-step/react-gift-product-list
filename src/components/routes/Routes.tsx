import { Route, Routes as RouterRoutes } from "react-router-dom";
import AuthRoute from "@/components/routes/AuthRoute";
import { ROUTE_PATH } from "@/components/routes/routePath";
import GiftPage from "@/pages/Gift/GiftPage";
import LoginPage from "@/pages/Login/LoginPage";
import ProfilePage from "@/pages/Profile/ProfilePage";
import OrderPage from "@/pages/Order/OrderPage";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";
import ThemesPage from "@/pages/Themes/ThemesPage";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path={ROUTE_PATH.HOME} element={<GiftPage />} />
      <Route path={ROUTE_PATH.THEMES_ID} element={<ThemesPage />} />
      <Route element={<AuthRoute />}>
        <Route path={ROUTE_PATH.LOGIN} element={<LoginPage />} />
      </Route>
      <Route element={<AuthRoute required />}>
        <Route path={ROUTE_PATH.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTE_PATH.ORDER_ID} element={<OrderPage />} />
      </Route>
      <Route path={ROUTE_PATH.NOT_FOUND} element={<NotFoundPage />} />
    </RouterRoutes>
  );
};

export default Routes;
