import { useState } from "react";
import { useLoading } from "../context/LoadingContext";
import { toast } from "react-toastify";
import { resetPassword } from "../api";

export default function AdminResetPasswordForm() {
  const [targetEmail, setTargetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { loading, setLoading } = useLoading();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await resetPassword(targetEmail, newPassword);
      toast.success(res.message || "Password reset successfully!");
      setTargetEmail("");
      setNewPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
    >
      <h2 className="text-xl font-bold text-center mb-4">
        Admin: Reset User Password
      </h2>

      {/* Target Email */}
      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-1">Target Email</label>
        <input
          type="email"
          value={targetEmail}
          onChange={(e) => setTargetEmail(e.target.value)}
          required
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {/* New Password */}
      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-1">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}
