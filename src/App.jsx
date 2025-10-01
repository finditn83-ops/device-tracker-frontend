import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

// Pages
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import ResetPassword from "./pages/ResetPassword";
import ReporterDashboard from "./pages/ReporterDashboard";
import PoliceDashboard from "./pages/PoliceDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

// Protected route wrapper
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Dashboards (protected by role) */}
          <Route
            path="/reporter/dashboard"
            element={
              <ProtectedRoute role="reporter">
                <ReporterDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/police/dashboard"
            element={
              <ProtectedRoute role="police">
                <PoliceDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
