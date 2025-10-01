import { useState } from "react";
import "../styles/dashboard.css";
import "../styles/buttons.css";
import NavBar from "../components/NavBar"; // ✅ NavBar
import { getDevice } from "../utils/api";  // ✅ use central API
import { useLoading } from "../context/LoadingContext";
import { toast } from "react-toastify";

export default function PoliceDashboard() {
  const [imei, setImei] = useState("");
  const [deviceInfo, setDeviceInfo] = useState(null);

  const { loading, setLoading } = useLoading();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!imei) return toast.error("Please enter an IMEI number!");
    setLoading(true);

    try {
      const res = await getDevice(imei);
      setDeviceInfo(res);
      toast.success("✅ Device found!");
    } catch (err) {
      console.error("Search error:", err);
      toast.error(err.response?.data?.message || "❌ Device not found");
      setDeviceInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Top navigation */}
      <NavBar />

      <div className="dashboard-container p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">👮 Police Dashboard</h1>

        <form
          onSubmit={handleSearch}
          className="flex flex-col items-center space-y-4"
        >
          <input
            type="text"
            placeholder="Enter Device IMEI"
            value={imei}
            onChange={(e) => setImei(e.target.value)}
            required
            className="w-full max-w-md p-2 border rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="btn btn-secondary w-full max-w-md"
          >
            {loading ? "Searching..." : "View Device Info"}
          </button>
        </form>

        {deviceInfo && (
          <div className="mt-6 w-full max-w-2xl p-4 border rounded bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">Device Info</h2>
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(deviceInfo, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
