import { useState } from "react";
import "../styles/dashboard.css";
import "../styles/buttons.css";
import NavBar from "../components/NavBar"; // ✅ navigation bar
import { trackDevice, locateDevice, ringDevice } from "../utils/api"; // ✅ central API
import { useLoading } from "../context/LoadingContext";
import { toast } from "react-toastify";

export default function ReporterDashboard() {
  const [imei, setImei] = useState("");
  const [response, setResponse] = useState(null);

  const { loading, setLoading } = useLoading();

  const handleTrack = async () => {
    if (!imei) return toast.error("Please enter IMEI first!");
    setLoading(true);
    try {
      const res = await trackDevice({ imei });
      setResponse(res);
      toast.success(res.message || "Device tracked successfully!");
    } catch (err) {
      console.error("Track error:", err);
      toast.error(err.response?.data?.message || "Failed to track device");
    } finally {
      setLoading(false);
    }
  };

  const handleLocate = async () => {
    if (!imei) return toast.error("Please enter IMEI first!");
    setLoading(true);
    try {
      const res = await locateDevice(imei);
      setResponse(res);
      toast.success("Device located successfully!");
    } catch (err) {
      console.error("Locate error:", err);
      toast.error(err.response?.data?.message || "Failed to locate device");
    } finally {
      setLoading(false);
    }
  };

  const handleRing = async () => {
    if (!imei) return toast.error("Please enter IMEI first!");
    setLoading(true);
    try {
      const res = await ringDevice(imei);
      setResponse(res);
      toast.success(res.message || "Ring command sent!");
    } catch (err) {
      console.error("Ring error:", err);
      toast.error(err.response?.data?.message || "Failed to ring device");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Top navigation */}
      <NavBar />

      <div className="dashboard-container p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">📍 Reporter Dashboard</h1>

        <div className="flex flex-col items-center space-y-4">
          <input
            type="text"
            placeholder="Enter Device IMEI"
            value={imei}
            onChange={(e) => setImei(e.target.value)}
            className="w-full max-w-md p-2 border rounded-lg"
          />

          <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
            <button
              onClick={handleTrack}
              disabled={loading}
              className="btn btn-primary flex-1"
            >
              {loading ? "Tracking..." : "Track Device"}
            </button>

            <button
              onClick={handleLocate}
              disabled={loading}
              className="btn btn-secondary flex-1"
            >
              {loading ? "Locating..." : "Locate Device"}
            </button>

            <button
              onClick={handleRing}
              disabled={loading}
              className="btn btn-success flex-1"
            >
              {loading ? "Ringing..." : "Ring Device"}
            </button>
          </div>
        </div>

        {response && (
          <div className="mt-6 w-full max-w-2xl p-4 border rounded bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">Response</h2>
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
