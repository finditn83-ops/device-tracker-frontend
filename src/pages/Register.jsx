import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRegister } from "../api";

export default function Register(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("reporter");
  const [error,setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const res = await apiRegister(email, password, role);
    if (!res?.success) { setError(res?.message || "Register failed"); return; }
    alert("Registered! Please log in.");
    navigate("/");
  };

  return (
    <div className="auth-wrap">
      <div className="card auth-card">
        <h2 style={{textAlign:"center"}}>Create account</h2>
        {error && <p style={{color:"red"}}>{error}</p>}
        <form onSubmit={handleRegister}>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <label>Role</label>
          <select value={role} onChange={e=>setRole(e.target.value)}>
            <option value="reporter">Reporter</option>
            <option value="police">Police</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" style={{width:"100%",marginTop:6}}>Sign up</button>
        </form>
        <p style={{marginTop:12,textAlign:"center"}}><Link to="/">Back to login</Link></p>
      </div>
    </div>
  );
}
