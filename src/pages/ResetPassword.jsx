import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiResetPassword } from "../api";

export default function ResetPassword(){
  const [search] = useSearchParams();
  const tokenFromLink = search.get("token") || "";
  const [token,setToken] = useState(tokenFromLink);
  const [newPassword,setNewPassword] = useState("");
  const [msg,setMsg] = useState("");
  const [error,setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMsg(""); setError("");
    const res = await apiResetPassword(token, newPassword);
    if (!res?.success) { setError(res?.message || "Failed"); return; }
    setMsg(res.message || "Password updated. You can now log in.");
  };

  return (
    <div className="auth-wrap">
      <div className="card auth-card">
        <h2 style={{textAlign:"center"}}>Reset password</h2>
        {error && <p style={{color:"red"}}>{error}</p>}
        {msg && <p style={{color:"green"}}>{msg}</p>}
        <form onSubmit={handleReset}>
          <label>Reset token</label>
          <input value={token} onChange={e=>setToken(e.target.value)} placeholder="paste token" />
          <label>New password</label>
          <input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} />
          <button type="submit" style={{width:"100%",marginTop:6}}>Set new password</button>
        </form>
        <p style={{marginTop:12,textAlign:"center"}}><Link to="/">Back to login</Link></p>
      </div>
    </div>
  );
}
