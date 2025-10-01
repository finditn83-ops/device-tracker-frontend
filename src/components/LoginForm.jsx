import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import { toast } from "react-toastify";
import { saveAuth } from "../utils/auth";
import { login } from "../utils/api"; // ✅ Correct path
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginForm({ role }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // optional field
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const { loading, setLoading } = useLoading();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Call backend via api.js
      const res = await login(email, password, username);

      // Save token & user info
      saveAuth(res, remember);

      toast.success("Login successful!");

      // ✅ Role-based redirect
      if (role) {
        navigate(`/${role}/dashboard`);
      } else {
        navigate("/"); // fallback if no role is passed
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-1">Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Username (optional) */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-1">Username</label>
        <input
          type="text"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="mb-4 relative">
        <label className="block text-gray-700 text-sm mb-1">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 pr-10"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-8 text-gray-500"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>

      {/* Remember Me */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={remember}
          onChange={() => setRemember(!remember)}
          className="mr-2"
        />
        <span className="text-sm text-gray-600">Remember Me</span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* Back to Register */}
      <div className="text-center mt-4">
        <Link
          to="/register"
          className="text-sm text-gray-600 hover:text-blue-600 hover:underline"
        >
          Don’t have an account? Register
        </Link>
      </div>
    </form>
  );
}
