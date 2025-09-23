import { NavLink } from "react-router-dom";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const menuItems = [
    { to: "/admin/dashboard", icon: "fas fa-tachometer-alt", label: "Dashboard" },
    { to: "/admin/orders", icon: "fas fa-shopping-cart", label: "Orders" },
    { to: "/admin/tickets", icon: "fas fa-ticket-alt", label: "Tickets" },
    { to: "/admin/gallery", icon: "fas fa-images", label: "Gallery" },
    { to: "/admin/zones", icon: "fas fa-map-marker-alt", label: "Zones" },
    { to: "/admin/restaurants", icon: "fas fa-utensils", label: "Restaurants" },
    { to: "/admin/attractions", icon: "fas fa-star", label: "Attractions" },
    { to: "/admin/feedback", icon: "fas fa-comments", label: "Feedback" }
  ];

  return (
    <div className="d-flex flex-column p-2 p-md-3 bg-light sidebar" style={{ minHeight: "100vh", width: "250px" }}>
      <div className="d-flex align-items-center justify-content-between mb-3 mb-md-4">
        <div className="d-flex align-items-center">
          <i className="fas fa-tachometer-alt text-primary me-2"></i>
          <h4 className="mb-0 d-none d-md-block">Admin Dashboard</h4>
          <h5 className="mb-0 d-md-none">Admin</h5>
        </div>
        {onClose && (
          <button 
            className="btn btn-sm btn-outline-secondary d-md-none"
            onClick={onClose}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item) => (
          <li key={item.to} className="nav-item mb-1">
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center ${isActive ? "active fw-bold" : "text-dark"}`
              }
              onClick={() => {
                // Close sidebar on mobile when clicking a link
                if (window.innerWidth < 768 && onClose) {
                  onClose();
                }
              }}
            >
              <i className={`${item.icon} me-2`} style={{ width: "20px" }}></i>
              <span className="d-none d-md-inline">{item.label}</span>
              <span className="d-md-none" title={item.label}>
                {item.label.charAt(0)}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
