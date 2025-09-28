# Hướng dẫn Setup Dự án Keansburg Park

## Cấu trúc dự án
- `frontend/` - React + TypeScript + Vite
- `backend/` - PHP + PDO + JWT
- `database/` - SQL schema và ERD

## Yêu cầu hệ thống
- PHP 8.0+
- MySQL 8.0+
- Node.js 16+
- Composer

## Cài đặt Backend

1. Vào thư mục backend:
```bash
cd backend
```

2. Cài đặt dependencies:
```bash
composer install
```

3. Cấu hình database trong `backend/config/env.php`:
```php
$_ENV['DB_HOST'] = 'localhost';
$_ENV['DB_PORT'] = '3306';
$_ENV['DB_NAME'] = 'keansburg_park';
$_ENV['DB_USER'] = 'root';
$_ENV['DB_PASS'] = '123456';
```

4. Import database schema:
```bash
mysql -u root -p keansburg_park < database/sql/keansburg_park.sql
```

5. Chạy backend server:
```bash
php -S localhost:8000 -t public
```

## Cài đặt Frontend

1. Vào thư mục frontend:
```bash
cd frontend
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy development server:
```bash
npm run dev
```

## API Endpoints

Backend sẽ chạy trên `http://localhost:8000` với các endpoints:

- `GET /` - API info
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/signup` - Đăng ký
- `GET /api/users` - Danh sách users
- `GET /api/orders` - Danh sách orders
- `GET /api/tickets` - Danh sách tickets

Frontend sẽ chạy trên `http://localhost:5173` và proxy API requests đến backend.

## Cấu hình đã sửa

1. ✅ Xóa API cũ trong `api/` folder
2. ✅ Cấu hình proxy trong Vite cho API calls
3. ✅ Thêm auth routes vào backend router
4. ✅ Thống nhất database configuration
5. ✅ Sử dụng JWT authentication
6. ✅ Cấu hình CORS headers


