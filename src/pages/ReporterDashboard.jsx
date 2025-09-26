import { useState, useEffect } from "react";
import { apiReportDevice, apiGetDevices } from "../api";

export default function ReporterDashboard(){
  const [imei, setImei] = useState("");
  const [serial, setSerial] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");
  const [devices, setDevices] = useState([]);

  // Load my devices when page loads
  useEffect(() => {
    apiGetDevices()
      .then(setDevices)
      .catch(err => console.error("Error fetching devices:", err));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await apiReportDevice({ imei, serial, description });
      if (res?.success) {
        setMsg("Device reported successfully ✅");
        setImei("");
        setSerial("");
        setDescription("");
        // reload devices
        apiGetDevices().then(setDevices);
      } else {
        setMsg(res?.message || "Failed to report device ❌");
      }
    } catch (err) {
      setMsg("Server error: " + err.message);
    }
  };

  return (
    <div className="card">
      <h1>Reporter Dashboard</h1>

      {/* Existing devices list */}
      <h2>My Devices</h2>
      {devices.length === 0 ? (
        <p>No devices yet.</p>
      ) : (
        <table style={{ width: "100%", marginTop: 12 }}>
          <thead>
            <tr>
              <th align="left">IMEI</th>
              <th align="left">Serial</th>
              <th align="left">Status</th>
              <th align="left">Description</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((d) => (
              <tr key={d.imei}>
                <td>{d.imei}</td>
                <td>{d.serial}</td>
                <td>{d.status}</td>
                <td>{d.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Quick report form */}
      <h2 style={{ marginTop: "20px" }}>Report a New Device</h2>
      <form onSubmit={submit} style={{ maxWidth: "480px" }}>
        <label>IMEI</label>
        <input
          value={imei}
          onChange={(e) => setImei(e.target.value)}
          required
        />

        <label>Serial</label>
        <input
          value={serial}
          onChange={(e) => setSerial(e.target.value)}
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Submit Report</button>
      </form>

      {msg && <p style={{ marginTop: 8 }}>{msg}</p>}
    </div>
  );
}
