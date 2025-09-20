import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/api"; // 

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(email, password, rememberMe); 
      if (res.status === "success" && res.user && res.token) {
        loginUser(
          {
            id: res.user.id,
            username: res.user.username,
            email: res.user.email,      
            phone: res.user.phone,
            role: res.user.role ?? "member",
          },
          res.token,
          rememberMe
        );

        // điều hướng theo role
        if (res.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setMessage(`❌ ${res.message ?? "Login failed"}`);
      }
    } catch (err) {
      setMessage("❌ Server error");
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#3cbeee" }}>
      <form onSubmit={handleSubmit} className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Login To Your Account</h3>
        {message && <div className="alert alert-info">{message}</div>}
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
          <label className="form-check-label">Remember me</label>
        </div>
        <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: "#1570ef" }}>Login</button>
        <div className="text-center mt-3">
          <span>Don’t have an account? </span>
          <Link to="/signup">Sign up now</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
