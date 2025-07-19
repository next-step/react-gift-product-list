import { STORAGE_KEYS } from "@/constants/storageKyes";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const userInfo = sessionStorage.getItem(STORAGE_KEYS.USER_INFO);

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute;
