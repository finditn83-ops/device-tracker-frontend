import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function ReporterLogin() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const role = localStorage.getItem("role") || sessionStorage.getItem("role");

  useEffect(() => {
    if (token && role === "reporter") {
      navigate("/reporter/dashboard");
    }
  }, [token, role, navigate]);

  return (
    <div>
      <LoginForm role="reporter" />
    </div>
  );
}
