# Keansburg Codebase Map (Summary)

**Mục tiêu:** Tóm tắt mô tả & chức năng các file chính đang được sử dụng trong dự án Keansburg Park để phục vụ ôn tập & bảo vệ đồ án.

**Phạm vi:** Frontend (React/Vite/TSX) & Backend (PHP/MySQL) theo "codebase tree 0310.txt". Chỉ liệt kê file THỰC SỰ CÓ trong tree.

**Cách đọc:** 
- Tìm nhóm FE/BE tương ứng.
- Dựa cột "Được gọi từ / Dùng bởi" để lần ngược luồng.
- Dùng phần "Flow tra cứu nhanh" ở cuối để đi theo use case.

---

# Bản đồ Codebase Keansburg Park

## Mục tiêu & Cách đọc

Tài liệu này cung cấp bản đồ tổng quan về cấu trúc codebase của dự án Keansburg Park, giúp developer nhanh chóng hiểu được:
- **File nào làm gì**: Chức năng chính của từng file
- **File nào gọi file nào**: Mối quan hệ phụ thuộc và luồng dữ liệu
- **File nào đang được sử dụng**: Tình trạng hoạt động trong hệ thống

**Cách đọc bảng:**
- **File**: Đường dẫn file trong codebase
- **Chức năng chính**: Nhiệm vụ chính của file
- **Được gọi từ / Dùng bởi**: Các file/component sử dụng file này
- **Ghi chú**: Thông tin bổ sung quan trọng

---

## 1) Frontend – Pages (.tsx)

| File | Chức năng chính | Được gọi từ / Dùng bởi | Ghi chú |
|---|---|---|---|
| `frontend/src/pages/Home.tsx` | Trang chủ hiển thị attractions, gallery, reviews | AppRouter.tsx | Landing page chính với carousel và sections |
| `frontend/src/pages/Ticket.tsx` | Render calendar + base price, bắn event Add-to-Cart | AppRouter.tsx | Gọi services/api.ts lấy dữ liệu vé, sử dụng useCart hook |
| `frontend/src/pages/Cart.tsx` | Hiển thị items, tính tổng & discount ≥11 vé | AppRouter.tsx | Client-side pricing logic, điều hướng sang Checkout |
| `frontend/src/pages/Checkout.tsx` | Gửi payload tới BE tạo order, nhận QR/order_code | AppRouter.tsx | Đồng bộ logic giá với BE, mock payment |
| `frontend/src/pages/Login.tsx` | Giao diện đăng nhập, xử lý authentication | AppRouter.tsx | Gọi auth/login.php, cập nhật AuthContext |
| `frontend/src/pages/Signup.tsx` | Giao diện đăng ký tài khoản mới | AppRouter.tsx | Gọi auth/signup.php, validation form |
| `frontend/src/pages/Info.tsx` | Trang thông tin về công viên | AppRouter.tsx | Static content về lịch sử và thông tin |
| `frontend/src/pages/Gallery.tsx` | Hiển thị thư viện ảnh công viên | AppRouter.tsx | Gọi gallery.php API, responsive grid layout |
| `frontend/src/pages/Guideline.tsx` | Hướng dẫn sử dụng và quy định | AppRouter.tsx | Static content về rules và guidelines |
| `frontend/src/pages/Policy.tsx` | Chính sách bảo mật và điều khoản | AppRouter.tsx | Legal documents và privacy policy |
| `frontend/src/pages/Service.tsx` | Thông tin dịch vụ và tiện ích | AppRouter.tsx | Service information và facilities |
| `frontend/src/pages/NotFound.tsx` | Trang 404 khi không tìm thấy route | AppRouter.tsx | Error handling cho invalid routes |
| `frontend/src/pages/Amusement-park.tsx` | Thông tin công viên giải trí | AppRouter.tsx | Hiển thị attractions và rides |
| `frontend/src/pages/Water-park.tsx` | Thông tin công viên nước | AppRouter.tsx | Hiển thị water attractions và pools |
| `frontend/src/pages/Restaurants.tsx` | Danh sách nhà hàng trong công viên | AppRouter.tsx | Gọi admin/restaurants.php, hiển thị menu |
| `frontend/src/pages/account/profile.tsx` | Quản lý thông tin cá nhân | AppRouter.tsx | Gọi account/profile.php và updateprofile.php |
| `frontend/src/pages/account/Orders.tsx` | Fetch danh sách orders by token | AppRouter.tsx | Gọi account/orders.php, link sang chi tiết |
| `frontend/src/pages/admin/AdminDashboard.tsx` | Dashboard tổng quan với thống kê | AppRouter.tsx | Gọi admin/dashboard.php, real-time data |
| `frontend/src/pages/admin/AdminTickets.tsx` | CRUD tối thiểu cho tickets | AppRouter.tsx | Gọi admin/tickets.php, quản lý giá vé |
| `frontend/src/pages/admin/AdminZones.tsx` | CRUD tối thiểu cho zones | AppRouter.tsx | Gọi admin/zones.php, quản lý khu vực |
| `frontend/src/pages/admin/AdminAttractions.tsx` | CRUD tối thiểu cho attractions | AppRouter.tsx | Gọi admin/attractions.php, quản lý rides |
| `frontend/src/pages/admin/AdminRestaurants.tsx` | CRUD tối thiểu cho restaurants | AppRouter.tsx | Gọi admin/restaurants.php, quản lý menu |
| `frontend/src/pages/admin/AdminGallery.tsx` | CRUD tối thiểu cho gallery | AppRouter.tsx | Gọi admin/gallery.php và upload.php |
| `frontend/src/pages/admin/AdminUsers.tsx` | CRUD tối thiểu cho users | AppRouter.tsx | Gọi admin/users.php, quản lý tài khoản |
| `frontend/src/pages/admin/AdminOrders.tsx` | CRUD tối thiểu cho orders | AppRouter.tsx | Gọi admin/orders.php, xem và cập nhật |
| `frontend/src/pages/admin/AdminFeedback.tsx` | CRUD tối thiểu cho feedback | AppRouter.tsx | Gọi admin/feedback.php, phản hồi khách hàng |
| `frontend/src/pages/admin/AdminContact.tsx` | CRUD tối thiểu cho messages | AppRouter.tsx | Gọi admin/messages.php, quản lý liên hệ |

---

## 2) Frontend – App, Router, Context, Hooks, Lib, Services

| File | Chức năng chính | Được gọi từ / Dùng bởi | Ghi chú |
|---|---|---|---|
| `frontend/src/App.tsx` | Component gốc, quản lý routing và providers | main.tsx | Chứa AuthContext provider, layout chính |
| `frontend/src/AppRouter.tsx` | Định tuyến SPA, bảo vệ route, map path → component | App.tsx | Protected routes cho admin, public routes cho user |
| `frontend/src/main.tsx` | Entry point của ứng dụng React | Build system | Khởi tạo React app, render App component |
| `frontend/src/contexts/AuthContext.tsx` | Lưu token/user, cung cấp guard, đọc/ghi từ localStorage | App.tsx, tất cả protected pages | JWT token management, authentication state |
| `frontend/src/contexts/FeedbackContext.tsx` | Quản lý feedback state và submissions | Feedback forms | Context cho feedback handling |
| `frontend/src/hooks/useCart.ts` | Quản lý state giỏ, thêm/sửa/xóa item, tính tổng | Cart.tsx, Ticket.tsx, Checkout.tsx | Local storage + state management, chuẩn bị payload checkout |
| `frontend/src/hooks/useOnlineUsers.ts` | Theo dõi số lượng users online real-time | AdminDashboard.tsx | WebSocket connection cho live user count |
| `frontend/src/hooks/useRealTime.ts` | Real-time data updates và notifications | Admin pages | WebSocket connections cho admin dashboard |
| `frontend/src/hooks/useScrollAnimation.ts` | Logic animation scroll và fade effects | ScrollAnimation.tsx | Animation utilities cho smooth scrolling |
| `frontend/src/lib/pricing.ts` | Hàm tính base price weekday/weekend, áp logic discount | Ticket.tsx, Cart.tsx | BE là nguồn chân lý, FE dùng để hiển thị & dự tính |
| `frontend/src/services/api.ts` | Wrapper fetch/axios, gắn Authorization header | Tất cả pages cần API | Phương thức: login/signup, tickets, bookings/create, account/orders, admin/* |

---

## 3) Backend – Config & Middleware

| File | Chức năng chính | Được gọi từ / Dùng bởi | Ghi chú |
|---|---|---|---|
| `backend/config/db.php` | Tạo kết nối PDO tới MySQL, dùng prepared statements | Tất cả API endpoints | Database connection singleton, error handling |
| `backend/config/env.php` | Load biến môi trường (.env) như DB_HOST/DB_USER/DB_PASS | Tất cả API files | Environment configuration, security settings |
| `backend/middleware/auth.php` | Xác thực JWT/token cho endpoints cần login/admin | Protected API endpoints | Trả lỗi 401 khi token không hợp lệ, role-based access |

---

## 4) Backend – Public API (auth, account, bookings, tickets, reviews, gallery, messages)

| Endpoint/File | Chức năng chính | Input/Output (ngắn gọn) | Gọi từ FE | Ghi chú |
|---|---|---|---|---|
| `backend/public/api/auth/login.php` | POST: nhận email/password; verify; trả token + user | Input: email, password / Output: token, user_data | Login.tsx | JWT authentication, session management |
| `backend/public/api/auth/signup.php` | POST: đăng ký tài khoản mới | Input: email, password, user_info / Output: success, user_id | Signup.tsx | User registration, validation |
| `backend/public/api/auth/forgot-password.php` | POST: reset mật khẩu | Input: email / Output: reset_link | Forgot password form | Password reset functionality |
| `backend/public/api/account/profile.php` | GET: lấy thông tin profile user | Input: token / Output: user_profile | profile.tsx | User profile data |
| `backend/public/api/account/updateprofile.php` | POST: cập nhật thông tin profile | Input: token, updated_data / Output: success | profile.tsx | Profile update |
| `backend/public/api/account/orders.php` | GET: yêu cầu token; trả danh sách orders theo user_id | Input: token / Output: orders_list | Orders.tsx | User order history |
| `backend/public/api/account/order-details.php` | GET: chi tiết order cụ thể | Input: token, order_id / Output: order_details | Orders.tsx | Order details view |
| `backend/public/api/bookings/create.php` | POST: nhận cart + user/guest; validate + tính giá cuối; tạo order | Input: cart_data, user_token / Output: order_code, QR | Checkout.tsx | Weekend +20%, discount ≥11 vé |
| `backend/public/api/tickets.php` | GET: trả danh sách vé/giá | Input: none / Output: tickets_list, pricing | Ticket.tsx | Available tickets and prices |
| `backend/public/api/reviews.php` | GET/POST: lấy/gửi reviews | Input: review_data / Output: reviews_list | Various pages | Customer reviews |
| `backend/public/api/feedback.php` | POST: gửi feedback từ user | Input: feedback_data / Output: success | Feedback forms | User feedback submission |
| `backend/public/api/gallery.php` | GET: lấy ảnh gallery | Input: none / Output: images_list | Gallery.tsx | Image gallery data |
| `backend/public/api/messages.php` | POST: gửi message liên hệ | Input: message_data / Output: success | Contact forms | Contact message handling |
| `backend/public/api/ping.php` | GET: health check endpoint | Input: none / Output: status | Frontend, monitoring | API status check |

---

## 5) Backend – Admin API

| Endpoint/File | CRUD / Chức năng | Yêu cầu quyền | Gọi từ FE | Ghi chú |
|---|---|---|---|---|
| `backend/public/api/admin/dashboard.php` | GET: thống kê tổng quan hệ thống | Admin role | AdminDashboard.tsx | Statistics, metrics, real-time data |
| `backend/public/api/admin/tickets.php` | CRUD vé; validate dữ liệu cơ bản; trả JSON | Admin role | AdminTickets.tsx | Ticket management, pricing control |
| `backend/public/api/admin/zones.php` | CRUD khu vực trong công viên | Admin role | AdminZones.tsx | Zone management, area control |
| `backend/public/api/admin/attractions.php` | CRUD attractions và rides | Admin role | AdminAttractions.tsx | Attraction management, ride control |
| `backend/public/api/admin/restaurants.php` | CRUD nhà hàng và menu | Admin role | AdminRestaurants.tsx | Restaurant management, menu control |
| `backend/public/api/admin/gallery.php` | CRUD ảnh gallery, upload management | Admin role | AdminGallery.tsx | Image management, file uploads |
| `backend/public/api/admin/users.php` | CRUD users, quản lý tài khoản | Admin role | AdminUsers.tsx | User management, account control |
| `backend/public/api/admin/orders.php` | Liệt kê/tìm orders, filter (nếu có) | Admin role | AdminOrders.tsx | Order management, status updates |
| `backend/public/api/admin/feedback.php` | Duyệt review (pending → approved) | Admin role | AdminFeedback.tsx | Feedback moderation, approval system |
| `backend/public/api/admin/messages.php` | Quản lý contact messages | Admin role | AdminContact.tsx | Contact management, message handling |
| `backend/public/api/admin/upload.php` | Upload files, xử lý media | Admin role | Admin upload forms | File upload handling, media processing |

---

## 6) Flow tra cứu nhanh (theo Use Case)

### 1) **Login (Member/Admin)**  
**FE:** `Login.tsx` → `services/api.ts`  
**BE:** `public/api/auth/login.php` → `middleware/auth.php` → `config/db.php`  
**Kết quả:** token + user; FE lưu `AuthContext.tsx`

### 2) **Tickets → Cart → Checkout (Booking)**  
**FE:** `Ticket.tsx` (chọn vé/ngày) → `useCart.ts` → `Cart.tsx` → `Checkout.tsx` → `services/api.ts`  
**BE:** `public/api/bookings/create.php` (tính giá & tạo order) → `account/orders.php` (xem lại)  
**Quy tắc:** weekday $10, weekend +20%, discount 10% khi tổng ≥11 vé (BE là nguồn chân lý)

### 3) **Order History (Member)**  
**FE:** `pages/account/Orders.tsx` → `services/api.ts`  
**BE:** `public/api/account/orders.php` (yêu cầu token)

### 4) **Reviews → Admin Duyệt**  
**FE:** `FeedbackContext.tsx` / form gửi review → `AdminFeedback.tsx`  
**BE:** `public/api/reviews.php` → `public/api/admin/feedback.php` (duyệt)

### 5) **Admin CRUD (ví dụ: Attractions)**  
**FE:** `AdminAttractions.tsx` → `services/api.ts`  
**BE:** `public/api/admin/attractions.php` → `middleware/auth.php` → `config/db.php`

---

## 7) Phụ lục kỹ thuật (liên quan file trong tree)

- **.env & config/env.php**: chứa biến môi trường (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS, VITE_API_URL...). Không commit .env.

- **PDO (config/db.php)**: bắt buộc dùng prepared statements; bắt lỗi try-catch.

- **JWT (middleware/auth.php + composer package)**: sinh/verify token; FE gắn Bearer vào Authorization header.

- **.htaccess (nếu có trong tree)**: rewrite / bảo vệ file; bật CORS (nếu dùng).

- **Composer (composer.json, vendor/… nếu có trong tree)**: quản lý package như firebase/php-jwt; chạy `composer install` trước khi dùng API auth.

---

## 🎯 Frontend (React + TypeScript)

### Core Application Files

| File | Chức năng chính | Được gọi từ / Dùng bởi | Ghi chú |
|------|------------------|------------------------|---------|
| `frontend/src/main.tsx` | Entry point của ứng dụng React | Build system | Khởi tạo React app |
| `frontend/src/App.tsx` | Component gốc, quản lý routing | main.tsx | Chứa AuthContext provider |
| `frontend/src/AppRouter.tsx` | Định nghĩa tất cả routes | App.tsx | Protected routes cho admin |
| `frontend/src/vite.config.ts` | Cấu hình Vite build tool | Build system | Proxy API calls |

### Authentication & Context

| File | Chức năng chính | Được gọi từ / Dùng bởi | Ghi chú |
|------|------------------|------------------------|---------|
| `frontend/src/contexts/AuthContext.tsx` | Quản lý authentication state | App.tsx, tất cả protected pages | JWT token management |
| `frontend/src/components/ProtectedRoute.tsx` | Bảo vệ routes yêu cầu đăng nhập | AppRouter.tsx | Redirect về login nếu chưa auth |
| `frontend/src/pages/auth/Login.tsx` | Giao diện đăng nhập | AppRouter.tsx | Gọi API login |
| `frontend/src/pages/auth/Signup.tsx` | Giao diện đăng ký | AppRouter.tsx | Gọi API signup |

### Core Business Pages

| File | Chức năng chính | Được gọi từ / Dùng bởi | Ghi chú |
|------|------------------|------------------------|---------|
| `frontend/src/pages/Home.tsx` | Trang chủ, hiển thị attractions | AppRouter.tsx | Landing page chính |
| `frontend/src/pages/Ticket.tsx` | Mua vé, hiển thị ticket types | AppRouter.tsx | Sử dụng useCart hook |
| `frontend/src/pages/Cart.tsx` | Giỏ hàng, quản lý items | AppRouter.tsx | Sử dụng useCart hook |
| `frontend/src/pages/Checkout.tsx` | Thanh toán, tạo order | AppRouter.tsx | Gọi API tạo booking |
| `frontend/src/pages/Amusement-park.tsx` | Thông tin công viên giải trí | AppRouter.tsx | Hiển thị attractions |
| `frontend/src/pages/Water-park.tsx` | Thông tin công viên nước | AppRouter.tsx | Hiển thị water attractions |
| `frontend/src/pages/Restaurants.tsx` | Danh sách nhà hàng | AppRouter.tsx | Hiển thị restaurants |

### User Account Management

| File | Chức năng chính | Được gọi từ / Dùng bởi | Ghi chú |
|------|------------------|------------------------|---------|
| `frontend/src/pages/account/profile.tsx` | Quản lý thông tin cá nhân | AppRouter.tsx | Gọi API update profile |
| `frontend/src/pages/account/Orders.tsx` | Xem lịch sử đơn hàng | AppRouter.tsx | Gọi API lấy orders |

### Admin Management

| File | Chức năng chính | Được gọi từ / Dùng bởi | Ghi chú |
|------|------------------|------------------------|---------|
| `frontend/src/pages/admin/AdminDashboard.tsx` | Dashboard tổng quan admin | AppRouter.tsx | Thống kê hệ thống |
| `frontend/src/pages/admin/AdminTickets.tsx` | Quản lý vé | AppRouter.tsx | CRUD operations |
| `frontend/src/pages/admin/AdminAttractions.tsx` | Quản lý attractions | AppRouter.tsx | CRUD operations |
| `frontend/src/pages/admin/AdminRestaurants.tsx` | Quản lý nhà hàng | AppRouter.tsx | CRUD operations |
| `frontend/src/pages/admin/AdminOrders.tsx` | Quản lý đơn hàng | AppRouter.tsx | Xem và cập nhật orders |
| `frontend/src/pages/admin/AdminUsers.tsx` | Quản lý người dùng | AppRouter.tsx | CRUD operations |
| `frontend/src/pages/admin/AdminGallery.tsx` | Quản lý thư viện ảnh | AppRouter.tsx | Upload và quản lý images |
| `frontend/src/pages/admin/AdminFeedback.tsx` | Quản lý feedback | AppRouter.tsx | Xem và phản hồi feedback |
| `frontend/src/pages/admin/AdminZones.tsx` | Quản lý khu vực | AppRouter.tsx | CRUD operations |
| `frontend/src/pages/admin/AdminContact.tsx` | Quản lý liên hệ | AppRouter.tsx | Xem messages |

### Layout Components

| File | Chức năng chính | Được gọi từ / Dùng bởi | Ghi chú |
|------|------------------|------------------------|---------|
| `frontend/src/components/layout/Navbar.tsx` | Navigation bar chính | Tất cả pages | Responsive navigation |
| `frontend/src/components/layout/Footer.tsx` | Footer của website | Tất cả pages | Links và thông tin liên hệ |
| `frontend/src/components/layout/AdminLayout.tsx` | Layout cho admin pages | Tất cả admin pages | Sidebar và header admin |
| `frontend/src/components/layout/SideBar.tsx` | Sidebar navigation cho admin | AdminLayout.tsx | Admin menu navigation |

### Utility Components

| File | Chức năng chính | Được gọi từ / Dùng bởi | Ghi chú |
|------|------------------|------------------------|---------|
| `frontend/src/hooks/useCart.ts` | Quản lý giỏ hàng state | Cart.tsx, Ticket.tsx, Checkout.tsx | Local storage + state management |
| `frontend/src/components/ItemDetailsModal.tsx` | Modal hiển thị chi tiết item | Ticket.tsx, Cart.tsx | Product details popup |
| `frontend/src/components/QRCodeDisplay.tsx` | Hiển thị QR code | Checkout.tsx, Orders.tsx | QR code cho tickets |
| `frontend/src/components/CountUp.tsx` | Animation đếm số | Home.tsx, AdminDashboard.tsx | Số liệu thống kê |
| `frontend/src/components/ScrollAnimation.tsx` | Animation scroll | Nhiều pages | Fade in effects |
| `frontend/src/components/ScrollToTop.tsx` | Nút scroll lên đầu trang | Tất cả pages | UX improvement |

### Services & API

| File | Chức năng chính | Được gọi từ / Dùng bởi | Ghi chú |
|------|------------------|------------------------|---------|
| `frontend/src/services/api.ts` | API client, HTTP requests | Tất cả pages cần API | Axios configuration |
| `frontend/src/contexts/FeedbackContext.tsx` | Quản lý feedback state | Feedback forms | Context cho feedback |

### Utility Files

| File | Chức năng chính | Được gọi từ / Dùng bởi | Ghi chú |
|------|------------------|------------------------|---------|
| `frontend/src/lib/pricing.ts` | Logic tính giá vé | Ticket.tsx, Cart.tsx | Pricing calculations |
| `frontend/src/hooks/useOnlineUsers.ts` | Theo dõi online users | AdminDashboard.tsx | Real-time user count |
| `frontend/src/hooks/useRealTime.ts` | Real-time data updates | Admin pages | WebSocket connections |
| `frontend/src/hooks/useScrollAnimation.ts` | Scroll animation logic | ScrollAnimation.tsx | Animation utilities |

---

## 🔧 Backend (PHP + MySQL)

### Core Configuration

| File | Chức năng chính | Được gọi từ / Dùng bởi | Ghi chú |
|------|------------------|------------------------|---------|
| `backend/config/db.php` | Kết nối database | Tất cả API endpoints | MySQL connection |
| `backend/config/env.php` | Load environment variables | Tất cả API files | .env configuration |
| `backend/middleware/auth.php` | JWT authentication middleware | Protected API endpoints | Token validation |
| `backend/utils/jwt.php` | JWT token utilities | auth.php, login/signup APIs | Token generation/validation |

### Authentication APIs

| File | Chức năng chính | Được gọi từ / Dùng bởi | Ghi chú |
|------|------------------|------------------------|---------|
| `backend/public/api/auth/login.php` | API đăng nhập | Frontend Login.tsx | JWT token response |
| `backend/public/api/auth/signup.php` | API đăng ký | Frontend Signup.tsx | User registration |
| `backend/public/api/auth/forgot-password.php` | API quên mật khẩu | Frontend (planned) | Password reset |

### User Account APIs

| File | Chức năng chính | Được gọi từ / Dùng bởi | Ghi chú |
|------|------------------|------------------------|---------|
| `backend/public/api/account/profile.php` | Lấy thông tin profile | Frontend profile.tsx | User data |
| `backend/public/api/account/updateprofile.php` | Cập nhật profile | Frontend profile.tsx | Update user info |
| `backend/public/api/account/orders.php` | Lấy danh sách orders | Frontend Orders.tsx | User order history |
| `backend/public/api/account/order-details.php` | Chi tiết order | Frontend Orders.tsx | Order details |

### Booking & Tickets

| File | Chức năng chính | Được gọi từ / Dùng bởi | Ghi chú |
|------|------------------|------------------------|---------|
| `backend/public/api/bookings/create.php` | Tạo booking mới | Frontend Checkout.tsx | Order creation |
| `backend/public/api/tickets.php` | Lấy danh sách vé | Frontend Ticket.tsx | Available tickets |

### Content Management APIs

| File | Chức năng chính | Được gọi từ / Dùng bởi | Ghi chú |
|------|------------------|------------------------|---------|
| `backend/public/api/gallery.php` | Lấy ảnh gallery | Frontend Gallery.tsx | Image gallery |
| `backend/public/api/reviews.php` | Lấy reviews | Frontend (various pages) | Customer reviews |
| `backend/public/api/feedback.php` | Submit feedback | Frontend feedback forms | User feedback |
| `backend/public/api/messages.php` | Contact messages | Frontend contact forms | Contact form submissions |

### Admin Management APIs

| File | Chức năng chính | Được gọi từ / Dùng bởi | Ghi chú |
|------|------------------|------------------------|---------|
| `backend/public/api/admin/dashboard.php` | Dashboard data | Frontend AdminDashboard.tsx | Statistics và metrics |
| `backend/public/api/admin/tickets.php` | CRUD tickets | Frontend AdminTickets.tsx | Ticket management |
| `backend/public/api/admin/attractions.php` | CRUD attractions | Frontend AdminAttractions.tsx | Attraction management |
| `backend/public/api/admin/restaurants.php` | CRUD restaurants | Frontend AdminRestaurants.tsx | Restaurant management |
| `backend/public/api/admin/orders.php` | Quản lý orders | Frontend AdminOrders.tsx | Order management |
| `backend/public/api/admin/users.php` | CRUD users | Frontend AdminUsers.tsx | User management |
| `backend/public/api/admin/gallery.php` | Quản lý gallery | Frontend AdminGallery.tsx | Image management |
| `backend/public/api/admin/feedback.php` | Quản lý feedback | Frontend AdminFeedback.tsx | Feedback management |
| `backend/public/api/admin/zones.php` | CRUD zones | Frontend AdminZones.tsx | Zone management |
| `backend/public/api/admin/messages.php` | Quản lý messages | Frontend AdminContact.tsx | Contact management |
| `backend/public/api/admin/upload.php` | Upload files | Frontend admin upload forms | File upload handling |

### Utility APIs

| File | Chức năng chính | Được gọi từ / Dùng bởi | Ghi chú |
|------|------------------|------------------------|---------|
| `backend/public/api/_cors.php` | CORS configuration | Tất cả API endpoints | Cross-origin requests |
| `backend/public/api/ping.php` | Health check | Frontend, monitoring | API status check |

---

## 📊 Database & Documentation

### Database Files

| File | Chức năng chính | Được gọi từ / Dùng bởi | Ghi chú |
|------|------------------|------------------------|---------|
| `database/sql/keansburg_sql_master.sql` | Database schema | Backend setup | Main database structure |
| `database/diagram/DBD_quang.jpg` | Database diagram | Documentation | Visual DB structure |
| `database/erd/ERD_Quang.jpg` | Entity Relationship Diagram | Documentation | ERD visualization |

### Project Documentation

| File | Chức năng chính | Được gọi từ / Dùng bởi | Ghi chú |
|------|------------------|------------------------|---------|
| `docs/Keansburg_FAQ.md` | Frequently Asked Questions | Developers, users | Common questions |
| `docs/Keansburg_Park_Project_Document.md` | Project documentation | Team | Project overview |
| `docs/README.md` | Documentation index | Developers | Doc navigation |
| `SETUP.md` | Setup instructions | Developers | Installation guide |
| `FIXES.md` | Known issues và fixes | Developers | Bug tracking |

---

## 🔄 Key Data Flows

### Authentication Flow
1. `Login.tsx` → `auth/login.php` → `AuthContext.tsx` → Protected routes
2. JWT token được lưu trong context và gửi kèm mọi API calls

### Booking Flow  
1. `Ticket.tsx` → `useCart.ts` → `Cart.tsx` → `Checkout.tsx` → `bookings/create.php`
2. Order được tạo và QR code được generate

### Admin Management Flow
1. Admin login → `AdminLayout.tsx` → Various admin pages → Corresponding admin APIs
2. CRUD operations cho tất cả entities (tickets, attractions, restaurants, etc.)

### File Upload Flow
1. Admin forms → `admin/upload.php` → `uploads/` directory → Database path storage

---

## 🔍 Flow tra cứu nhanh

### Use Case 1: User đăng nhập và mua vé
1. **Đăng nhập**: `Login.tsx` → `auth/login.php` → `AuthContext.tsx`
2. **Xem vé**: `Ticket.tsx` → `tickets.php` → `useCart.ts`
3. **Thêm vào giỏ**: `useCart.ts` → `Cart.tsx`
4. **Thanh toán**: `Checkout.tsx` → `bookings/create.php` → `QRCodeDisplay.tsx`

### Use Case 2: Admin quản lý hệ thống
1. **Đăng nhập admin**: `Login.tsx` → `auth/login.php` → `AdminLayout.tsx`
2. **Dashboard**: `AdminDashboard.tsx` → `admin/dashboard.php` → `useOnlineUsers.ts`
3. **Quản lý vé**: `AdminTickets.tsx` → `admin/tickets.php`
4. **Upload ảnh**: `AdminGallery.tsx` → `admin/upload.php` → `uploads/`

### Use Case 3: User xem thông tin và liên hệ
1. **Trang chủ**: `Home.tsx` → `gallery.php` + `reviews.php`
2. **Xem attractions**: `Amusement-park.tsx` / `Water-park.tsx`
3. **Xem nhà hàng**: `Restaurants.tsx` → `admin/restaurants.php`
4. **Gửi feedback**: `FeedbackContext.tsx` → `feedback.php`

### Use Case 4: User quản lý tài khoản
1. **Xem profile**: `profile.tsx` → `account/profile.php`
2. **Cập nhật thông tin**: `profile.tsx` → `account/updateprofile.php`
3. **Xem đơn hàng**: `Orders.tsx` → `account/orders.php` → `order-details.php`

---

## 📝 Notes

- **Frontend**: React + TypeScript + Vite, sử dụng Context API cho state management
- **Backend**: PHP với JWT authentication, RESTful API design
- **Database**: MySQL với schema được định nghĩa trong `keansburg_sql_master.sql`
- **File Storage**: Local storage trong `backend/public/uploads/` với phân loại theo type
- **Authentication**: JWT-based với middleware protection cho admin routes
- **Real-time**: WebSocket connections cho admin dashboard (online users, real-time updates)
