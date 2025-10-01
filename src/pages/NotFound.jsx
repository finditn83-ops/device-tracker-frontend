import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      {/* Error Code */}
      <h1 className="text-7xl font-extrabold text-red-600 mb-4">404</h1>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>

      {/* Message */}
      <p className="text-gray-600 mb-8 max-w-md text-center">
        Oops! The page you’re looking for doesn’t exist, has been moved, or you
        don’t have access to it.
      </p>

      {/* Back Home Button */}
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        ⬅ Go Back Home
      </Link>
    </div>
  );
}
