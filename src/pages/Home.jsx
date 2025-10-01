import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-2xl text-center p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">Device Tracker</span>
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          Securely track, locate, and manage lost or stolen devices.
          Whether you’re a <span className="font-medium">Reporter</span>, 
          <span className="font-medium"> Police Officer</span>, or 
          <span className="font-medium"> Admin</span>, you can log in to your 
          dashboard and take action.
        </p>

        <div className="space-x-4">
          <Link
            to="/reporter/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Reporter Login
          </Link>
          <Link
            to="/police/login"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Police Login
          </Link>
          <Link
            to="/admin/login"
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}
