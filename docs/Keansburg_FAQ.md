## 1. Hiểu dự án

**Q:** Dự án Keansburg Park hướng tới đối tượng nào?
**A:** Khách tham quan công viên (Guest/Member) và đội ngũ quản trị (Admin) quản lý nội dung, đơn hàng, phản hồi.

**Q:** Có những vai trò người dùng nào và khác nhau ra sao?
**A:** Guest đặt vé không cần tài khoản; Member có Profile, Order History, Reviews; Admin có CRUD và bảng điều khiển (dashboard).

**Q:** Các chức năng chính của hệ thống là gì?
**A:** Ticketing (calendar, add-to-cart, checkout mock), Cart, Order History (QR code), Reviews & moderation, Admin CRUD (tickets, zones, attractions, restaurants, gallery, orders, feedback).

**Q:** Luồng đặt vé cơ bản diễn ra thế nào?
**A:** Chọn ngày ở Tickets → Thêm vào Cart → Đạt ≥10 vé sẽ có 10% discount → Checkout tạo booking và ticket_code → Member xem Order History và QR.

**Q:** Business rules về giá được áp dụng ra sao?
**A:** Weekday = $10; Weekend = +20% surcharge (=$12); Discount 10% cho đơn có tổng quantity ≥10, áp ở Cart/Checkout.

**Q:** Vì sao hệ thống không có refund, không inventory, không giới hạn ≤30 ngày?
**A:** Phạm vi đã chốt để tập trung vào trải nghiệm đặt vé trực tuyến cốt lõi; các nghiệp vụ này phức tạp và được đưa vào tương lai.

**Q:** Công nghệ chính được sử dụng là gì?
**A:** Frontend: React 18 + TypeScript + Vite; Backend: PHP REST-style; Database: MySQL 8.x.

**Q:** Tại sao chọn SPA React + PHP?
**A:** React giúp UI mượt, state quản lý tốt (cart/auth); PHP thuận tiện triển khai API đơn giản, hosting phổ biến, chi phí thấp.

**Q:** Ưu điểm nổi bật của hệ thống hiện tại?
**A:** Đặt vé nhanh, quy tắc giá rõ ràng, có QR cho từng vé, quản trị nội dung cơ bản, trải nghiệm responsive.

**Q:** Hạn chế hiện tại là gì?
**A:** Chưa có cổng thanh toán thực, không có refund, không quản lý tồn kho, chưa có báo cáo nâng cao.

**Q:** Hệ thống có thể mở rộng gì trong tương lai?
**A:** Tích hợp payment gateway, email/SMS notifications, dashboard báo cáo, vai trò mở rộng (moderator), export CSV/Excel, inventory nếu cần.

## Tổng quan (Overview)

**Q:** Keansburg Park Project là gì?
**A:** Là hệ thống web đặt vé trực tuyến cho công viên Keansburg Park, gồm FE (React), BE (PHP), DB (MySQL).

**Q:** Hệ thống có những vai trò người dùng nào?
**A:** Guest, Member (đã đăng nhập), Admin.

**Q:** Công nghệ chính sử dụng ở frontend là gì?
**A:** React 18 + TypeScript + Vite + React Router + Context API.

**Q:** Backend triển khai theo dạng gì?
**A:** PHP REST-style endpoints dưới `backend/public/api`.

**Q:** Cơ sở dữ liệu sử dụng là gì?
**A:** MySQL 8.x, script khởi tạo tại `database/sql/keansburg_sql_master.sql`.

**Q:** Hệ thống có quản lý tồn kho (inventory) vé không?
**A:** Không. Inventory là out-of-scope theo quyết định phạm vi.

**Q:** Có giới hạn đặt trước trong 30 ngày không?
**A:** Không. Giới hạn ≤30 ngày đã loại bỏ khỏi phạm vi.

**Q:** Có hỗ trợ hoàn tiền (Refund) không?
**A:** Không. Refund nằm ngoài phạm vi.

**Q:** Family package có tồn tại không?
**A:** Không. Family package đã bị bỏ.

**Q:** Mục tiêu chính của hệ thống là gì?
**A:** Cho phép khách đặt vé online nhanh, quản trị nội dung cơ bản, giảm thời gian xếp hàng và nâng cao trải nghiệm.


## Tickets & Pricing

**Q:** Giá vé weekday và weekend như thế nào?
**A:** Weekday = $10, Weekend = +20% surcharge (tức $12).

**Q:** Group discount áp dụng khi nào?
**A:** Khi tổng quantity trong cart ≥10 vé, giảm 10% ở Cart/Checkout.

**Q:** Group discount có hiển thị ở trang Tickets không?
**A:** Chỉ hiển thị rule; việc tính toán áp dụng ở Cart/Checkout.

**Q:** Tính giá cuối tuần được xác định ra sao?
**A:** Dựa vào ngày (Sat/Sun) → cộng surcharge +20% so với base weekday $10.

**Q:** File nào xử lý logic giá ở FE?
**A:** `frontend/src/lib/pricing.ts`.

**Q:** API pricing riêng có không?
**A:** Hệ thống có thể tính ở FE theo rule; tùy cấu hình, có thể bổ sung API, nhưng hiện chủ yếu dựa FE logic.

**Q:** Có loại vé nào quản lý tồn kho không?
**A:** Không. Inventory không được quản lý trong dự án.

**Q:** Có phân loại zone và ảnh hưởng giá không?
**A:** Zone (Amusement/Water) dùng để phân loại, không ảnh hưởng công thức giá cơ bản trong phạm vi này.

**Q:** Giá có thay đổi theo mùa hay event không?
**A:** Không. Seasonal/event pricing nằm ngoài phạm vi hiện tại.

**Q:** Người dùng có thể xem giá theo lịch không?
**A:** Có. Lịch hiển thị giá weekday/weekend để chọn ngày.


## Cart & Checkout

**Q:** Cart lưu ở đâu?
**A:** Lưu ở FE (localStorage) thông qua hook `frontend/src/hooks/useCart.ts`.

**Q:** Các thao tác chính trong cart là gì?
**A:** Add/Update/Delete item, tính tổng tiền, áp dụng group discount nếu đủ điều kiện.

**Q:** Khi nào áp dụng group discount 10%?
**A:** Khi tổng quantity trong cart ≥10 vé, áp dụng tại Cart/Checkout.

**Q:** Checkout lưu dữ liệu ở bảng nào?
**A:** `bookings` (order) và `bookingdetails` (order items); thanh toán mock ghi `payments` khi cần.

**Q:** API tạo order là endpoint nào?
**A:** `POST /api/bookings/create.php`.

**Q:** Sau Checkout có sinh `ticket_code` không?
**A:** Có. `ticket_code` được lưu ở `bookingdetails.ticket_code`.

**Q:** Có tạo mã QR hình ảnh sẵn không?
**A:** Không lưu ảnh; FE render QR runtime từ `ticket_code` bằng `react-qr-code`.

**Q:** Có hỗ trợ hoàn tiền (refund) sau Checkout không?
**A:** Không. Refund là out-of-scope.

**Q:** Có yêu cầu tài khoản khi checkout không?
**A:** Guest có thể checkout; Member có thêm lợi ích lưu lịch sử đơn hàng.

**Q:** Có cổng thanh toán thật không?
**A:** Hiện dùng mock payment; tích hợp cổng thật nằm trong future enhancements.


## Tài khoản & Bảo mật (Account & Security)

**Q:** Cơ chế xác thực sử dụng gì?
**A:** JWT; token gửi qua `Authorization: Bearer <token>`.

**Q:** Lưu token ở đâu?
**A:** FE lưu localStorage/sessionStorage theo tùy chọn nhớ đăng nhập.

**Q:** Các endpoint auth?
**A:** `POST /api/auth/login`, `POST /api/auth/signup`, `POST /api/auth/forgot-password`.

**Q:** Có xác thực 2 bước (2FA) không?
**A:** Không. Ngoài phạm vi.

**Q:** Có xác minh email khi đăng ký không?
**A:** Chưa. Email verification ngoài phạm vi hiện tại.

**Q:** Quản lý hồ sơ người dùng ở đâu?
**A:** Qua `frontend/src/contexts/AuthContext.tsx` (FE) và các API account như `/api/account/updateprofile` (nếu có).

**Q:** Lịch sử đơn hàng chỉ dành cho Member?
**A:** Đúng. Member xem tại `frontend/src/pages/account/Orders.tsx` qua API `/api/account/orders.php`.

**Q:** Dữ liệu nhạy cảm được bảo vệ thế nào?
**A:** Gửi qua HTTPS (khuyến nghị), JWT ký bằng secret server; DB lưu password dạng hash.

**Q:** Có rate limit hay captcha không?
**A:** Chưa. Có thể bổ sung trong tương lai.

**Q:** Có đăng xuất (logout) API không?
**A:** FE xóa token (không cần endpoint riêng); có thể bổ sung tùy chính sách.


## Orders & QR Code

**Q:** Member xem Order History ở đâu?
**A:** `frontend/src/pages/account/Orders.tsx`, dùng API `/api/account/orders.php`.

**Q:** Xem chi tiết đơn hàng (items, payments) như thế nào?
**A:** Gọi API `/api/account/order-details.php?order_id=...` để hiển thị modal chi tiết.

**Q:** QR code hiển thị từ dữ liệu nào?
**A:** Từ `ticket_code` của từng item, FE render QR với `react-qr-code`.

**Q:** Chuỗi QR nên ở định dạng nào?
**A:** Dùng dạng đơn giản `TICKET:<ticket_code>` để FE/BE dễ nhận diện.

**Q:** Có lưu ảnh QR trong DB không?
**A:** Không. FE render QR runtime, không lưu ảnh.

**Q:** Nếu item chưa có `ticket_code` thì sao?
**A:** FE hiển thị N/A; cần nghiệp vụ backend bổ sung mã nếu thiếu.

**Q:** `booking_code` khác gì `ticket_code`?
**A:** `booking_code` cho đơn hàng; `ticket_code` cho từng vé (item) trong đơn.

**Q:** Có thể tải xuống ảnh QR không?
**A:** Có thể thêm nút download (FE fetch ảnh PNG từ dịch vụ QR hoặc render canvas và lưu).

**Q:** Thông tin thanh toán hiển thị ở đâu?
**A:** Trong chi tiết đơn hàng (`payments`: amount, provider, paid_at, status).

**Q:** Đơn hàng có thể chỉnh sửa/hủy không?
**A:** Không. Read-only; refund/hủy ngoài phạm vi.

## 2. SQL & CRUD

**Q:** Cách thêm dữ liệu vào bảng `attractions`?
**A:**
```sql
INSERT INTO attractions (zone_id, name, description, image_url, is_active)
VALUES (1, 'Roller Coaster', 'High speed ride', '/uploads/attraction/rc.jpg', 1);
```

**Q:** Cách thêm dữ liệu vào bảng `restaurants`?
**A:**
```sql
INSERT INTO restaurants (zone_id, name, description, image_url, is_active)
VALUES (2, 'Water Grill', 'Seafood and snacks', '/uploads/restaurant/wg.jpg', 1);
```

**Q:** Truy vấn `UPDATE` để đổi tên một attraction theo `id`?
**A:**
```sql
UPDATE attractions SET name = 'Sky Coaster'
WHERE id = 5;
```

**Q:** Xóa (`DELETE`) một feedback theo `id`?
**A:**
```sql
DELETE FROM feedbacks WHERE id = 42;
```

**Q:** `SELECT` order history theo `user_id` (mới nhất trước)?
**A:**
```sql
SELECT b.id, b.booking_code, b.visit_date, b.grand_total, b.status
FROM bookings b
WHERE b.user_id = :user_id
ORDER BY b.id DESC
LIMIT 50;
```

**Q:** Phân trang dữ liệu với `LIMIT` + `OFFSET` cho bookings?
**A:**
```sql
SELECT b.id, b.booking_code, b.visit_date, b.grand_total, b.status
FROM bookings b
WHERE b.user_id = :user_id
ORDER BY b.id DESC
LIMIT :limit OFFSET :offset;
```

**Q:** Quan hệ giữa orders (`bookings`) và order_items (`bookingdetails`) là gì?
**A:** `bookings.id` (1) ↔ (n) `bookingdetails.booking_id`. Mỗi booking có nhiều dòng chi tiết.

**Q:** Cách thêm cột mới `avatar_url` vào bảng `users`?
**A:**
```sql
ALTER TABLE users ADD COLUMN avatar_url VARCHAR(255) NULL AFTER phone;
```

**Q:** Ràng buộc khóa ngoại giữa `bookings.user_id` và `users.id` viết thế nào?
**A:** (đã có trong script, ví dụ minh họa)
```sql
ALTER TABLE bookings
ADD CONSTRAINT fk_bookings_user
FOREIGN KEY (user_id) REFERENCES users(id)
ON UPDATE CASCADE ON DELETE SET NULL;
```

**Q:** Tạo index để tối ưu `SELECT` theo `visit_date` và `user_id`?
**A:**
```sql
CREATE INDEX idx_bookings_user_date ON bookings (user_id, visit_date);
```

**Q:** Demo CRUD từ trang admin kết nối đến SQL hoạt động ra sao?
**A:** Trang admin gửi request đến các endpoint như `/api/admin/tickets.php`, `/api/admin/zones.php`... Backend PHP nhận JSON, validate, thực thi SQL tương ứng (INSERT/UPDATE/DELETE/SELECT) và trả JSON `status: success|error` về frontend.

## 3. Bảo mật & Auth

**Q:** Hash password trong PHP như thế nào?
**A:** Sử dụng `password_hash($plain, PASSWORD_BCRYPT)` để tạo hash an toàn với salt tự sinh, không tự viết salt thủ công.

**Q:** Dùng `password_hash()` và `password_verify()` ra sao?
**A:** Khi tạo tài khoản: `password_hash($password, PASSWORD_BCRYPT)` lưu vào `users.password_hash`. Khi đăng nhập: `password_verify($password, $row['password_hash'])` để kiểm tra.

**Q:** Khác biệt giữa session và cookies là gì?
**A:** Session lưu server-side (id lưu ở cookie), an toàn hơn cho dữ liệu nhạy cảm. Cookie lưu client-side; JWT cũng lưu client (localStorage/sessionStorage) và gửi trong header.

**Q:** Token (JWT) đang dùng ở đâu trong hệ thống?
**A:** BE sinh JWT khi login (`/api/auth/login`), FE lưu token trong localStorage/sessionStorage và gửi `Authorization: Bearer <token>` cho các API yêu cầu xác thực (ví dụ `/api/account/orders.php`).

**Q:** Vì sao không lưu mật khẩu dạng plaintext?
**A:** Plaintext dễ bị lộ và khai thác. Hash (một chiều) giúp giảm rủi ro: kể cả lộ DB, kẻ tấn công khó khôi phục mật khẩu gốc.

**Q:** FE kiểm tra user đã đăng nhập như thế nào?
**A:** Qua `AuthContext` kiểm tra token có tồn tại/valid, điều hướng `ProtectedRoute`, hiển thị menu user trên `Navbar` khi có token.

**Q:** `middleware/auth.php` có vai trò gì?
**A:** Trích JWT từ header, xác thực chữ ký/expiry, lấy `user_id`/`role` và chặn truy cập nếu không hợp lệ.

**Q:** Bảo vệ API admin như thế nào?
**A:** Yêu cầu JWT hợp lệ và `role=admin` ở các endpoint `api/admin/*.php`; nếu không phải admin → trả 403/401.

**Q:** Tránh SQL Injection bằng cách nào?
**A:** Luôn dùng prepared statements (PDO `prepare` + `execute`), không nối chuỗi trực tiếp với input; validate/whitelist tham số; tránh dynamic SQL không kiểm soát.

**Q:** Các bước khi user quên mật khẩu (forgot-password) là gì?
**A:** FE gọi `POST /api/auth/forgot-password` với email; BE tạo token/reset link (tối thiểu trả message). Hiện dự án chưa gửi email thực; có thể bổ sung PHPMailer/SMTP trong tương lai.

## 4. UI & Frontend

**Q:** Làm sao đổi layout từ 2 card sang 3 card bằng CSS Grid/Tailwind?
**A:** CSS Grid: đặt `grid-template-columns: repeat(3, minmax(0, 1fr));` ở breakpoint mong muốn. Nếu dùng Tailwind: thêm lớp `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4` vào container.

**Q:** Sử dụng `useCart.ts` như thế nào?
**A:** Import hook từ `frontend/src/hooks/useCart.ts`, gọi trong component để lấy `{ cartItems, addItem, updateItem, removeItem, clearCart, totals }`, sau đó gắn vào UI (Cart/Checkout) theo nhu cầu.

**Q:** `useScrollAnimation.ts` dùng để làm gì?
**A:** Tạo hiệu ứng xuất hiện khi cuộn (on-scroll). Hook quan sát viewport và thêm/xóa lớp CSS để animate các section (ví dụ ở trang Info/Gallery).

**Q:** `Ticket.tsx` lấy dữ liệu từ đâu?
**A:** Từ logic giá FE trong `frontend/src/lib/pricing.ts` (weekday/weekend). UI hiển thị lịch và giá theo ngày; rule giảm giá nhóm chỉ hiển thị ở Tickets, tính toán tại Cart/Checkout.

**Q:** `AppRouter.tsx` quản lý routes thế nào?
**A:** Dùng React Router: định nghĩa tuyến Public (Home, Tickets, Gallery...), Commerce (Cart, Checkout), Account (Login, Signup, Orders), Admin (`/admin/*`). Có thể bọc các tuyến cần xác thực bằng `ProtectedRoute`.

**Q:** Sửa UI Checkout để thêm 1 bước review order?
**A:** Tạo step mới (Review) nằm giữa Cart → Checkout Form → Success. Dùng state `currentStep` và tách component `OrderReview` hiển thị danh sách items, totals, rule discount 10% nếu ≥10 vé.

**Q:** Cách hiển thị gallery dạng lightbox?
**A:** Dùng thư viện lightbox (ví dụ `yet-another-react-lightbox`) hoặc modal Bootstrap: khi click thumbnail ở `Gallery.tsx`, mở overlay trình chiếu ảnh, hỗ trợ next/prev và zoom.

**Q:** Kiểm thử responsive design ra sao?
**A:** Sử dụng DevTools (Device Toolbar) với các độ rộng phổ biến (≥320px). Kiểm tra lưới card, navbar, bảng Orders, modal chi tiết. Đảm bảo tap targets đủ lớn và text không tràn.

**Q:** Thay đổi màu button trong Tailwind thế nào?
**A:** Áp lớp màu như `bg-blue-600 hover:bg-blue-700 text-white`. Nếu dự án dùng CSS/Bootstrap, tuỳ chỉnh bằng lớp utility riêng hoặc override biến màu trong stylesheet.

**Q:** Lợi ích dùng Context (`AuthContext`, `FeedbackContext`)?
**A:** Quản lý state toàn cục (auth, feedback) thống nhất, tránh prop-drilling, cập nhật UI đồng bộ (navbar, route bảo vệ, badge/pending feedback) và dễ kiểm thử.

## 5. Demo & Order Flow

**Q:** Các bước trong luồng checkout là gì?
**A:** 1) Tickets chọn ngày → 2) Add to Cart → 3) Cart kiểm tra số lượng/giá → 4) Checkout nhập thông tin khách → 5) Xác nhận (mock payment) → 6) Tạo booking + ticket_code → 7) Xem Orders.

**Q:** Ví dụ tính giá khi mua 9 vé vs 11 vé thế nào?
**A:** 9 vé weekday: 9×$10 = $90, không discount. 11 vé weekday: subtotal $110, group discount 10% = $11 → total $99.

**Q:** Cách hình thành `order_code`/`booking_code` và QR?
**A:** `booking_code` sinh khi tạo booking (ví dụ `ORD-YYYYMMDD-HHMMSS-`), `ticket_code` cho từng dòng chi tiết (ví dụ `YYMMDD-SEQ`). QR hiển thị ở FE từ chuỗi `TICKET:<ticket_code>`.

**Q:** Test nhanh logic giảm giá trong demo như thế nào?
**A:** Thêm vé vào Cart đến khi tổng quantity ≥10, kiểm tra phần tổng tiền hiển thị discount 10%. Có thể test ở cả weekday/weekend để thấy chênh lệch giá base.

**Q:** Quy trình hiển thị order history cho user?
**A:** User đăng nhập → vào `/profile/orders` → FE gọi `GET /api/account/orders.php` (list) và `GET /api/account/order-details.php?order_id=...` (chi tiết) → render bảng + modal và QR theo từng vé.

**Q:** Admin duyệt feedback thực hiện thế nào?
**A:** Vào trang Admin Reviews → lọc status `pending` → chọn review → bấm approve/reject → backend cập nhật trạng thái; public chỉ hiển thị `approved`.

**Q:** Khi thêm 1 attraction mới trong demo admin làm gì?
**A:** Vào `/admin/attractions` → Add → nhập `zone_id`, `name`, `description`, `image_url`, `is_active` → Submit → backend INSERT bản ghi và list cập nhật.

**Q:** Làm sao demo phân trang feedback?
**A:** Vào Admin Reviews, sử dụng controls phân trang (page/limit) → FE gửi tham số phân trang đến API, bảng cập nhật dữ liệu theo trang.

**Q:** Cách cho thấy bảo mật (login trước khi vào `/profile`)?
**A:** Truy cập `/profile/orders` khi chưa đăng nhập sẽ bị redirect đến `/login` (ProtectedRoute + kiểm tra token trong `AuthContext`).

**Q:** Mô tả nhanh vòng đời một booking từ Tickets → Cart → Checkout → Orders?
**A:** Chọn ngày/vé ở Tickets → Add to Cart (lưu FE) → Checkout (mock payment) tạo bản ghi `bookings` và `bookingdetails`, sinh `booking_code` và `ticket_code` → Member xem lại trong Orders, có QR theo từng item.


## 6. Công nghệ & Triển khai

**Q:** File .tsx khác gì so với .js?
**A:** .tsx là TypeScript + JSX, cho phép dùng type-checking mạnh hơn và viết component React có hỗ trợ type an toàn.

**Q:** PDO trong PHP được dùng để làm gì?
**A:** PDO (PHP Data Objects) là interface truy vấn DB an toàn, hỗ trợ prepared statements để chống SQL Injection.

**Q:** File .env lưu gì trong dự án?
**A:** Lưu biến môi trường (DB_HOST, DB_USER, DB_PASS, VITE_API_URL) để tách cấu hình khỏi code. Không commit .env lên git.

**Q:** FE gọi API backend thế nào?
**A:** FE (React .tsx) dùng fetch/axios trong `frontend/src/services/api.ts` để gọi endpoint PHP (vd: `/api/bookings/create.php`).

**Q:** BE trả dữ liệu cho FE theo định dạng gì?
**A:** JSON (`Content-Type: application/json`), chứa `status`, `message`, `data`.

**Q:** Tại sao cần .htaccess trong dự án PHP?
**A:** Để cấu hình rewrite URL, chặn truy cập trực tiếp file nhạy cảm, enable CORS hoặc redirect về `index.php`.

**Q:** JWT hoạt động như thế nào trong login?
**A:** Khi login thành công, BE tạo JWT (header+payload+signature), gửi cho FE. FE lưu token (localStorage/Context), gắn vào `Authorization` header khi gọi API.

**Q:** Composer trong PHP dùng để làm gì?
**A:** Composer quản lý package/dependency. VD: `firebase/php-jwt` để sinh và verify JWT.

**Q:** Làm sao test nhanh kết nối PDO với MySQL?
**A:** Tạo file `test.php` với try–catch PDO:
```php
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    $pdo = new PDO("mysql:host=localhost;dbname=test;charset=utf8mb4", "user", "pass", [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);
    echo "Connected";
} catch (Throwable $e) {
    echo "Error: " . $e->getMessage();
}
```

Nếu kết nối OK, in ra “Connected”.

**Q:** VITE_API_URL trong .env của frontend có vai trò gì?
**A:** Chỉ định URL gốc của backend API, để FE fetch đúng endpoint.

**Q:** `AppRouter.tsx` hoạt động thế nào?
**A:** Định nghĩa route → component map. VD: `path="/tickets"` → `Ticket.tsx`.

**Q:** Vì sao cần `AuthContext.tsx`?
**A:** Lưu trạng thái login và token global, tránh phải truyền props qua nhiều component.

**Q:** Khi BE cần kiểm tra token từ FE thì xử lý ở đâu?
**A:** `backend/middleware/auth.php` sẽ decode JWT, xác thực `user_id`, rồi mới cho chạy endpoint.

**Q:** Dữ liệu DB config được tách ra file nào?
**A:** `backend/config/db.php` và `backend/config/env.php`.

**Q:** Nếu muốn sửa UI FE, ví dụ đổi màu nút “Book Now”?
**A:** Sửa class Tailwind trong `frontend/src/pages/Ticket.tsx` (vd: `bg-blue-500` → `bg-green-500`).

**Q:** Làm sao để triển khai backend PHP + MySQL trên XAMPP?
**A:** Copy folder `backend` vào `htdocs`, import DB, cấu hình `.env` và `db.php`, chạy trên `http://localhost` (Apache) và MySQL mặc định (chỉnh port nếu cần).

**Q:** Khi demo, cần reset DB về trạng thái ban đầu thế nào?
**A:** Import lại file `database/sql/keansburg_sql_master.sql` bằng phpMyAdmin hoặc CLI.

**Q:** API GET `/api/account/orders.php` yêu cầu gì?
**A:** Token JWT hợp lệ để lấy order theo `user_id`; không trả về khi chưa login.

**Q:** Làm sao debug lỗi 500 trong PHP API?
**A:** Kiểm tra `error_log`, bật `display_errors` trong `php.ini`, hoặc tạm thời `echo json_encode(error_get_last())` để lần vết.

**Q:** Lợi ích của Vite trong frontend so với CRA (Create React App)?
**A:** Build nhanh hơn, hot reload tốt hơn, config `.env` dễ dàng.


