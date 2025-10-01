import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";

// Pages
import Home from "./pages/Home";
import ReporterLogin from "./pages/ReporterLogin";
import PoliceLogin from "./pages/PoliceLogin";
import AdminLogin from "./pages/AdminLogin";
import ReporterRegister from "./pages/ReporterRegister";
import PoliceRegister from "./pages/PoliceRegister";
import AdminRegister from "./pages/AdminRegister";
import ReporterDashboard from "./pages/ReporterDashboard";
import PoliceDashboard from "./pages/PoliceDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

// Protected route wrapper
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      {/* ✅ Global Navbar */}
      <Navbar />

      {/* ✅ Suspense fallback for lazy loading */}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />

          {/* Login routes */}
          <Route path="/reporter/login" element={<ReporterLogin />} />
          <Route path="/police/login" element={<PoliceLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Register routes */}
          <Route path="/reporter/register" element={<ReporterRegister />} />
          <Route path="/police/register" element={<PoliceRegister />} />
          <Route path="/admin/register" element={<AdminRegister />} />

          {/* Dashboards (role protected) */}
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
