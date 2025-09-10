# Docs

Place exported documents here.

- Project-Document.docx
- ERD.png
- TaskSheet.docx

Export guidance:
- Author in Google Docs/Word and export to .docx
- Create ERD in draw.io and export to .png

## Chạy thử Auth

1) MySQL
- Import schema: chạy file `database/sql/00_schema.sql` vào MySQL (tạo DB `keansburg` + bảng `users`).

2) Backend (PHP)
- Chạy server cục bộ từ thư mục `backend`:
```
php -S localhost:8000 -t backend/public
```
Khi chạy, API sẽ ở: `http://localhost:8000/api/`

3) Frontend (Vite)
- Tạo file cấu hình API:
```
frontend/.env
VITE_API_URL=http://localhost:8000/api
```
- Cài đặt và chạy dev server từ thư mục `frontend`:
```
npm i
npm run dev
```
- Mở trình duyệt: `http://localhost:5173/#/signup`

4) cURL test nhanh
- Signup (tạo tài khoản mới):
```
curl -i -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "full_name":"Alice Example",
    "dob":"1995-08-20",
    "gender":"female",
    "email":"alice@example.com",
    "phone":"0900000000",
    "password":"secret123"
  }' \
  http://localhost:8000/api/auth/signup.php
```
- Login (lưu cookie để giữ session):
```
curl -i -X POST \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email":"alice@example.com",
    "password":"secret123"
  }' \
  http://localhost:8000/api/auth/login.php
```
- Me (đọc thông tin người dùng hiện tại bằng cookie đã lưu):
```
curl -i \
  -b cookies.txt \
  http://localhost:8000/api/auth/me.php
```

Ghi chú
- Nếu thay đổi cổng hoặc domain, cập nhật `frontend/.env` với `VITE_API_URL` tương ứng.
- Các endpoint dùng PHP session, nên phải bật `credentials: include` ở frontend (đã cấu hình trong `frontend/src/api/client.ts`).