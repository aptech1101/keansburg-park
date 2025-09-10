# Auth Smoke Test Checklist

This document outlines acceptance criteria and a quick checklist to validate the auth flow (backend + frontend).

## Acceptance Criteria

- Sign up
  - New email → 201 Created
  - Duplicate email → 409 Conflict
- Login
  - Correct credentials → 200 OK and sets session cookie
  - Wrong credentials → 401 Unauthorized
- Me
  - GET `/auth/me.php` returns 200 when logged in
  - GET `/auth/me.php` returns 401 when not logged in
- Frontend flow
  - Navigate `#/signup` → create account → redirected to `#/login` → login → redirected to `#/`
- Basic security
  - No access token is stored in `localStorage` or `sessionStorage`
  - Session cookie is HttpOnly (set by server)
  - Session is regenerated on successful login

## Backend cURL Samples

- Sign up (new account):
```bash
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

- Login (save session cookie):
```bash
curl -i -X POST \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email":"alice@example.com",
    "password":"secret123"
  }' \
  http://localhost:8000/api/auth/login.php
```

- Me (use saved cookie):
```bash
curl -i \
  -b cookies.txt \
  http://localhost:8000/api/auth/me.php
```

## Manual Frontend Checklist

- Open `http://localhost:5173/#/signup`
  - Fill form with valid data → submit → see success notice → redirected to `#/login`
- On `#/login`
  - Enter the same credentials → submit → redirected to `#/`
- With devtools open
  - Verify network responses and that `Set-Cookie` is present on login
  - Verify no auth tokens are written to `localStorage` / `sessionStorage`
  - Verify subsequent calls to `/auth/me.php` return 200 while logged in, 401 after logout
