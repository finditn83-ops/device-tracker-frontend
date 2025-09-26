import { useEffect, useState } from "react";
import { apiGetReports, apiLocate, apiRing } from "../api";

export default function PoliceDashboard() {
  const [reports, setReports] = useState([]);
  const [msg, setMsg] = useState("");

  // load all reports on mount
  useEffect(() => {
    apiGetReports()
      .then(setReports)
      .catch((err) => console.error("Error fetching reports:", err));
  }, []);

  const markRecovered = async (id) => {
    try {
      // This assumes you have a backend endpoint like:
      // PATCH /reports/:id { status: "Recovered" }
      const res = await fetch(`http://localhost:3000/reports/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Recovered" }),
      });
      if (!res.ok) throw new Error("Failed to update");
      setMsg("Device marked as Recovered ✅");
      // refresh reports
      apiGetReports().then(setReports);
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };

  return (
    <div className="card">
      <h1>Police Dashboard</h1>
      <p>All reported devices</p>

      {msg && <p style={{ color: "green" }}>{msg}</p>}

      {reports.length === 0 ? (
        <p>No reports yet.</p>
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
                  <button onClick={() => apiLocate(r.imei).then(() => setMsg("Locate requested"))}>
                    Locate
                  </button>{" "}
                  <button onClick={() => apiRing(r.imei).then(() => setMsg("Ring requested"))}>
                    Ring
                  </button>{" "}
                  <button onClick={() => markRecovered(r.id)}>Mark as Recovered</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
