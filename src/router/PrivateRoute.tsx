import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const PrivateRoute = () => {
  const { isLoggedIn, setRedirectAfterLogin } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    setRedirectAfterLogin(location.pathname);
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
