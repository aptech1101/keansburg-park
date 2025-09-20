# 🎢 Keansburg Park Backend

PHP backend cho dự án **Keansburg Park Ticket Booking**.  
Backend được viết bằng PHP thuần, sử dụng MySQL để lưu dữ liệu và Composer để quản lý autoload + thư viện.

---

## 🚀 Yêu cầu hệ thống

- PHP >= 8.0
- MySQL/MariaDB
- [Composer](https://getcomposer.org/)

---

## 📦 Cài đặt

1. Clone project hoặc pull từ GitHub:
   ```bash
   git clone <repo_url>
   cd D:\DOWNLOAD\keansburg-park\backend
   composer install
   php -S 127.0.0.1:8000 -t public
   Server sẽ chạy ở: http://localhost:8000
   Các API có thể gọi như: http://localhost:8000/api/...
   ```

Khi code frontend, mỗi request cần gửi kèm Authorization: Bearer <token> để kết hợp với middleware ở backend


sau khi user login, phải lưu token của jwt vào local storage bằng câu lệnh:
localStorage.setItem('token', respone.data.token)