import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearAuth } from "../utils/auth";
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  // ✅ pull token + role from localStorage/sessionStorage
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const role =
    localStorage.getItem("role") || sessionStorage.getItem("role");

  const handleLogout = () => {
    clearAuth(); // ✅ clears auth from both localStorage + sessionStorage
    toast.info("You’ve been logged out ✅");
    navigate("/");
  };

  // ✅ compute dashboard route based on role
  const dashboardRoute =
    role === "reporter"
      ? "/reporter/dashboard"
      : role === "police"
      ? "/police/dashboard"
      : role === "admin"
      ? "/admin/dashboard"
      : "/";

  return (
    <header className="navbar">
      <div className="nav-inner">
        {/* Logo / Brand */}
        <div className="brand" onClick={() => navigate("/")} role="button">
          <div className="logo" aria-hidden="true" />
          <div className="title">
            Device <span>Tracker</span>
          </div>
        </div>

        {/* Right-side actions */}
        <nav className="nav-actions">
          {!token ? (
            // When NOT logged in → show login/register for all roles
            <>
              {/* Reporter */}
              <NavLink className="btn btn-primary" to="/reporter/login">
                Reporter Login
              </NavLink>
              <NavLink className="btn btn-outline" to="/reporter/register">
                Reporter Register
              </NavLink>

              {/* Police */}
              <NavLink className="btn btn-secondary" to="/police/login">
                Police Login
              </NavLink>
              <NavLink className="btn btn-outline" to="/police/register">
                Police Register
              </NavLink>

              {/* Admin */}
              <NavLink className="btn btn-danger" to="/admin/login">
                Admin Login
              </NavLink>
              <NavLink className="btn btn-outline" to="/admin/register">
                Admin Register
              </NavLink>
            </>
          ) : (
            // When logged in → show role + dashboard + logout
            <>
              <span className="user-role">
                Logged in as <strong>{role}</strong>
              </span>
              <NavLink className="btn btn-primary" to={dashboardRoute}>
                Dashboard
              </NavLink>
              <button className="btn btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
