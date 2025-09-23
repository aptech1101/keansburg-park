import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { updateProfile, UpdateProfileResponse } from "../../services/api";

interface ProfileData {
  username: string;
  email: string;
  phone: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Profile: React.FC = () => {
  const { user, token, logoutUser, updateUser } = useAuth();
  const navigate = (path: string) => {
    window.location.href = path;
  };
  
  // Profile form data (without password)
  const [formData, setFormData] = useState<ProfileData>({
    username: "",
    email: "",
    phone: "",
  });
  
  // Password change form data
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  // UI states
  const [message, setMessage] = useState<string>("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Cập nhật formData khi user thay đổi (sau login)
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // Xử lý thay đổi thông tin profile
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Xử lý thay đổi mật khẩu
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  // Helper: lấy thông điệp lỗi thân thiện từ axios/fetch
  const getFriendlyError = (err: any, fallback: string) => {
    // Axios error
    const msg = err?.response?.data?.message || err?.response?.data?.error;
    if (typeof msg === 'string' && msg.trim().length > 0) return msg;
    // Fetch error body as JSON string previously
    const raw = err?.message;
    if (typeof raw === 'string' && raw.length > 0) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed?.message) return parsed.message;
      } catch {}
      return raw;
    }
    return fallback;
  };

  // Xử lý submit cập nhật profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setIsLoading(true);
    setMessage("");

    try {
      const res: UpdateProfileResponse = await updateProfile(formData, token);
      setMessage(res.message);

      if (res.user) {
        // Cập nhật context với dữ liệu từ API
        updateUser({
          username: res.user.username,
          email: res.user.email,
          phone: res.user.phone,
          lastProfileUpdate: res.user.last_profile_update,
        });
      }
    } catch (err: any) {
      const friendly = getFriendlyError(err, "Update failed. Please check your information.");
      setMessage(friendly);
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý submit đổi mật khẩu
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    // Validation mật khẩu
    if (!passwordData.currentPassword) {
      setPasswordMessage("Current password is required");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordMessage("New password must be at least 6 characters");
      return;
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      setPasswordMessage("New password must be different from current password");
      return;
    }

    setIsLoading(true);
    setPasswordMessage("");

    try {
      // Backend yêu cầu username và email -> gửi kèm giá trị hiện tại
      const res: UpdateProfileResponse = await updateProfile({
        username: formData.username,
        email: formData.email,
        password: passwordData.newPassword,
      }, token);
      setPasswordMessage(res.message);

      if (res.logoutRequired) {
        // Đăng xuất nếu cần thiết
        alert("Password changed successfully. Please log in again.");
        logoutUser();
        navigate("/");
      } else {
        // Reset form và đóng modal
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setShowPasswordModal(false);
      }
    } catch (err: any) {
      const friendly = getFriendlyError(err, "Password change failed. Please try again.");
      setPasswordMessage(friendly);
    } finally {
      setIsLoading(false);
    }
  };

  // Mở modal đổi mật khẩu
  const openPasswordModal = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordMessage("");
    setShowPasswordModal(true);
  };

  // Đóng modal đổi mật khẩu
  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordMessage("");
  };

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="container mt-4">
      {/* Profile Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="fas fa-user-circle me-2" style={{ color: '#3cbeee' }}></i>
          Profile Settings
        </h2>
        <div className="text-muted">
          <small>Last updated: {user.lastProfileUpdate ? new Date(user.lastProfileUpdate).toLocaleDateString() : 'Never'}</small>
        </div>
      </div>

      {/* Success/Error Messages */}
      {message && (
        <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-info'} alert-dismissible fade show`} role="alert">
          <i className={`fas ${message.includes('success') ? 'fa-check-circle' : 'fa-info-circle'} me-2`}></i>
          {message}
          <button type="button" className="btn-close" onClick={() => setMessage("")}></button>
        </div>
      )}

      {/* Profile Information Card */}
      <div className="row justify-content-center mb-4">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header text-white" style={{ backgroundColor: '#3cbeee' }}>
              <h5 className="mb-0">
                <i className="fas fa-user me-2"></i>
                Personal Information
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-user me-1 text-muted"></i>
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-envelope me-1 text-muted"></i>
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      readOnly
                      required
                    />
                    <div className="form-text">
                      <i className="fas fa-lock me-1"></i>
                      Email cannot be changed
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-phone me-1 text-muted"></i>
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="col-md-6 d-flex align-items-end">
                    <button 
                      type="submit" 
                      className="btn text-white"
                      style={{ backgroundColor: '#1570ef' }}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Updating...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save me-2"></i>
                          Update Profile
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Account Security Card */}
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header text-white" style={{ backgroundColor: '#3cbeee' }}>
              <h5 className="mb-0">
                <i className="fas fa-shield-alt me-2"></i>
                Account Security
              </h5>
            </div>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h6 className="mb-1">
                    <i className="fas fa-key me-2" style={{ color: '#3cbeee' }}></i>
                    Password Security
                  </h6>
                  <p className="text-muted mb-0">Keep your account secure with a strong password</p>
                </div>
                <div className="col-md-4 text-end">
                  <button
                    type="button"
                    className="btn"
                    style={{ 
                      backgroundColor: '#1570ef', 
                      color: 'white',
                      border: '1px solid #1570ef'
                    }}
                    onClick={openPasswordModal}
                  >
                    <i className="fas fa-edit me-2"></i>
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header text-white" style={{ backgroundColor: '#3cbeee' }}>
                <h5 className="modal-title">
                  <i className="fas fa-key me-2"></i>
                  Change Password
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={closePasswordModal}
                ></button>
              </div>
              <form onSubmit={handlePasswordSubmit}>
                <div className="modal-body">
                  {passwordMessage && (
                    <div className={`alert ${passwordMessage.includes('success') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} role="alert">
                      <i className={`fas ${passwordMessage.includes('success') ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-2`}></i>
                      {passwordMessage}
                      <button type="button" className="btn-close" onClick={() => setPasswordMessage("")}></button>
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-lock me-1 text-muted"></i>
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter current password"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-lock me-1 text-muted"></i>
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                      required
                    />
                    <div className="form-text">Password must be at least 6 characters long</div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-lock me-1 text-muted"></i>
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm new password"
                      required
                    />
                  </div>

                  <div className="alert alert-info">
                    <i className="fas fa-info-circle me-2"></i>
                    <strong>Note:</strong> You will be logged out after changing your password for security reasons.
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={closePasswordModal}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn text-white"
                    style={{ backgroundColor: '#1570ef' }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Changing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save me-2"></i>
                        Change Password
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
