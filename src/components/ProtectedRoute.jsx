import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";

function ProtectedRoute({ children }) {
  const { userEmail } = useAuthStore();
  const location = useLocation();

  if (!userEmail) {
    alert("You must log in first to access this page.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
