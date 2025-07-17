import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const userInfo = sessionStorage.getItem("userInfo");

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
