import { useState } from "react";
import { useLoading } from "../context/LoadingContext";
import { toast } from "react-toastify";
import { requestPasswordReset } from "../utils/api"; // ✅ use central API
import NavBar from "../components/NavBar";
import "../styles/adminDashboard.css";

export default function AdminDashboard() {
  const [targetEmail, setTargetEmail] = useState("");
  const [response, setResponse] = useState(null);

  const { loading, setLoading } = useLoading();

  const handleSendResetLink = async (e) => {
    e.preventDefault();
    if (!targetEmail) return toast.error("Please enter an email!");

    setLoading(true);
    try {
      const res = await requestPasswordReset(targetEmail);
      setResponse(res);
      toast.success(res.message || "✅ Reset link sent!");
      setTargetEmail("");
    } catch (err) {
      console.error("Reset request error:", err);
      toast.error(err.response?.data?.message || "❌ Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Top navigation */}
      <NavBar />

      <div className="flex flex-col items-center justify-center p-6">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">⚙️ Admin Dashboard</h1>

          <form onSubmit={handleSendResetLink}>
            {/* Target Email */}
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-1">
                User Email
              </label>
              <input
                type="email"
                value={targetEmail}
                onChange={(e) => setTargetEmail(e.target.value)}
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              />
            </div>

            {/* Send Reset Link Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {/* Show response JSON if any */}
          {response && (
            <div className="mt-4 p-3 border rounded bg-gray-50 text-sm overflow-x-auto">
              <h2 className="font-semibold mb-1">Response</h2>
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
