import { Suspense, lazy } from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";
import AuthRoute from "@/components/routes/AuthRoute";
import { ROUTE_PATH } from "@/components/routes/routePath";

const GiftPage = lazy(() => import("@/pages/Gift/GiftPage"));
const LoginPage = lazy(() => import("@/pages/Login/LoginPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFound/NotFoundPage"));
const ProfilePage = lazy(() => import("@/pages/Profile/ProfilePage"));
const OrderPage = lazy(() => import("@/pages/Order/OrderPage"));
const Loading = lazy(() => import("@/components/common/Loading"));

const Routes = () => {
  return (
    <Suspense fallback={<Loading height="100vh" />}>
      <RouterRoutes>
        <Route path={ROUTE_PATH.HOME} element={<GiftPage />} />
        <Route element={<AuthRoute />}>
          <Route path={ROUTE_PATH.LOGIN} element={<LoginPage />} />
        </Route>
        <Route element={<AuthRoute required />}>
          <Route path={ROUTE_PATH.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTE_PATH.ORDER_ID} element={<OrderPage />} />
        </Route>
        <Route path={ROUTE_PATH.NOT_FOUND} element={<NotFoundPage />} />
      </RouterRoutes>
    </Suspense>
  );
};

export default Routes;
