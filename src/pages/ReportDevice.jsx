import { useState } from "react";

export default function ReportDevice() {
  const [imei, setImei] = useState("");
  const [serial, setSerial] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/report-device", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imei, serial, description }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Device reported successfully ✅");
        setImei("");
        setSerial("");
        setDescription("");
      } else {
        setMessage(data.message || "Failed to report device ❌");
      }
    } catch (err) {
      setMessage("Server error, please try again.");
    }
  };

  return (
    <div>
      <h2>Report Lost / Stolen Device</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="IMEI"
          value={imei}
          onChange={(e) => setImei(e.target.value)}
          required
        /><br />
        <input
          type="text"
          placeholder="Serial Number"
          value={serial}
          onChange={(e) => setSerial(e.target.value)}
        /><br />
        <textarea
          placeholder="Description (brand, color, details)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br />
        <button type="submit">Submit Report</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
