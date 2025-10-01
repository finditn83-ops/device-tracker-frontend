import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function AdminLogin() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const role = localStorage.getItem("role") || sessionStorage.getItem("role");

  useEffect(() => {
    if (token && role === "admin") {
      navigate("/admin/dashboard");
    }
  }, [token, role, navigate]);

  return <LoginForm role="admin" />;
}
