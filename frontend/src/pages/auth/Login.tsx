// frontend/src/pages/auth/Login.tsx
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/auth.css";
import { login, forgotPassword } from "../../services/api";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  // --- Forgot password states ---
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  // --- Login submit ---
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
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setMessage(`❌ ${res.message ?? "Login failed"}`);
      }
    } catch (err) {
      setMessage("❌ Login failed");
      console.error(err);
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) return;
    setForgotLoading(true);
    setForgotMessage("");
  
    try {
      const res = await forgotPassword(forgotEmail);
  
      if (res.status === "success") {
        setForgotMessage(res.message ?? ''); // hiển thị thông báo thành công
      } else {
        setForgotMessage(`❌ ${res.message}`); // email không tồn tại hoặc lỗi
      }
    } catch (err) {
      console.error(err);
      setForgotMessage("❌ Lỗi server khi gửi yêu cầu reset mật khẩu");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#3cbeee" }}>
      <form onSubmit={handleSubmit} className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center fw-bold mb-4">Login To Your Account</h3>
        {message && <div className="alert alert-info">{message}</div>}

        <div className="mb-3">
          <label className="auth-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="mb-3">
          <label className="auth-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>


        <div className="d-flex align-items-center mb-3 px-3">
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label mb-0">Remember me</label>
          </div>
          <span
            className="ms-auto forgot-password-link"
            style={{ cursor: "pointer" }}
            onClick={() => setShowForgot(true)}
          >
            Forgot Password?
          </span>
        </div>

        <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: "#1570ef" }}>
          Login
        </button>

        <div className="text-center mt-3">
          <span>Don’t have an account? </span>
          <Link to="/signup">Sign up now</Link>
        </div>
      </form>

      {/* --- Forgot Password Modal --- */}
      {showForgot && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reset Password</h5>
                <button type="button" className="btn-close" onClick={() => setShowForgot(false)} />
              </div>
              <div className="modal-body">
                {forgotMessage && <div className="alert alert-info">{forgotMessage}</div>}
                <div className="mb-3">
                  <label className="auth-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email address"
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowForgot(false)}
                  disabled={forgotLoading}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleForgotPassword}
                  disabled={forgotLoading || !forgotEmail}
                >
                  {forgotLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
