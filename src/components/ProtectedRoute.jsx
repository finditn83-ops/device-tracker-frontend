import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getToken, getRole, isTokenExpired } from "../utils/auth";

export default function ProtectedRoute({ children, role }) {
  const token = getToken();
  const userRole = getRole();

  if (!token) {
    toast.warn("Please login first ❌");
    return <Navigate to="/" replace />;
  }

  if (isTokenExpired(token)) {
    localStorage.clear();
    sessionStorage.clear();
    toast.info("Session expired. Please log in again ⚠️");
    return <Navigate to="/" replace />;
  }

  if (role && userRole !== role) {
    toast.error("Access denied 🚫");
    return <Navigate to="/" replace />;
  }

  return children;
}
