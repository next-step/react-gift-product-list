import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const PrivateRoute = () => {
  const { isLoggedIn, onChangeRedirectAfterLogin } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    onChangeRedirectAfterLogin(location.pathname);
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
