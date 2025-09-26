import { Navigate } from "react-router-dom";

/**
 * Usage:
 *  <ProtectedRoute><Dashboard /></ProtectedRoute>                     // require auth
 *  <ProtectedRoute allow={["admin"]}><AdminDashboard /></ProtectedRoute>  // require admin
 */
export default function ProtectedRoute({ children, allow }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Not logged in → go to login
  if (!token) return <Navigate to="/" replace />;

  // If an allow list is provided, role must be in it
  if (Array.isArray(allow) && !allow.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
