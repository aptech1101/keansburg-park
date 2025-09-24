import React, { useState } from "react";
import { signup } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Signup: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }
    try {
      const res = await signup({ fullName, email, phone, password });

      if (res.status === "success" && res.user) {
        loginUser(
          {
            id: res.user.id,
            username: res.user.username,
            email: res.user.email,
            phone: res.user.phone,
            role: res.user.role ?? "member",
          },
          res.token ?? "",
          false
        );
        setMessage("✅ Signup successful! Redirecting...");
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMessage(`❌ ${res.message ?? "Signup failed"}`);
      }
    } catch (err) {
      console.error("Signup error:", err);
      if (err instanceof Error) {
        setMessage(`❌ ${err.message}`);
      } else {
        setMessage("❌ Server error. Please try again.");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "#3cbeee", minHeight: "100vh", paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="card shadow p-4" style={{ maxWidth: "450px", width: "100%" }}>
        <h3 className="text-center mb-4">Create an Account</h3>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Full Name</label>
            <input type="text" className="form-control" value={fullName} onChange={e => setFullName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Phone</label>
            <input type="tel" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Confirm Password</label>
            <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: "#1570ef" }}>Sign Up</button>
          <div className="text-center mt-3">
            <span>Already have an account? </span>
            <Link to="/login">Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
