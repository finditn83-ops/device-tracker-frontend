import { Navigate } from "react-router-dom";
import { getToken, getRole, isTokenExpired } from "../utils/auth";

export default function ProtectedRoute({ children, role }) {
  const token = getToken();
  const userRole = getRole();

  // Not logged in
  if (!token || !userRole) {
    return <Navigate to="/" replace />;
  }

  // Token expired
  if (isTokenExpired(token)) {
    return <Navigate to="/" replace />;
  }

  // Wrong role
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  // Otherwise → allow access
  return children;
}
