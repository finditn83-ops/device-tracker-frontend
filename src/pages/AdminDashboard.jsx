import { useEffect, useState } from "react";
import { apiGetUsers, apiGetReports } from "../api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [msg, setMsg] = useState("");

  // new user form state
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "reporter",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    apiGetUsers().then(setUsers).catch(console.error);
    apiGetReports().then(setReports).catch(console.error);
  };

  // Create new user
  const createUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!res.ok) throw new Error("Failed to create user");
      setMsg("User created ✅");
      setNewUser({ username: "", password: "", role: "reporter" });
      loadData();
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete user");
      setMsg("User deleted ✅");
      loadData();
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };

  // Reset user password
  const resetUserPassword = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/users/${id}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: "default123" }),
      });
      if (!res.ok) throw new Error("Failed to reset password");
      setMsg("Password reset to default123 ✅");
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };

  // Delete report
  const deleteReport = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/reports/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete report");
      setMsg("Report deleted ✅");
      loadData();
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };

  return (
    <div className="card">
      <h1>Admin Dashboard</h1>
      {msg && <p style={{ color: "green" }}>{msg}</p>}

      {/* Create User form */}
      <h2>Create New User</h2>
      <form onSubmit={createUser} style={{ maxWidth: "480px", marginBottom: "20px" }}>
        <label>Username</label>
        <input
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />

        <label>Role</label>
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="reporter">Reporter</option>
          <option value="police">Police</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Create User</button>
      </form>

      {/* Users table */}
      <h2>Manage Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table style={{ width: "100%", marginTop: 12 }}>
          <thead>
            <tr>
              <th align="left">Username</th>
              <th align="left">Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.username || u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button onClick={() => deleteUser(u.id)}>Delete</button>{" "}
                  <button onClick={() => resetUserPassword(u.id)}>
                    Reset Password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Reports table */}
      <h2 style={{ marginTop: "20px" }}>Manage Reports</h2>
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <table style={{ width: "100%", marginTop: 12 }}>
          <thead>
            <tr>
              <th align="left">IMEI</th>
              <th align="left">Serial</th>
              <th align="left">Description</th>
              <th align="left">Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id}>
                <td>{r.imei}</td>
                <td>{r.serial}</td>
                <td>{r.description}</td>
                <td>{r.status}</td>
                <td>
                  <button onClick={() => deleteReport(r.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
