import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken, getRole, clearAuth } from "../utils/auth"; // ✅ helpers

export default function Navbar() {
  const [token, setToken] = useState(getToken());
  const [role, setRole] = useState(getRole());
  const navigate = useNavigate();

  useEffect(() => {
    setToken(getToken());
    setRole(getRole());
  }, []);

  const handleLogout = () => {
    clearAuth(); // clear token + role
    setToken(null);
    setRole(null);
    navigate("/"); // back to login
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md">
      {/* Left: Brand */}
      <Link to="/" className="text-xl font-bold">
        Device Tracker
      </Link>

      {/* Right: Menu */}
      <div className="space-x-4">
        {!token ? (
          // Not logged in → show Login/Register
          <>
            <Link to="/" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        ) : (
          // Logged in → show Dashboard + Logout
          <>
            {role === "reporter" && (
              <Link to="/reporter/dashboard" className="hover:underline">
                Dashboard
              </Link>
            )}
            {role === "police" && (
              <Link to="/police/dashboard" className="hover:underline">
                Dashboard
              </Link>
            )}
            {role === "admin" && (
              <Link to="/admin/dashboard" className="hover:underline">
                Dashboard
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
