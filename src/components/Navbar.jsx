import { Link, useNavigate } from "react-router-dom";
import "../index.css";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <div className="brand">
          <Link to="/">Device Tracker</Link>
        </div>
        <nav>
          <ul>
            {/* Shared links */}
            <li><Link to="/dashboard">Dashboard</Link></li>

            {/* Role-based links */}
            {role === "admin" && <li><Link to="/admin">Admin</Link></li>}
            {(role === "police" || role === "admin") && (
              <li><Link to="/police">Police</Link></li>
            )}
            {(role === "reporter" || role === "admin") && (
              <li><Link to="/reporter">Reporter</Link></li>
            )}

            {/* Logout */}
            {role && (
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
