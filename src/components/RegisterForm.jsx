import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../utils/api"; // ✅ API call
import { saveAuth } from "../utils/auth"; // ✅ to save token/user info

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("reporter"); // ✅ default role
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call backend to register
      const res = await register(username, email, password, role);

      // Save auth info & auto login
      saveAuth(res, true);

      toast.success("Registration successful!");

      // Redirect to correct dashboard
      navigate(`/${role}/dashboard`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="Logo" className="h-16 w-16 rounded-full" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">Username</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

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

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Role Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">Role</label>
          <select
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="reporter">Reporter</option>
            <option value="police">Police</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Back to Login */}
        <div className="text-center mt-4">
          <Link to="/" className="text-blue-600 hover:underline text-sm">
            ← Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}
