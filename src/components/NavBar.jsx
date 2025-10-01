import { Link, useNavigate } from "react-router-dom";
import { clearAuth, getAuth } from "../utils/auth";

export default function NavBar() {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    clearAuth();
    navigate("/"); // back to login
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <div className="text-lg font-bold">
        Device Tracker
      </div>

      <div className="space-x-4">
        {auth?.user?.role === "admin" && (
          <Link to="/admin/dashboard" className="hover:underline">
            Admin Dashboard
          </Link>
        )}
        {auth?.user?.role === "police" && (
          <Link to="/police/dashboard" className="hover:underline">
            Police Dashboard
          </Link>
        )}
        {auth?.user?.role === "reporter" && (
          <Link to="/reporter/dashboard" className="hover:underline">
            Reporter Dashboard
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
