import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiLogin } from "../api";

export default function Login(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await apiLogin(email, password);
      if (!res || !res.success || !res.token) {
        setError(res?.message || "Login failed");
        return;
      }
      // save token & role
      localStorage.setItem("token", res.token);
      if (res.role) localStorage.setItem("role", res.role);
      if (res.user) localStorage.setItem("user", JSON.stringify(res.user));

      // redirect by role
      const role = res.role || res.user?.role || "reporter";
      if (role === "admin") navigate("/admin");
      else if (role === "police") navigate("/police");
      else navigate("/reporter");
    } catch (err) {
      setError(err.message || "Server error");
    }
  };

  return (
    <div className="auth-wrap">
      <div className="card auth-card">
        <h2 style={{textAlign:"center"}}>Log in</h2>
        {error && <p style={{color:"red"}}>{error}</p>}
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
          <button type="submit" style={{width:"100%",marginTop:6}}>Continue</button>
        </form>

        <p style={{marginTop:12,textAlign:"center"}}>
          <Link to="/register">Create account</Link> · <Link to="/forgot-password">Forgot password?</Link>
        </p>
      </div>
    </div>
  );
}
