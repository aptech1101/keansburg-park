import React from "react";
import AdminFeedbackManager from "../components/AdminFeedbackManager";

export default function Admin() {
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <div className="bg-primary text-white py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h3 mb-0">
                <i className="fas fa-cog me-2"></i>
                Admin Dashboard
              </h1>
              <p className="mb-0">Manage feedbacks and reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-fluid py-4">
        <AdminFeedbackManager />
      </div>
    </div>
  );
}
