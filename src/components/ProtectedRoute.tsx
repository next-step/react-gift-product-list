import { STORAGE_KEYS } from "@/constants/storageKyes";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const userInfo = sessionStorage.getItem(STORAGE_KEYS.USER_INFO);

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
