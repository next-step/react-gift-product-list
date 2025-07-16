import { Navigate, Outlet, useLocation } from "react-router-dom";
import { checkValidPath, ROUTE_PATH } from "./routePath";
import { useAuth } from "@/contexts/authContext";

type AuthRouteProps = {
  required?: boolean;
};

const AuthRoute = ({ required = false }: AuthRouteProps) => {
  const location = useLocation();
  const { isValidAuth } = useAuth();

  if (required && !isValidAuth) {
    return <Navigate to={`${ROUTE_PATH.LOGIN}?redirect=${location.pathname}`} replace />;
  }

  if (!required && isValidAuth) {
    const searchParams = new URLSearchParams(location.search);
    let redirectUrl = searchParams.get("redirect");
    if (!redirectUrl || !checkValidPath(redirectUrl)) {
      redirectUrl = ROUTE_PATH.HOME;
    }
    return <Navigate to={redirectUrl} replace />;
  }
  return <Outlet />;
};

export default AuthRoute;
