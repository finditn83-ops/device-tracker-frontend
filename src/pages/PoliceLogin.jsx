import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function PoliceLogin() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const role = localStorage.getItem("role") || sessionStorage.getItem("role");

  useEffect(() => {
    if (token && role === "police") {
      navigate("/police/dashboard");
    }
  }, [token, role, navigate]);

  return <LoginForm role="police" />;
}
