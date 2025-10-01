import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { resetPassword } from "../api"; // ✅ central API

export default function ResetPassword() {
  const [targetEmail, setTargetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mode, setMode] = useState("email"); // "email" | "reset"
  const [token, setToken] = useState(null);
  const [roleHint, setRoleHint] = useState(null);
  const { loading, setLoading } = useLoading();
  const navigate = useNavigate();

  // ✅ Password rules
  const passwordRules = [
    { test: (pwd) => pwd.length >= 8, label: "At least 8 characters" },
    { test: (pwd) => /[A-Z]/.test(pwd), label: "One uppercase letter" },
    { test: (pwd) => /[a-z]/.test(pwd), label: "One lowercase letter" },
    { test: (pwd) => /\d/.test(pwd), label: "One number" },
    {
      test: (pwd) => /[!@#$%^&*]/.test(pwd),
      label: "One special character (!@#$%^&*)",
    },
  ];

  // ✅ Detect token and role from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const resetToken = params.get("token");
    const roleParam = params.get("role");

    if (resetToken) {
      setToken(resetToken);
      setMode("reset");
    }
    if (roleParam) {
      setRoleHint(roleParam);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "email") {
        // ✅ Step 1: Request reset link
        const res = await resetPassword(targetEmail, null); // backend sends email
        toast.success(res.message || "Reset email sent ✅ Check your inbox");
        navigate("/");
      } else if (mode === "reset") {
        // ✅ Step 2: Reset password using token
        if (newPassword !== confirmPassword) {
          toast.error("Passwords do not match ❌");
          setLoading(false);
          return;
        }

        const allValid = passwordRules.every((rule) => rule.test(newPassword));
        if (!allValid) {
          toast.error("Please meet all password requirements ❌");
          setLoading(false);
          return;
        }

        const res = await resetPassword(token, newPassword); // token-based reset
        toast.success("Password reset successful 🎉 Please log in");

        // Redirect based on backend response or roleHint
        if (res.role === "reporter" || roleHint === "reporter")
          navigate("/reporter/login");
        else if (res.role === "police" || roleHint === "police")
          navigate("/police/login");
        else if (res.role === "admin" || roleHint === "admin")
          navigate("/admin/login");
        else navigate("/");
      }
    } catch (err) {
      console.error("Reset error:", err);
      toast.error(err.response?.data?.message || "Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Decide where Back link should point
  const backLink =
    roleHint === "reporter"
      ? "/reporter/login"
      : roleHint === "police"
      ? "/police/login"
      : roleHint === "admin"
      ? "/admin/login"
      : "/";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {mode === "email" ? "Request Password Reset" : "Set New Password"}
        </h2>

        <form onSubmit={handleSubmit}>
          {mode === "email" && (
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Enter your account email
              </label>
              <input
                type="email"
                value={targetEmail}
                onChange={(e) => setTargetEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
                disabled={loading}
              />
            </div>
          )}

          {mode === "reset" && (
            <>
              {/* New Password */}
              <div className="mb-3 relative">
                <label className="block text-sm font-medium mb-1">
                  New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md pr-10"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>

                {/* Inline rules */}
                {newPassword && (
                  <ul className="text-xs mt-2 space-y-1">
                    {passwordRules.map((rule, i) => (
                      <li
                        key={i}
                        className={
                          rule.test(newPassword)
                            ? "text-green-600"
                            : "text-red-500"
                        }
                      >
                        {rule.test(newPassword) ? "✅" : "❌"} {rule.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-3 relative">
                <label className="block text-sm font-medium mb-1">
                  Confirm New Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md pr-10"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>
            </>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              mode === "email"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-purple-600 hover:bg-purple-700"
            } text-white py-2 rounded-md disabled:opacity-50`}
          >
            {loading
              ? mode === "email"
                ? "Sending..."
                : "Resetting..."
              : mode === "email"
              ? "Send Reset Email"
              : "Reset Password"}
          </button>

          {/* Smart Back to Login */}
          <div className="text-center mt-4">
            <Link
              to={backLink}
              className="text-sm text-gray-600 hover:text-blue-600 hover:underline"
            >
              ← Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
