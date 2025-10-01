import { useState } from "react";
import { useLoading } from "../context/LoadingContext";
import { toast } from "react-toastify";
import { trackDevice } from "../api";

export default function TrackDeviceForm() {
  const [imei, setImei] = useState("");
  const [description, setDescription] = useState("");

  const { loading, setLoading } = useLoading();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await trackDevice({ imei, description });
      toast.success(res.message || "Device tracked successfully!");
      setImei("");
      setDescription("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to track device");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
    >
      <h2 className="text-xl font-bold text-center mb-4">Track a Device</h2>

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

      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Tracking..." : "Track Device"}
      </button>
    </form>
  );
}
