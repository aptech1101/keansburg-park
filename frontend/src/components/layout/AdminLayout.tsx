// src/components/admin/AdminLayout.tsx
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import { Button } from "react-bootstrap";
import "./AdminLayout.css";

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Close sidebar when route changes on mobile
  const handleRouteChange = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    const tempToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNzU4NTQ4ODAyfQ.D0yFlJ36j4powZahw5RR0Vr7AnJriRHJwRpTYgWRja4";
      localStorage.setItem("token", tempToken);
  }, []);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div className={`sidebar-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay d-md-none" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-grow-1 position-relative" style={{ backgroundColor: "#f8f9fa" }}>
        {/* Mobile header */}
        <div className="d-md-none bg-white shadow-sm p-3 d-flex align-items-center justify-content-between">
          <h5 className="mb-0">Admin Panel</h5>
          <Button 
            variant="outline-secondary" 
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="fas fa-bars"></i>
          </Button>
        </div>

        {/* Content */}
        <div className="p-3 p-md-4">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default AdminLayout;
