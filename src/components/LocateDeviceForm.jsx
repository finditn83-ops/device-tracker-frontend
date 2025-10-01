import { useState } from "react";
import { useLoading } from "../context/LoadingContext";
import { toast } from "react-toastify";
import { locateDevice } from "../api";

export default function LocateDeviceForm() {
  const [imei, setImei] = useState("");
  const [location, setLocation] = useState(null);

  const { loading, setLoading } = useLoading();

  const handleLocate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await locateDevice(imei);
      setLocation(res.location || res);
      toast.success("Device location retrieved!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to locate device");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold text-center mb-4">Locate Device</h2>

      <form onSubmit={handleLocate}>
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">IMEI</label>
          <input
            type="text"
            value={imei}
            onChange={(e) => setImei(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Locating..." : "Locate"}
        </button>
      </form>

      {location && (
        <div className="mt-4 p-3 border rounded bg-gray-50">
          <p className="text-sm">
            <strong>Location:</strong> {JSON.stringify(location)}
          </p>
        </div>
      )}
    </div>
  );
}
