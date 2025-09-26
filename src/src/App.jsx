import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PoliceDashboard from "./pages/PoliceDashboard";
import ReporterDashboard from "./pages/ReporterDashboard";

// protection
import ProtectedRoute from "./components/ProtectedRoute";

export default function App(){
  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingTop: 16 }}>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* AUTH-ONLY (any logged-in role) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ROLE-PROTECTED ROUTES */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allow={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/police"
            element={
              <ProtectedRoute allow={["police","admin"]}>
                <PoliceDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reporter"
            element={
              <ProtectedRoute allow={["reporter","admin"]}>
                <ReporterDashboard />
              </ProtectedRoute>
            }
          />

          {/* FALLBACK */}
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}
