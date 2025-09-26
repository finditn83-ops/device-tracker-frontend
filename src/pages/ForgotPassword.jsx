import { useState } from "react";
import { Link } from "react-router-dom";
import { apiForgotPassword } from "../api";

export default function ForgotPassword(){
  const [email,setEmail] = useState("");
  const [msg,setMsg] = useState("");
  const [error,setError] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    setError(""); setMsg("");
    const res = await apiForgotPassword(email);
    if (!res?.success) { setError(res?.message || "Failed"); return; }
    setMsg(res.message || "If this account exists, a reset link has been sent.");
  };

  return (
    <div className="auth-wrap">
      <div className="card auth-card">
        <h2 style={{textAlign:"center"}}>Forgot password</h2>
        {error && <p style={{color:"red"}}>{error}</p>}
        {msg && <p style={{color:"green"}}>{msg}</p>}
        <form onSubmit={handleSend}>
          <label>Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          <button type="submit" style={{width:"100%",marginTop:6}}>Send reset link</button>
        </form>
        <p style={{marginTop:12,textAlign:"center"}}><Link to="/">Back to login</Link></p>
      </div>
    </div>
  );
}
