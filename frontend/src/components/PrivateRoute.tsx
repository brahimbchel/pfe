import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

interface PrivateRouteProps {
  allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { user, isAuth } = useAuthStore();

  if (!isAuth || !user) {
    return <Navigate to="/auth/login" replace />; // Redirect to login if not authenticated
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // Redirect unauthorized users to home
  }

  return <Outlet />; // Render the protected component
};

export default PrivateRoute;
