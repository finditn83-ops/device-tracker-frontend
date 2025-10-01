import { useState } from "react";
import { useLoading } from "../context/LoadingContext";
import { toast } from "react-toastify";
import { ringDevice } from "../api";

export default function RingDeviceForm() {
  const [imei, setImei] = useState("");

  const { loading, setLoading } = useLoading();

  const handleRing = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await ringDevice(imei);
      toast.success(res.message || "Ring command sent!");
      setImei("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to ring device");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRing}
      className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
    >
      <h2 className="text-xl font-bold text-center mb-4">Ring Device</h2>

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
        className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? "Sending..." : "Ring Device"}
      </button>
    </form>
  );
}
