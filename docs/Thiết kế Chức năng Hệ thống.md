Thiết kế Chức năng Hệ thống (System Functions Design)
________________________________________
5.6.1 Chức năng 1: User Authentication (Signup, Login, Logout)
Mục tiêu
Cung cấp chức năng đăng ký, đăng nhập và đăng xuất người dùng một cách an toàn với xác thực dựa trên JWT và kiểm soát truy cập theo vai trò (role-based access control).
________________________________________
Phạm vi (Scope)
Trong phạm vi (In-scope):
•	Đăng ký người dùng với email validation
•	Đăng nhập với password verification
•	JWT token generation và validation
•	Remember me functionality (token hết hạn 30 ngày hoặc 7 ngày)
•	Role-based redirection (admin/member)
•	Logout functionality
•	Navbar user menu integration
Ngoài phạm vi (Out-of-scope):
•	Password reset qua email
•	Email verification
•	Social media login integration
•	Two-factor authentication
•	Password complexity requirements
________________________________________
File chính (Key Files)
Front-end:
• frontend/src/pages/auth/Signup.tsx
• frontend/src/pages/auth/Login.tsx
• frontend/src/components/layout/Navbar.tsx
• frontend/src/contexts/AuthContext.tsx
• frontend/src/services/api.ts
Back-end:
• backend/public/api/auth/signup.php
• backend/public/api/auth/login.php
• backend/public/api/auth/forgot-password.php
• backend/middleware/auth.php
• backend/utils/jwt.php
________________________________________
Input
• Signup: fullName, email (unique), password, phone?
• Login: email, password, remember?
• Logout: (không triển khai endpoint riêng; FE xóa token)
________________________________________
Xử lý (Processing)
Quy trình Signup:
1.	Validate các trường bắt buộc (full_name, email, password).
2.	Kiểm tra email đã tồn tại trong database chưa.
3.	Hash password bằng bcrypt.
4.	Thêm bản ghi user với role là user.
5.	Sinh JWT token (hết hạn 7 ngày).
6.	Trả về kết quả thành công/thất bại (không tiết lộ lý do email trùng).
Quy trình Login:
1.	Validate sự có mặt của email và password.
2.	Query user theo email.
3.	Verify password hash.
4.	Tạo JWT và trả về qua JSON; FE lưu token (localStorage/sessionStorage theo remember).
5.	Trả về profile cơ bản.
Quy trình Logout:
1.	Xóa session/token.
2.	Clear trạng thái authentication.
3.	Redirect đến trang login.
Authentication Middleware:
1.	Extract Bearer token từ Authorization header.
2.	Verify JWT signature và expiry.
3.	Lấy user_id và role từ payload.
4.	Gắn user context vào request.
________________________________________
Output
Signup thành công (Signup Success):
{  "status": "success",
  "message": "Signup successful",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 123,
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user"  }}
Login thành công (Login Success):
{  "status": "success",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 123,
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user"  }}
Signup thất bại (Signup Failure):
{  "status": "error",
  "message": "Registration failed"}
Login thất bại (Login Failure):
{  "status": "error",
  "message": "Incorrect username or password"}
________________________________________
Xử lý lỗi & Thông báo (Error Handling & Messages)
•	“Missing required fields” (400)
•	“Registration failed” (400) – cho trường hợp email trùng (không nêu lý do cụ thể)
•	“Incorrect username or password” (401)
•	“Email and password required” (400)
•	“Rate limit exceeded” (429) – placeholder cho tương lai
•	“Server error” (500)
________________________________________
Ghi chú đồng bộ FE ⇄ BE (Synchronization Notes)
• Navbar hiển thị tên user khi đã đăng nhập (component: frontend/src/components/layout/Navbar.tsx)
• FE state đồng bộ với BE auth thông qua `AuthContext`
• JWT token lưu trong localStorage/sessionStorage (tùy remember)
• Token gửi trong Authorization: Bearer <token> cho request cần xác thực
• Tự động redirect dựa trên role sau khi login
• Logout: FE xóa token, không có endpoint riêng
________________________________________
5.6.2 Chức năng 2: Ticket Browsing & Pricing Calendar
Mục tiêu (Objective)
Hiển thị các tùy chọn vé với giá động dựa trên ngày tham quan, đồng thời cung cấp giao diện đặt vé theo lịch (calendar) với lựa chọn zone.
________________________________________
Phạm vi (Scope)
Trong phạm vi (In-scope):
•	Calendar view hiển thị giá hàng ngày
•	Zone selection (Amusement Park, Water Park)
•	Dynamic pricing calculation (weekday $10, weekend $12)
•	Hiển thị rule giảm giá nhóm (≥11 vé được giảm 10%)
•	Cập nhật giá real-time
•	Add to cart functionality
•	Render calendar theo tháng
Ngoài phạm vi (Out-of-scope):
•	Quản lý tồn kho vé
•	Giới hạn ngày đặt (>30 ngày)
•	Seasonal pricing variations
•	Giá đặc biệt cho sự kiện
•	Áp dụng giảm giá nhóm (chỉ hiển thị rule, không tính ở đây)
________________________________________
File chính (Key Files)
Front-end:
• frontend/src/pages/Ticket.tsx
• frontend/src/lib/pricing.ts
Back-end:
• backend/public/api/tickets.php
________________________________________
Input
•	Query date (YYYY-MM-DD) hoặc khoảng tháng cho calendar rendering
•	Ticket type (amusement park, water park) – hoặc giữ 2 loại cố định
•	Ngày được chọn từ calendar
•	Quantity selection
________________________________________
Xử lý (Processing)
Tính giá Calendar (Calendar Price Calculation):
1.	Lấy danh sách ngày trong tháng
2.	Tính giá cho từng ngày (cộng surcharge cuối tuần)
3.	Base price: weekday = $10; weekend surcharge = +20% ⇒ weekend = $12
4.	Render calendar với giá của từng ngày
Render Ticket Card:
•	3 card: General (hiển thị rule & Book now), Zone 1 (Amusement), Zone 2 (Water)
•	Bao gồm mô tả ngắn + nút Book Now
•	Hiển thị rule giảm giá nhóm (≥11 vé giảm 10%)
Date Selection:
•	Người dùng chọn ngày → tự động điền giá theo ngày đó
•	Thêm vào Cart với ngày và giá đã chọn
Pricing Rules (bắt buộc áp dụng):
• Base price weekday = $10 USD
• Weekend (Sat/Sun) = $12 USD (20% surcharge)
• Group discount = 10% khi tổng quantity ≥11 (áp dụng ở Cart/Checkout; Tickets chỉ hiển thị rule)
________________________________________
Output
Frontend Rendering:
•	Calendar với giá mỗi ngày
•	Ticket cards với mô tả
•	Event handling khi chọn ngày
•	Hiển thị rule giảm giá nhóm
Backend JSON Response:
{  "date": "2024-01-15",
  "base_price": 10,
  "weekend": false,
  "price_of_day": 10}
Success Payload:
{  "status": "success",
  "data": [
    {      "date": "2024-01-15",
      "base_price": 10,
      "weekend": false,
      "price_of_day": 10    },
    {      "date": "2024-01-16",
      "base_price": 10,
      "weekend": true,
      "price_of_day": 12    }  ]}
________________________________________
Xử lý lỗi & Thông báo (Error Handling & Messages)
•	“Invalid date format” (400) – hiển thị toast
•	“Date not available” (400) – hiển thị toast
•	“Backend error” (500) – fallback sang static rule display + hướng dẫn reload
•	“Please select a valid date” (validation error)
•	“Failed to load pricing data” (API error)
________________________________________
Ghi chú đồng bộ FE ⇄ BE (Synchronization Notes)
• Không quản lý tồn kho
• Chỉ hiển thị rule giảm giá nhóm; không áp dụng tại đây (áp dụng tại Cart/Checkout)
• Calendar có thể tính từ FE theo `pricing.ts` hoặc kết hợp BE tùy yêu cầu
•	Cập nhật giá real-time dựa trên ngày được chọn
•	Cart lưu trữ ngày và giá đã chọn
•	Nếu backend không khả dụng → fallback dùng static pricing rules
________________________________________
5.6.3 Chức năng 3: Cart Management (Add/Update/Remove)
Mục tiêu (Objective)
Quản lý giỏ hàng với khả năng chỉnh sửa item, cập nhật số lượng, và tính toán giá real-time có áp dụng logic giảm giá nhóm.
________________________________________
Phạm vi (Scope)
Trong phạm vi (In-scope):
•	Thêm item vào giỏ hàng với merge logic (ticket_type + visit_date)
•	Cập nhật số lượng với validation
•	Xóa item riêng lẻ
•	Xóa toàn bộ giỏ hàng
•	Tính toán lại giá real-time với group discount
•	Giữ trạng thái giỏ hàng (localStorage cho guest, API sync tùy chọn cho user đã login)
•	Chuẩn hóa trạng thái cart
Ngoài phạm vi (Out-of-scope):
•	Chia sẻ giỏ hàng giữa các user
•	Cart expiration timers
•	Kiểm tra tồn kho
•	Cross-device cart sync
•	Lưu cart trên server (chỉ optional)
________________________________________
File chính (Key Files)
Front-end:
• frontend/src/pages/Cart.tsx
• frontend/src/hooks/useCart.ts
• frontend/src/lib/pricing.ts
Back-end:
• (Không bắt buộc) – hiện tại cart lưu FE/localStorage
________________________________________
Input
•	CartItem:
{  "ticket_type": "string",
  "visit_date": "YYYY-MM-DD",
  "unit_price": 10,
  "quantity": 2}
•	Full Cart: Array các CartItem
•	User Actions: Add, update quantity, remove, clear cart
________________________________________
Xử lý (Processing)
Add Item Logic:
1.	Merge theo key (ticket_type + visit_date) → cộng dồn quantity
2.	Validate data item
3.	Update cart state và lưu storage
Update Item Logic:
1.	Thay đổi quantity, nếu =0 thì remove item
2.	Validate số lượng hợp lệ (1–99)
3.	Tính lại tổng
Remove Item Logic:
1.	Xóa item khỏi cart array
2.	Tính lại tổng
3.	Update storage
Price Calculation:
• Subtotal = Σ(unit_price × quantity)
• Group discount = 10% nếu tổng quantity ≥11, ngược lại = 0
• Total = Subtotal – Discount
Synchronization:
•	Guest: lưu cart trong localStorage
•	Logged-in: sync với API /cart (tùy chọn, không bắt buộc)
________________________________________
Output
Cart State Normalization:
{  "items": [
    {      "ticket_type": "amusement_park",
      "visit_date": "2024-01-15",
      "unit_price": 10,
      "quantity": 2    }  ],
  "subtotal": 20,
  "discount": 0,
  "total": 20}
UI Components:
•	Bảng item với nút edit/remove
•	Nút chỉnh số lượng
•	Chức năng xóa item
•	Ghi chú discount khi đạt điều kiện (≥11 vé)
Success Payload:
{  "status": "success",
  "cart": {
    "items": [...],
    "subtotal": 100,
    "discount": 10,
    "total": 90  }}
________________________________________
Xử lý lỗi & Thông báo (Error Handling & Messages)
•	“Invalid quantity (must be 1-99)” (400) → block & hiển thị toast
•	“Invalid date format” (400) → block & hiển thị toast
•	“Negative quantity not allowed” (400) → block & hiển thị toast
•	“Item removed successfully” (success toast)
•	“Cart updated” (success toast)
•	“Failed to update cart” (500 – API error)
________________________________________
Ghi chú đồng bộ FE ⇄ BE (Synchronization Notes)
•	Nguồn giá vé lấy từ Tickets/Quote BE, cart chỉ lưu unit_price đã chọn
•	Guest user: cart lưu trong localStorage hoàn toàn
•	Logged-in user: có thể sync server qua API /cart
•	FE quản lý cart state bằng store/context để real-time update
•	Tự động tính lại giá khi có thay đổi
•	Rule group discount áp dụng ngay real-time
•	Data cart được validate trước khi submit checkout
________________________________________
5.6.4 Chức năng 4: Checkout & Order Creation (Mock payment)
Mục tiêu (Objective)
Xử lý giỏ hàng thành các order đã xác nhận với mock payment, tạo ticket và hiển thị trang xác nhận đơn hàng.
________________________________________
Phạm vi (Scope)
Trong phạm vi (In-scope):
•	Thu thập & validate thông tin khách hàng
•	Validate order (client + server)
•	Recalculate giá tại server có áp dụng group discount
•	Mock payment processing
•	Tạo order với mã order code duy nhất
•	Sinh ticket code (string format đơn giản)
•	Hiển thị xác nhận order
•	Success page với chi tiết order
Ngoài phạm vi (Out-of-scope):
•	Refund
•	Tích hợp cổng thanh toán thực tế
•	Quản lý tồn kho
•	Email notifications
•	SMS confirmations
________________________________________
File chính (Key Files)
Front-end:
• frontend/src/pages/Checkout.tsx
• frontend/src/services/api.ts
Back-end:
• backend/public/api/bookings/create.php
________________________________________
Input
•	Customer: full_name, email, phone
•	Cart: danh sách item {ticket_type, visit_date, unit_price, quantity}
•	Payment method: "Mock" | "Pay at Gate" (demo)
________________________________________
Xử lý (Processing)
Form Validation:
1.	Validate client + server
2.	Check required fields: full_name, email, phone
3.	Validate email format
4.	Đảm bảo cart không rỗng
Price Recalculation:
•	Recalculate giá tại server để chính xác
•	Áp dụng group discount (≥11 vé giảm 10%)
•	Validate tính đúng đắn của giá
Order Creation:
1.	Tạo booking (status = PAID với mock)
2.	Generate booking_code (vd: ORD-YYYYMMDD-HHMMSS- hoặc BK###)
3.	Lưu thông tin khách hàng
4.	Tính tổng cuối cùng (subtotal/discount/total)
Ticket Generation:
• Sinh ticket_code tại từng bookingdetails (ví dụ: YYMMDD-SEQ[-SUB])
• Không tạo QR image ở bước này
• Liên kết với booking qua booking_id
Payment Processing:
•	Xử lý mock payment
•	Update order status → PAID
•	Clear cart trong localStorage
•	Trả về payload order + items
Success Flow:
• FE hiển thị xác nhận (trong Checkout/success state)
• Hiển thị booking summary + ticket codes
________________________________________
Output
Backend Response:
{  "order_id": 12345,
  "order_code": "ORD-20240115-0001",
  "totals": {
    "subtotal": 100,
    "discount": 10,
    "total": 90  },
  "items": [
    {      "ticket_code": "240115-0001-001",
      "ticket_type": "amusement_park",
      "visit_date": "2024-01-15",
      "quantity": 1,
      "unit_price": 10    }  ],
  "customer": {
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"  }}
Frontend Success Page:
•	Order summary + details
•	Ticket codes display
•	Customer info
•	Payment confirmation
________________________________________
Xử lý lỗi & Thông báo (Error Handling & Messages)
•	“Missing required information” (400) – chỉ rõ field thiếu
•	“Invalid email format” (400)
•	“Empty cart” (422)
•	“Backend fail” (500) – hiển thị toast và giữ nguyên cart
•	“Payment processing failed” (500)
•	“Order creation failed” (500)
Field-specific errors:
•	“Full name is required” (400)
•	“Email is required” (400)
•	“Phone is required” (400)
•	“Invalid email format” (400)
________________________________________
Ghi chú đồng bộ FE ⇄ BE (Synchronization Notes)
•	FE validate trước khi submit
•	Server validate lại để final check
•	Server recalc giá để đảm bảo chính xác
•	Cart chỉ clear khi thanh toán thành công
•	Order code & ticket code sinh tại server
•	Mock payment luôn trả về status=PAID
•	Success page hiển thị đầy đủ thông tin order
•	Xử lý lỗi giữ nguyên cart để retry
________________________________________
5.6.5 Chức năng 5: Order History (Member area)
Mục tiêu (Objective)
Cho phép user đã xác thực (authenticated) xem lịch sử đơn hàng của họ, với filter, phân trang và chi tiết order trong khu vực member riêng.
________________________________________
Phạm vi (Scope)
Trong phạm vi (In-scope):
•	Danh sách order có phân trang
•	Lọc order theo date range và status
•	Xem chi tiết order (bao gồm ticket info)
•	Theo dõi trạng thái order
•	Expandable row view cho item trong order
•	Truy cập yêu cầu authentication
Ngoài phạm vi (Out-of-scope):
•	Chỉnh sửa order sau khi tạo
•	Chức năng hủy order
•	Refund processing
•	Order sharing
•	Tính năng edit/cancel
________________________________________
File chính (Key Files)
Front-end:
• frontend/src/pages/account/Orders.tsx
• frontend/src/components/QRCodeDisplay.tsx
• frontend/src/services/api.ts
Back-end:
• backend/public/api/account/orders.php
• backend/public/api/account/order-details.php
________________________________________
Input
•	Filter: date_from/date_to (tùy chọn), status (tùy chọn)
•	Pagination: page, page_size (nếu cần)
•	Authentication: JWT token (bắt buộc)
________________________________________
Xử lý (Processing)
Authentication Check:
1.	Yêu cầu đăng nhập
2.	Verify JWT token hợp lệ
3.	Lấy user_id từ token
Order Query:
1.	Query order theo user_id
2.	Áp dụng filter date range (date_from/date_to)
3.	Áp dụng filter status
4.	Thực hiện phân trang (page, page_size) nếu cần
Order Data Structure:
• Mỗi order gồm: id, order_date (visit_date), total_amount, status
• Items: ticket_name, quantity, unit_price, line_total, ticket_code
• Bao gồm payments (amount, provider, paid_at, status)
Data Processing:
•	Sort order theo placed_at (mới nhất trước)
•	Tính toán metadata phân trang
•	Format ngày hiển thị
•	Chuẩn bị dữ liệu cho expandable row
________________________________________
Output
Frontend Display:
• Order history table với pagination
• Bộ filter (date range, status)
• Modal chi tiết đơn hàng (on-demand)
• Hiển thị QR code cho từng vé (nếu có ticket_code)
Backend JSON Response (orders list):
```json
{
  "status": "success",
  "orders": [
    {
      "id": 5,
      "order_date": "2025-09-22",
      "total_amount": 24.0,
      "status": "PAID",
      "item_count": 2,
      "ticket_names": "Amusement Park, Water Park"
    }
  ],
  "pagination": { "current_page": 1, "per_page": 5, "total_orders": 33, "total_pages": 7 },
  "filters": { "start_date": "2025-09-01", "end_date": "2025-09-30", "status": "PAID" }
}
```

Backend JSON Response (order details):
```json
{
  "status": "success",
  "order": {
    "id": 5,
    "order_date": "2025-09-22 10:20:00",
    "total_amount": 24.0,
    "status": "PAID",
    "customer": { "full_name": "John Doe", "email": "john@example.com", "phone": "+123" },
    "items": [
      { "id": 101, "ticket_name": "Amusement Park", "quantity": 1, "unit_price": 12.0, "line_total": 12.0, "ticket_code": "250927-1000" }
    ],
    "payments": [ { "amount": 24.0, "provider": "MockPay", "paid_at": "2025-09-22 10:21:00", "status": "SUCCESS" } ]
  }
}
```
Success Payload:
{  "status": "success",
  "orders": [...],
  "pagination": {...},
  "filters": {
    "date_from": "2024-01-01",
    "date_to": "2024-01-31",
    "status": "PAID"  }}
________________________________________
Xử lý lỗi & Thông báo (Error Handling & Messages)
•	“Authentication required” (401) → redirect login
•	“Not logged in → redirect/login” (401)
•	“No data found → empty state” (404)
•	“No orders found” (kết quả rỗng)
•	“Failed to fetch orders” (500)
•	“Invalid date range” (400)
•	“Invalid status filter” (400)
Empty State Messages:
•	“You don’t have any orders yet”
•	“No orders found for the selected period”
•	“Start booking tickets to see your order history”
________________________________________
Ghi chú đồng bộ FE ⇄ BE (Synchronization Notes)
• Tất cả request yêu cầu JWT authentication
• Pagination xử lý server-side; FE điều khiển hiển thị
• Filter update real-time → trigger API call mới
• Chi tiết order load on-demand qua modal
• Read-only; không hỗ trợ chỉnh sửa/huỷ/refund
• Hiển thị QR code bằng `QRCodeDisplay` với value dạng `TICKET:<ticket_code>`
________________________________________
5.6.6 Chức năng 6: Reviews & Moderation
Mục tiêu (Objective)
Cho phép thành viên (member) gửi review cho các attraction, và cho phép admin thực hiện moderation với quy trình approve/reject.
________________________________________
Phạm vi (Scope)
Trong phạm vi (In-scope):
•	Member gửi review cho attraction
•	Admin thực hiện moderation (approve/reject)
•	Public listing review (chỉ review được approve)
•	Hệ thống rating (1–5 stars)
•	Không giới hạn số lượng review/user (workflow approve của admin sẽ kiểm soát chất lượng)
•	Quản lý status (pending, approved, rejected)
Ngoài phạm vi (Out-of-scope):
•	Upload ảnh review (nếu FE/BE không hỗ trợ)
•	Edit review sau khi submit
•	Admin reply review
•	Review analytics
•	Email notify khi thay đổi status
________________________________________
File chính (Key Files)
Front-end:
• frontend/src/pages/admin/reviews.tsx
Back-end:
• backend/public/api/reviews.php (public/member API giản lược)
• backend/public/api/admin/reviews.php (admin listing)
________________________________________
Input
•	Submit: {attraction_id, rating 1..5, title?, content}
•	List (public): {attraction_id, page}
•	Moderation: {review_id, action: approve|reject}
________________________________________
Xử lý (Processing)
Member Submit:
1.	Validate các trường bắt buộc (attraction_id, rating, content)
2.	Check user authentication
3.	Validate rating (1–5 stars)
4.	Không giới hạn số lượng review/user
5.	Lưu review với status = pending
6.	Trả về success message
Public List:
•	Trả về review có status = approved
•	Filter theo attraction_id
•	Áp dụng pagination
•	Sort theo created_at (mới nhất trước)
Admin Moderation:
•	Hiển thị danh sách review với filter theo status
•	Approve hoặc reject review
•	Update review status
•	Ghi nhận hành động moderation
Quality Control:
•	Không giới hạn số lượng review/user
•	Admin approval workflow đảm bảo chất lượng
•	Có thể check review đã tồn tại trước khi submit (chỉ tham khảo)
________________________________________
Output
Submit Success:
{  "status": "success",
  "message": "Review submitted, pending approval.",
  "review_id": 12345}
Public List Response:
{  "status": "success",
  "data": {
    "reviews": [
      {        "review_id": 12345,
        "attraction_id": 1,
        "user_name": "John Doe",
        "rating": 5,
        "title": "Great experience!",
        "content": "Had an amazing time at the amusement park...",
        "created_at": "2024-01-15T10:30:00Z",
        "status": "approved"      }    ],
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total_reviews": 25,
      "total_pages": 3    }  }}
Admin List Response:
{  "status": "success",
  "data": {
    "reviews": [...],
    "pagination": {...},
    "filters": {
      "status": "pending",
      "attraction_id": 1    }  }}
Frontend Display:
•	Khi submit: hiển thị “Review submitted, pending approval.”
•	Admin list: bảng review với filter theo status
•	Public reviews: chỉ review đã approve
•	Rating hiển thị dạng sao (stars)
________________________________________
Xử lý lỗi & Thông báo (Error Handling & Messages)
•	“Authentication required” (401) – nếu chưa login khi submit → yêu cầu login
•	“Invalid rating (must be 1-5)” (400)
•	“Missing required fields” (400)
•	“Attraction not found” (404)
•	“Review not found” (404)
•	“Failed to submit review” (500)
•	“Failed to update review status” (500)
Thông báo lỗi cụ thể:
•	“Please log in to submit a review”
•	“Rating must be between 1 and 5 stars”
•	“Review content is required”
________________________________________
Ghi chú đồng bộ FE ⇄ BE (Synchronization Notes)
•	Review submission yêu cầu authentication
•	Không giới hạn số lượng review/user (admin workflow kiểm soát chất lượng)
•	Public API chỉ trả review đã được approve
•	Admin API trả toàn bộ review với status filter
•	Update status hiển thị ngay trên admin panel
•	Pagination xử lý server-side
•	Status change refresh dữ liệu ngay lập tức
________________________________________
5.6.7 Chức năng 7: Information & Contact Management
Mục tiêu (Objective)
Cung cấp thông tin đầy đủ về công viên, chức năng liên hệ, và hệ thống FAQ thông qua một trang Info tích hợp với tabbed navigation.
________________________________________
Phạm vi (Scope)
Trong phạm vi (In-scope):
•	Hiển thị thông tin công viên với timeline lịch sử
•	Contact form có tích hợp backend
•	FAQ với accordion mở rộng
•	Tabbed navigation (About, Contact, FAQ)
•	Hiển thị thông tin liên hệ với interactive cards
•	Google Maps integration
•	Responsive design kèm animation
Ngoài phạm vi (Out-of-scope):
•	Real-time chat
•	Email notifications từ contact form
•	Advanced search trong FAQ
•	Hỗ trợ đa ngôn ngữ
•	Upload file trong contact form
________________________________________
File chính (Key Files)
Front-end:
• frontend/src/pages/Info.tsx
• frontend/src/components/ScrollAnimation.tsx
Back-end:
• backend/public/api/messages.php
________________________________________
Input
•	Contact Form: name, email, phone, project, subject, message
•	URL Parameters: ?tab=faq để điều hướng trực tiếp đến FAQ
•	User Interactions: tab switching, FAQ accordion toggles
________________________________________
Xử lý (Processing)
Tab Navigation:
•	3 tab chính: About, Contact, FAQ
•	Xử lý URL param để vào trực tiếp FAQ
•	Smooth scrolling + animation
About Section:
•	Giới thiệu công viên + key statistics
•	Timeline lịch sử kèm ảnh và mốc thời gian
•	Hover effects cho statistic cards
•	Timeline từ 1904 đến 2015 với các cột mốc quan trọng
Contact Section:
•	Card hiển thị thông tin liên hệ + icon
•	Contact form với validation
•	Google Maps embed hiển thị vị trí
•	Form submit đến backend API
FAQ Section:
•	Accordion mở rộng/collapse
•	Categories: Amusement Park, Runaway Rapids, Group Outings, Birthday Parties, Parking
•	Nội dung chi tiết về safety và policy
•	Smooth animation khi expand
Contact Form Processing:
1.	Validate form ở client
2.	Gửi POST request đến /api/messages
3.	Hiển thị success/error message
4.	Reset form khi submit thành công
________________________________________
Output
Frontend Display:
•	Hero section với banner công viên + breadcrumb
•	Giao diện tab với hiệu ứng chuyển mượt
•	About section: statistics + timeline
•	Contact section: info cards + contact form + Google Maps
•	FAQ section: accordion với nội dung chi tiết
Contact Form Success Response:
```json
{ "status": "success", "message": "Your message has been sent to admin. Thank you!" }
```
Contact Form Error Response:
```json
{ "status": "error", "message": "Failed to send, please try again later." }
```
________________________________________
Xử lý lỗi & Thông báo (Error Handling & Messages)
•	“Your message has been sent to admin. Thank you!” (success)
•	“Failed to send, please try again later.” (API error)
•	“Network error, please try again later.” (network error)
•	Form validation cho các field bắt buộc
•	Loading state khi submit form
________________________________________
Ghi chú đồng bộ FE ⇄ BE (Synchronization Notes)
•	Contact form kết nối với backend /api/messages
•	Form data gửi JSON POST request
•	FE quản lý success/error state
•	FAQ content là static (không cần backend)
•	About content cũng là static (dữ liệu lịch sử)
•	Google Maps embed trực tiếp trong FE
•	Tab state quản lý local + hỗ trợ URL param
________________________________________
5.6.8 Chức năng 8: Admin – Basic Management (minimum for demo)
Mục tiêu (Objective)
Cung cấp các chức năng quản trị cơ bản để quản lý những entity chính của hệ thống, với CRUD tối thiểu phục vụ demo.
________________________________________
Phạm vi (Scope)
Trong phạm vi (In-scope):
•	Ticket management (view, add, edit, delete)
•	Zone management (view, add, edit, delete)
•	Attraction management (view, add, edit, delete)
•	Gallery management (view, add, edit, delete)
•	Dashboard với số liệu thống kê đơn giản (count metrics)
•	CRUD form và thao tác cơ bản
•	Admin authentication (role=admin)
Ngoài phạm vi (Out-of-scope):
•	Thống kê chi tiết doanh thu, export, multi-role permissions
•	Advanced analytics & charts
•	Bulk operations
•	Data export
•	User management
•	System configuration
•	Báo cáo phức tạp
________________________________________
File chính (Key Files)
Front-end:
• frontend/src/pages/admin/tickets.tsx
• frontend/src/pages/admin/zones.tsx
• frontend/src/pages/admin/attractions.tsx
• frontend/src/pages/admin/gallery.tsx
• frontend/src/pages/admin/dashboard.tsx
Back-end:
• backend/public/api/admin/tickets.php
• backend/public/api/admin/zones.php
• backend/public/api/admin/attractions.php
• backend/public/api/admin/gallery.php
• backend/public/api/admin/dashboard.php
________________________________________
Input
•	CRUD form data tối thiểu cho tickets/zones/attractions/gallery
•	Dashboard: không cần chart phức tạp, chỉ hiển thị tổng số bản ghi
•	Authentication: kiểm tra role=admin
________________________________________
Xử lý (Processing)
Admin Authentication:
1.	Yêu cầu admin auth (role=admin)
2.	Verify JWT token có role admin
3.	Block truy cập với non-admin
CRUD Operations:
•	Validation đơn giản, trả về JSON success/fail
•	Create: thêm record mới với validate cơ bản
•	Read: list toàn bộ record, hỗ trợ pagination
•	Update: chỉnh sửa record đã tồn tại
•	Delete: xóa record với confirm
Dashboard Summary:
•	Hiển thị số liệu tổng hợp: count users, orders, tickets, reviews (approved/pending)
•	Query count đơn giản cho mục đích demo
•	Không có chart hay analytics nâng cao
Data Management:
•	Validation cơ bản
•	Error handling đơn giản
•	JSON response format
•	Pagination cho dataset lớn
________________________________________
Output
CRUD Interface:
•	List: hiển thị dạng bảng
•	Add/Edit form: form cơ bản cho create/edit
•	Delete button: nút xóa kèm confirm
Dashboard Display:
{  "status": "success",
  "data": {
    "total_users": 150,
    "total_orders": 89,
    "total_tickets": 234,
    "approved_reviews": 45,
    "pending_reviews": 12  }}
CRUD Success Response:
{  "status": "success",
  "message": "Record created successfully",
  "data": {
    "id": 123,
    "name": "Amusement Park Ticket",
    "price": 10,
    "created_at": "2024-01-15T10:30:00Z"  }}
List Response:
```json
{
  "status": "success",
  "data": [
    { "id": 1, "name": "Amusement Park", "description": "Main amusement park area", "is_active": true, "created_at": "2024-01-15T10:30:00Z" }
  ],
  "pagination": { "current_page": 1, "per_page": 10, "total_records": 25, "total_pages": 3 }
}
```
________________________________________
Xử lý lỗi & Thông báo (Error Handling & Messages)
•	“Admin access required” (403) – yêu cầu admin auth
•	“Invalid form data” (400) – validate đơn giản
•	“Record not found” (404)
•	“Failed to create record” (500)
•	“Failed to update record” (500)
•	“Failed to delete record” (500)
•	“Are you sure you want to delete this record?” (confirmation)
Thông báo cụ thể:
•	“You must be an admin to access this page”
•	“Please fill in all required fields”
•	“Record deleted successfully”
•	“Failed to load dashboard data”
________________________________________
Ghi chú đồng bộ FE ⇄ BE (Synchronization Notes)
•	Tất cả thao tác yêu cầu admin authentication
•	CRUD đơn giản với validate cơ bản
•	Dashboard chỉ hiển thị count metrics (không có chart)
•	Real-time update sau khi CRUD
•	Validation ở cả client và server
•	JSON response cho tất cả API
•	Pagination xử lý tại server
•	Delete yêu cầu confirm
•	Không có báo cáo nâng cao hoặc phân tích chi tiết

