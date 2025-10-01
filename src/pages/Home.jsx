import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-3xl text-center p-8">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Device <span className="text-blue-600">Tracker</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 mb-10">
          A secure platform for reporting, investigating, and managing lost or stolen devices.  
          Access your dashboard below according to your role.
        </p>

        {/* Role-based login buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Reporter */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">📰 Reporter</h2>
            <p className="text-sm text-gray-600 mb-4">
              Report and track your lost devices.
            </p>
            <Link
              to="/reporter/login"
              className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Reporter Login
            </Link>
          </div>

          {/* Police */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">👮 Police</h2>
            <p className="text-sm text-gray-600 mb-4">
              Investigate device reports and assist citizens.
            </p>
            <Link
              to="/police/login"
              className="block w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
              Police Login
            </Link>
          </div>

          {/* Admin */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">⚙️ Admin</h2>
            <p className="text-sm text-gray-600 mb-4">
              Manage users, roles, and security settings.
            </p>
            <Link
              to="/admin/login"
              className="block w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
