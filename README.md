# KeansburgPark Monorepo

Monorepo with Vite + React frontend and PHP + MySQL backend.

## Structure
- frontend/: Vite app (HashRouter). Netlify _redirects present.
- backend/: PHP API (public/index.php)
- docs/: Project docs placeholders

## Frontend
cd KeansburgPark/frontend
npm install
npm run dev

## Backend
cd KeansburgPark/backend
php -S 127.0.0.1:8000 -t public

Env vars (optional): DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS

## API Routes
- /api/users
- /api/orders
- /api/tickets

## Chạy thử Auth

MySQL
- Import `database/sql/00_schema.sql` để tạo DB `keansburg` và bảng `users`.

Backend (PHP)
```
php -S localhost:8000 -t backend/public
```
API base: `http://localhost:8000/api/`

Frontend (Vite)
- Tạo file `frontend/.env` với:
```
VITE_API_URL=http://localhost:8000/api
```
- Cài và chạy dev server:
```
cd frontend
npm i
npm run dev
```
- Mở trình duyệt: `http://localhost:5173/#/signup`

cURL test nhanh
- Signup
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
- Login (lưu cookie):
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
- Me (dùng cookie):
```
curl -i \
  -b cookies.txt \
  http://localhost:8000/api/auth/me.php
```