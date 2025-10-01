import { useState } from "react";
import { useLoading } from "../context/LoadingContext";
import { toast } from "react-toastify";
import { getDevice } from "../api";

export default function PoliceDeviceLookup() {
  const [imei, setImei] = useState("");
  const [device, setDevice] = useState(null);

  const { loading, setLoading } = useLoading();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await getDevice(imei);
      setDevice(res);
      toast.success("Device found!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Device not found");
      setDevice(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold text-center mb-4">Police: Search Device</h2>

      <form onSubmit={handleSearch}>
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
          className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search Device"}
        </button>
      </form>

      {device && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Device Info</h3>
          <p><strong>IMEI:</strong> {device.imei}</p>
          <p><strong>Description:</strong> {device.description}</p>
          <p><strong>Status:</strong> {device.status}</p>
          {device.location && (
            <p><strong>Last Location:</strong> {JSON.stringify(device.location)}</p>
          )}
        </div>
      )}
    </div>
  );
}
