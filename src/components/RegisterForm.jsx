import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import { toast } from "react-toastify";
import { register } from "../utils/api"; // ✅ API call
import { saveAuth } from "../utils/auth"; // if you want to auto-login after register

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("reporter"); // ✅ Default role

  const { loading, setLoading } = useLoading();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Call backend
      const res = await register(username, email, password, role);

      // Option A: Auto login after registration
      saveAuth(res, true);

      toast.success("Registration successful!");

      // ✅ Role-based redirect
      navigate(`/${role}/dashboard`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

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

      {/* Role Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-1">Role</label>
        <select
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="police">Police</option>
          <option value="reporter">Reporter</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Registering..." : "Register"}
      </button>

      {/* Back to Login */}
      <div className="text-center mt-4">
        <Link
          to="/"
          className="text-sm text-gray-600 hover:text-blue-600 hover:underline"
        >
          Already have an account? Login
        </Link>
      </div>
    </form>
  );
}
