# Các đường dẫn đã được sửa

## ✅ **Đã hoàn thành:**

### 1. **Sửa cấu hình Backend:**
- **File `backend/config/env.php`:**
  - Xóa dependency vào file `.env` không tồn tại
  - Thêm cấu hình mặc định cho database và JWT
  - Database: `keansburg_park`, User: `root`, Password: `123456`

### 2. **Sửa đường dẫn API:**
- **File `backend/public/api/auth/login.php` và `signup.php`:**
  - Sửa đường dẫn require từ `../../../config/` thành `../../config/`
  - Đảm bảo các file config được load đúng

### 3. **Sửa API calls trong Frontend:**
- **File `frontend/src/services/api.ts`:**
  - Thay đổi từ `/api/auth/login.php` thành `/api/auth/login`
  - Thay đổi từ `/api/auth/signup.php` thành `/api/auth/signup`
  - API calls giờ gọi endpoints thay vì file .php trực tiếp

### 4. **Sửa import paths:**
- **File `frontend/src/components/layout/Navbar.tsx` và `Footer.tsx`:**
  - Comment out import `runaway-rapids.png` không tồn tại
  - Sử dụng `keansburg-logo.png` thay thế

### 5. **Cấu hình Proxy:**
- **File `frontend/vite.config.ts`:**
  - Thêm proxy configuration để forward API calls đến backend
  - Target: `http://localhost:8000`

## 🔧 **Cách chạy dự án:**

### Backend:
```bash
cd backend
composer install
php -S localhost:8000 -t public
```

### Frontend:
```bash
cd frontend
npm install
npm run dev
```

### Database:
```bash
mysql -u root -p keansburg_park < database/sql/keansburg_park.sql
```

## 📋 **API Endpoints hoạt động:**
- `GET /` - API info
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/signup` - Đăng ký
- `GET /api/users` - Danh sách users
- `GET /api/orders` - Danh sách orders  
- `GET /api/tickets` - Danh sách tickets

## ⚠️ **Lưu ý:**
- Không cần file `.env` vì đã có cấu hình mặc định
- Frontend chạy trên `http://localhost:5173`
- Backend chạy trên `http://localhost:8000`
- API calls được proxy tự động từ frontend đến backend


