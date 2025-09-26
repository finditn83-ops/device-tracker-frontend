import { Link } from "react-router-dom";

export default function Dashboard() {
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");

  const renderRoleMessage = () => {
    switch (role) {
      case "admin":
        return (
          <>
            <h2>Welcome Admin!</h2>
            <p>You can manage all users, view all reports, and oversee the system.</p>
            <ul style={{ marginTop: "12px" }}>
              <li><Link to="/admin">Go to Admin Dashboard</Link></li>
              <li><Link to="/police">View Reported Devices (Police Dashboard)</Link></li>
              <li><Link to="/reporter">View Reporter Dashboard</Link></li>
            </ul>
          </>
        );
      case "police":
        return (
          <>
            <h2>Welcome Police Officer!</h2>
            <p>You can access reported devices and assist with investigations.</p>
            <ul style={{ marginTop: "12px" }}>
              <li><Link to="/police">Go to Police Dashboard</Link></li>
              <li><Link to="/dashboard">Back to Main Dashboard</Link></li>
            </ul>
          </>
        );
      case "reporter":
        return (
          <>
            <h2>Welcome Reporter!</h2>
            <p>You can report lost/stolen devices and track your submissions.</p>
            <ul style={{ marginTop: "12px" }}>
              <li><Link to="/reporter">Go to Reporter Dashboard</Link></li>
              <li><Link to="/dashboard">Back to Main Dashboard</Link></li>
            </ul>
          </>
        );
      default:
        return (
          <>
            <h2>Welcome Guest</h2>
            <p>Please log in to access your dashboard features.</p>
            <ul style={{ marginTop: "12px" }}>
              <li><Link to="/">Go to Login</Link></li>
            </ul>
          </>
        );
    }
  };

  return (
    <div className="card">
      <h1>Main Dashboard</h1>
      <p>Logged in as: <strong>{user || "Guest"}</strong></p>
      {renderRoleMessage()}
    </div>
  );
}
