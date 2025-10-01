import { useState } from "react";
import { trackDevice, locateDevice, ringDevice, getDevice } from "../api";

export default function Dashboard({ token }) {
  const [imei, setImei] = useState("");
  const [deviceInfo, setDeviceInfo] = useState(null);

  async function handleTrack() {
    const data = await trackDevice({ imei, serial: "SN123", lat: -15.38, lng: 28.32 }, token);
    setDeviceInfo(data);
  }

  async function handleLocate() {
    const data = await locateDevice(imei, token);
    setDeviceInfo(data);
  }

  async function handleRing() {
    const data = await ringDevice(imei, token);
    alert(data.message || "Ring failed");
  }

  async function handleGet() {
    const data = await getDevice(imei, token);
    setDeviceInfo(data);
  }

  return (
    <div className="p-4">
      <h2 className="text-xl">Dashboard</h2>
      <input value={imei} onChange={(e) => setImei(e.target.value)} placeholder="Enter IMEI" />
      <button onClick={handleTrack}>Track</button>
      <button onClick={handleGet}>Get Info</button>
      <button onClick={handleLocate}>Locate</button>
      <button onClick={handleRing}>Ring</button>

      {deviceInfo && (
        <pre>{JSON.stringify(deviceInfo, null, 2)}</pre>
      )}
    </div>
  );
}
