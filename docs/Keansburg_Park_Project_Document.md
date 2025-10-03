# Keansburg Park – Project Documentation
**Nhóm:** 2412L – Group 2  
**Thành viên:** Tran Cong Minh (Lead), Trung Thai Hai, Dinh Sy Son, Mai Xuan Quang, Pham Truong Tam  
**Thời gian:** 27/08/2025 – 04/10/2025 (Defense)  
**Giảng viên:** To Hoang Anh  

## Mục lục
1. Problem Definition  
2. Customer Requirements Specification  
3. System Design  
   3.1 Use Case  
   3.2 System Architecture  
   3.3 ERD & Database Design  
   3.4 Sitemap  
   3.5 System Functions Design  
4. User Interface  
5. Task Sheet & Timeline  
6. Validation Checklist  
7. Project Phases  
8. Conclusion & Future Enhancements

## 1. Problem Definition
**TL;DR:** Keansburg Park chưa có nền tảng đặt vé trực tuyến, hệ thống mới giúp khách hàng mua vé online nhanh chóng và quản trị dễ dàng.

### 1.1 Problem Abstraction
- Khách hiện chỉ mua vé trực tiếp → mất thời gian, không có ưu đãi online.
- Thiếu quản lý tập trung cho attractions, restaurants, gallery.

### 1.2 The Current System
- Mua vé thủ công, không có thông tin tập trung.
- Không lưu lịch sử giao dịch hay phản hồi khách.

### 1.3 The Proposed System
- Website SPA (ReactJS) + PHP API + MySQL.
- Tính năng chính: ticketing (calendar, add-to-cart, checkout mock), quản lý attractions/restaurants/gallery, feedback & moderation.
- Admin quản lý CRUD nội dung.

### 1.3.1 Boundaries
- In-scope: Guest, Member, Admin; ticketing, CRUD nội dung, order history, reviews.
- Out-of-scope: Refund, inventory, giới hạn 30 ngày.

### 1.3.2 Hardware & Software
- FE: React 18 + Vite, chạy Chrome/Edge/Firefox/Safari.
- BE: PHP 8.x, MySQL 8.x.

## 2. Customer Requirements Specification

### 2.1 Users of the System
- Guest: xem thông tin, đặt vé, checkout không cần tài khoản.
- Member: giống Guest + Profile + Order History + Reviews.
- Admin: quản lý Tickets/Zones/Attractions/Restaurants/Gallery/Users/Orders/Feedback.

### 2.2 System Functions
- FR-Auth: Sign Up/In/Out, Profile, Order History.
- FR-Ticketing: Calendar + chọn vé.
- FR-Cart: Add/Update/Delete, tính discount.
- FR-Checkout: Tạo order, mock payment, QR code.
- FR-Review: Gửi review → pending → admin duyệt.
- FR-Admin CRUD: Tickets, Attractions, Restaurants, Gallery, Users, Orders.

### 2.3 Business Rules (UPDATED)
- Vé weekday = $10; weekend = +20% surcharge.
- Discount 10% cho đơn ≥10 vé.
- Không Refund, Không Inventory, Không giới hạn 30 ngày.

## 3. System Design

### 3.1 Use Case
Actors: Guest, Member, Admin.
Use Cases: Signup, Login, Update Profile, Ticket Browsing, Cart, Checkout, Order History, Review, Admin CRUD.

### 3.2 System Architecture
- 3-tier: FE (React) ↔ API (PHP) ↔ DB (MySQL).
- FE: routing, state (cart, auth), UI.
- BE: auth, pricing, booking, CRUD, review moderation.
- DB: users, tickets, orders, order_items, attractions, restaurants, gallery, reviews.

### 3.3 ERD (Text)
- Users (1–n Orders, 1–n Reviews).
- Orders (1–n OrderItems).
- Tickets liên kết Orders qua OrderItems.
- Zones–Attractions–Restaurants liên kết 1–n.
- Gallery: ảnh + mô tả.

### 3.4 Database Design
Bảng chính: users, tickets, orders, order_items, attractions, restaurants, gallery, reviews.
- order_items.unit_price lưu giá tại thời điểm đặt.
- Discount áp ở order-level nếu qty ≥10.

### 3.5 Sitemap
- Public: /, /zones, /tickets, /restaurants, /gallery, /faqs
- Commerce: /cart, /checkout, /success
- Account: /signup, /login, /profile, /profile/orders
- Admin: /admin/dashboard, /admin/tickets, /admin/zones, /admin/attractions, /admin/restaurants, /admin/gallery, /admin/orders, /admin/feedback

### 3.6 System Functions Design
- Auth: validate → hash/verify → JWT/session.
- Ticketing: FE calendar hiển thị giá weekday/weekend; BE xử lý logic.
- Cart: quản lý item, tính discount nếu ≥10 vé.
- Checkout: gửi order → DB, sinh order_code + QR.
- Order History: thành viên xem danh sách, chi tiết.
- Reviews: gửi → pending → admin approve.
- Admin CRUD: quản lý dữ liệu cơ bản.

## 4. User Interface
Màn hình chính:
- Home, Zones, Attractions, Restaurants, Gallery.
- Tickets, Cart, Checkout (2 step), Success.
- Signup/Login, Profile, Orders.
- Admin Dashboard, CRUD pages.

Design Considerations:
- Responsive ≥320px, a11y cơ bản, hiển thị rõ ràng trạng thái form/cart.

## 6. Validation Checklist
- Auth: đăng ký/đăng nhập đúng/sai.
- Pricing: weekday/weekend, qty=9 vs qty=10.
- Cart: add/update/delete item.
- Checkout: tạo order, sinh QR.
- Order History: xem danh sách + chi tiết.
- Review: submit→pending→approve.
- Admin CRUD: thêm/sửa/xoá nội dung.

## 7. Project Phases
- Research → Design → Development → Testing → Deployment.
- Ghi rõ deliverables từng giai đoạn.

## 8. Conclusion & Future Enhancements
- Hệ thống đã đáp ứng yêu cầu: đặt vé online, CRUD admin, feedback.
- Giúp giảm thời gian xếp hàng, tăng trải nghiệm người dùng.
- Future: tích hợp thanh toán thực, gửi email xác nhận, dashboard báo cáo, role mở rộng (moderator), export CSV/Excel.

## Keansburg Park – Tài liệu Ôn tập & Bảo vệ Đồ án (2412L – Nhóm 2)

### 1. Tổng quan dự án
- **Mục tiêu**: Xây dựng hệ thống web cho công viên giải trí Keansburg Park, gồm frontend (React + TypeScript, Vite), backend (PHP thuần + REST API), cơ sở dữ liệu MySQL.
- **Phạm vi (Scope cập nhật)**:
  - KHÔNG Refund
  - KHÔNG Inventory (không quản lý tồn kho vé)
  - KHÔNG giới hạn ≤30 ngày đặt trước
  - Bỏ Family package
  - Group discount 10% khi tổng quantity ≥10 vé (áp dụng ở Cart/Checkout; Tickets chỉ hiển thị rule)
  - Giá: Weekday $10; Weekend +20% surcharge → $12

### 2. Kiến trúc & Công nghệ
- **Frontend**: React 18, TypeScript, Vite, React Router, Context API
  - Thư mục chính: `frontend/src`
  - Trang tiêu biểu: `Home.tsx`, `Ticket.tsx`, `Cart.tsx`, `Checkout.tsx`, `pages/account/Orders.tsx`, `pages/admin/*`
  - Thành phần: `components/layout/Navbar.tsx`, `components/QRCodeDisplay.tsx`
  - Logic giá: `lib/pricing.ts`
- **Backend**: PHP REST-style endpoints
  - Gốc API: `backend/public/api`
  - Auth: `auth/login.php`, `auth/signup.php`, `auth/forgot-password.php`
  - Tickets: `tickets.php`
  - Bookings/Orders: `bookings/create.php`, `account/orders.php`, `account/order-details.php`
  - Admin: `admin/*.php` (tickets, zones, attractions, gallery, dashboard)
- **Database**: MySQL (bảng `users`, `tickets`, `bookings`, `bookingdetails`, `payments`, ...)

### 3. Chức năng chính (bám sát codebase)
#### 3.1 Authentication (Signup/Login/Logout)
- JWT cho xác thực; FE lưu token (localStorage/sessionStorage) qua `AuthContext`.
- API: `POST /api/auth/login`, `POST /api/auth/signup`, `POST /api/auth/forgot-password`
- Token gửi qua header `Authorization: Bearer <token>`.

#### 3.2 Tickets & Pricing
- Hiển thị vé Amusement Park / Water Park; giá theo ngày.
- Pricing rule: Weekday $10; Weekend +20% (=$12).
- Group discount 10% khi tổng quantity ≥10 (chỉ áp dụng ở Cart/Checkout).
- File: `frontend/src/pages/Ticket.tsx`, `frontend/src/lib/pricing.ts`.

#### 3.3 Cart
- Lưu trữ FE (localStorage); hook `useCart.ts` quản lý items và tổng tiền.
- Tính giảm giá nhóm 10% khi tổng quantity ≥10.
- File: `frontend/src/pages/Cart.tsx`, `frontend/src/hooks/useCart.ts`.

#### 3.4 Checkout & Tạo Booking
- Xác nhận đơn từ Cart, tạo `bookings` và `bookingdetails`, sinh `ticket_code`.
- API: `POST /api/bookings/create.php` (mock payment → status=PAID).
- File: `frontend/src/pages/Checkout.tsx`.

#### 3.5 Order History (Member)
- Danh sách orders (phân trang, filter), modal chi tiết, hiển thị QR cho từng vé.
- API: `GET /api/account/orders.php`, `GET /api/account/order-details.php?order_id=...`
- FE: `frontend/src/pages/account/Orders.tsx`, `components/QRCodeDisplay.tsx`.
- Cấu trúc item: `ticket_name`, `quantity`, `unit_price`, `line_total`, `ticket_code`; QR render từ `TICKET:<ticket_code>`.

#### 3.6 Admin (demo tối thiểu)
- Quản lý tickets, zones, attractions, gallery, dashboard đếm số liệu.
- API: `api/admin/*.php`; FE: `frontend/src/pages/admin/*`.

### 4. Quy tắc giá & ví dụ tính toán
| Rule | Mô tả |
|---|---|
| Weekday | $10 |
| Weekend | $12 (surcharge +20% so với weekday) |
| Group discount | 10% khi tổng quantity ≥10 (áp dụng ở Cart/Checkout) |

Ví dụ JSON tổng tiền (áp dụng discount ở Checkout):
```json
{
  "subtotal": 120,
  "groupDiscount": 12,
  "total": 108
}
```

### 5. API tiêu biểu (trích)
#### 5.1 Orders list
`GET /api/account/orders`
```json
{
  "status": "success",
  "orders": [
    {"id": 5, "order_date": "2025-09-22", "total_amount": 24.0, "status": "PAID", "item_count": 2, "ticket_names": "Amusement Park, Water Park"}
  ],
  "pagination": {"current_page": 1, "per_page": 5, "total_orders": 33, "total_pages": 7}
}
```

#### 5.2 Order details
`GET /api/account/order-details?order_id=5`
```json
{
  "status": "success",
  "order": {
    "id": 5,
    "order_date": "2025-09-22 10:20:00",
    "total_amount": 24.0,
    "status": "PAID",
    "customer": {"full_name": "John Doe", "email": "john@example.com", "phone": "+123"},
    "items": [
      {"id": 101, "ticket_name": "Amusement Park", "quantity": 1, "unit_price": 12.0, "line_total": 12.0, "ticket_code": "250927-1000"}
    ],
    "payments": [
      {"amount": 24.0, "provider": "MockPay", "paid_at": "2025-09-22 10:21:00", "status": "SUCCESS"}
    ]
  }
}
```

### 6. Out-of-scope & Loại bỏ
- Refund: KHÔNG hỗ trợ.
- Inventory (tồn kho vé): KHÔNG quản lý.
- Giới hạn ≤30 ngày đặt trước: KHÔNG áp dụng.
- Family package: ĐÃ bỏ.

### 7. Hướng dẫn demo/bảo vệ
- Luồng demo đề xuất:
  1) Tickets → chọn ngày weekday/weekend để thấy giá chênh lệch.
  2) Add to Cart nhiều vé để đạt ngưỡng ≥10, xem discount 10% ở Cart.
  3) Checkout → tạo booking; quan sát `booking_code` và các `ticket_code` sinh ra.
  4) Vào Account → Orders → View Details → xem QR theo từng vé.
  5) Admin → kiểm tra danh sách entities và dashboard counts.
- Điểm nhấn: không có refund/tồn kho/≤30 ngày; quy tắc giá rõ ràng; QR code vé hiển thị trong lịch sử đơn hàng.

### 8. Tài nguyên & đường dẫn liên quan
- Frontend: `frontend/src/*`
- Backend: `backend/public/api/*`
- Pricing logic: `frontend/src/lib/pricing.ts`
- Orders page (QR): `frontend/src/pages/account/Orders.tsx`
- Database script: `database/sql/keansburg_sql_master.sql`


