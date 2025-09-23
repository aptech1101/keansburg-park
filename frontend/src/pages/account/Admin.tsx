import React, { useState } from "react";

interface User {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  role: string;
}

interface Booking {
  id: number;
  customer_name: string;
  date: string;
  tickets: number;
  status: string;
}

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"users" | "bookings">("users");

  // Dữ liệu demo
  const users: User[] = [
    { id: 1, full_name: "Nguyễn Văn A", email: "a@gmail.com", phone: "090123456", role: "member" },
    { id: 2, full_name: "Trần Thị B", email: "b@gmail.com", phone: "090987654", role: "member" },
    { id: 3, full_name: "Admin", email: "admin@example.com", phone: "0911222333", role: "admin" },
  ];

  const bookings: Booking[] = [
    { id: 101, customer_name: "Nguyễn Văn A", date: "2025-09-01", tickets: 3, status: "Đã thanh toán" },
    { id: 102, customer_name: "Trần Thị B", date: "2025-09-05", tickets: 2, status: "Chưa thanh toán" },
    { id: 103, customer_name: "Nguyễn Văn A", date: "2025-09-10", tickets: 5, status: "Đã hủy" },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ marginBottom: "20px" }}>Admin Dashboard</h1>

      {/* Thanh chọn tab */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("users")}
          style={{
            padding: "10px 15px",
            marginRight: "10px",
            backgroundColor: activeTab === "users" ? "#007bff" : "#ddd",
            color: activeTab === "users" ? "white" : "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Danh sách khách
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          style={{
            padding: "10px 15px",
            backgroundColor: activeTab === "bookings" ? "#007bff" : "#ddd",
            color: activeTab === "bookings" ? "white" : "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Lịch sử đặt vé
        </button>
      </div>

      {/* Nội dung tab */}
      {activeTab === "users" && (
        <div>
          <h2>Danh sách khách hàng</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Họ và tên</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Email</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>SĐT</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{u.id}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{u.full_name}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{u.email}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{u.phone}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "bookings" && (
        <div>
          <h2>Lịch sử đặt vé</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Khách hàng</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Ngày</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Số vé</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{b.id}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{b.customer_name}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{b.date}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{b.tickets}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
