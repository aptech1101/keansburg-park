# 📌 Keansburg Park Backend API Documentation

## 1. **Auth**

### 🔹 `POST /api/auth/signin.php`

**Mô tả**: Đăng nhập, trả về JWT token.\
**Input (JSON)**:

``` json
{
  "username": "admin",
  "password": "123456"
}
```

**Output (JSON)**:

``` json
{
  "status": "success",
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin",
    "full_name": "Admin User",
    "email": "admin@email.com"
  }
}
```

👉 Các API khác phải gửi kèm **header**:

    Authorization: Bearer <token>

------------------------------------------------------------------------

## 2. **Admin Dashboard**

### 🔹 `GET /api/admin/dashboard.php`

**Mô tả**: Lấy số liệu tổng quan.\
**Yêu cầu**: role = `admin`.

**Output**:

``` json
{
  "status": "success",
  "data": {
    "total_users": 100,
    "total_bookings": 250,
    "total_revenue": 15400.50,
    "total_reviews": 35
  }
}
```

------------------------------------------------------------------------

## 3. **Orders**

### 🔹 `GET /api/admin/orders.php`

**Mô tả**: Lấy danh sách đơn hàng.

**Output**:

``` json
{
  "status": "success",
  "data": [
    {
      "booking_id": 1,
      "booking_code": "ORD123",
      "full_name": "John Doe",
      "subtotal": 200,
      "status": "paid",
      "created_at": "2025-09-13 12:00:00"
    }
  ]
}
```

------------------------------------------------------------------------

### 🔹 `GET /api/admin/orders.php?id=1`

**Mô tả**: Lấy chi tiết đơn hàng.

**Output**:

``` json
{
  "status": "success",
  "data": {
    "booking_id": 1,
    "booking_code": "ORD123",
    "full_name": "John Doe",
    "email": "john@email.com",
    "phone": "123456789",
    "subtotal": 200,
    "status": "paid",
    "created_at": "2025-09-13 12:00:00",
    "items": [
      {
        "booking_detail_id": 10,
        "ticket_id": 2,
        "ticket_code": "TKT01",
        "quantity": 2,
        "unit_price": 100,
        "line_total": 200,
        "description": "Adult Ticket"
      }
    ]
  }
}
```

------------------------------------------------------------------------

### 🔹 `PUT /api/admin/orders.php`

**Mô tả**: Cập nhật trạng thái đơn.\
**Input (JSON)**:

``` json
{
  "id": 1,
  "status": "cancelled"
}
```

**Output**:

``` json
{
  "status": "success",
  "message": "Order updated"
}
```

------------------------------------------------------------------------

## 4. **Tickets**

### 🔹 `GET /api/admin/tickets.php`

**Mô tả**: Lấy danh sách vé.

**Output**:

``` json
{
  "status": "success",
  "data": [
    {
      "ticket_id": 1,
      "zone_id": 2,
      "weekday_price": 20.0,
      "weekend_price": 30.0,
      "description": "Adult ticket"
    }
  ]
}
```

------------------------------------------------------------------------

### 🔹 `POST /api/admin/tickets.php`

**Mô tả**: Tạo mới ticket.\
**Input (JSON)**:

``` json
{
  "zone_id": 2,
  "weekday_price": 20.0,
  "weekend_price": 30.0,
  "description": "Adult ticket"
}
```

**Output**:

``` json
{
  "status": "success",
  "message": "Ticket created"
}
```

------------------------------------------------------------------------

### 🔹 `PUT /api/admin/tickets.php`

**Mô tả**: Cập nhật ticket.\
**Input (JSON)**:

``` json
{
  "ticket_id": 1,
  "zone_id": 2,
  "weekday_price": 25.0,
  "weekend_price": 35.0,
  "description": "Updated Adult Ticket"
}
```

**Output**:

``` json
{
  "status": "success",
  "message": "Ticket updated"
}
```

------------------------------------------------------------------------

### 🔹 `DELETE /api/admin/tickets.php`

**Mô tả**: Xoá ticket.\
**Input (x-www-form-urlencoded / raw)**:

    id=1

**Output**:

``` json
{
  "status": "success",
  "message": "Ticket deleted"
}
```

------------------------------------------------------------------------

## 5. **Reviews**

### 🔹 `GET /api/admin/reviews.php`

**Mô tả**: Lấy danh sách review.

**Output**:

``` json
{
  "status": "success",
  "data": [
    {
      "review_id": 1,
      "user_id": 2,
      "username": "jane",
      "rating": 5,
      "comment": "Great experience!",
      "status": "pending",
      "created_at": "2025-09-13 10:30:00"
    }
  ]
}
```

------------------------------------------------------------------------

### 🔹 `PUT /api/admin/reviews.php`

**Mô tả**: Duyệt / từ chối review.\
**Input (JSON)**:

``` json
{
  "review_id": 1,
  "status": "approved"
}
```

**Output**:

``` json
{
  "status": "success",
  "message": "Review updated"
}
```

------------------------------------------------------------------------

# 📌 **Lưu ý chung**

-   Tất cả API (trừ `signin`) đều cần Header:

```{=html}
<!-- -->
```
    Authorization: Bearer <JWT>

-   Format trả về chuẩn:\

``` json
{
  "status": "success" | "error",
  "message": "...",
  "data": {...} | [...]
}
```
🖼 Gallery API

Get all galleries

GET /api/admin/gallery.php

Output

{
  "status": "success",
  "data": [
    { "image_id": 1, "title": "Banner", "description": "Main banner", "image_url": "banner.jpg" }
  ]
}


Get by ID

GET /api/admin/gallery.php?id=1

Create

POST /api/admin/gallery.php

Input

{
  "title": "Banner",
  "description": "Main banner",
  "image_url": "banner.jpg"
}


Update

PUT /api/admin/gallery.php

Input

{
  "image_id": 1,
  "title": "Updated Banner",
  "description": "Updated",
  "image_url": "banner2.jpg"
}


Delete

DELETE /api/admin/gallery.php

Input

{ "id": 1 }
**Mô tả**: Quản lý hình ảnh gallery.\


🍴 Restaurants API

Get all

GET /api/admin/restaurants.php

Get by ID

GET /api/admin/restaurants.php?id=1

Create

POST /api/admin/restaurants.php

Input

{
  "zone_id": 2,
  "name": "Pizza Corner",
  "description": "Italian food",
  "image_url": "pizza.jpg"
}


Update

PUT /api/admin/restaurants.php

Input

{
  "restaurant_id": 1,
  "zone_id": 2,
  "name": "Updated Pizza",
  "description": "Italian updated",
  "image_url": "pizza2.jpg"
}


Delete

DELETE /api/admin/restaurants.php

Input

{ "id": 1 }
**Mô tả**: Quản lý nhà hàng trong công viên.



🎡 Attractions API

Get all

GET /api/admin/attractions.php

Get by ID

GET /api/admin/attractions.php?id=1

Create

POST /api/admin/attractions.php

Input

{
  "zone_id": 1,
  "name": "Roller Coaster",
  "description": "Fast ride",
  "image_url": "coaster.jpg"
}


Update

PUT /api/admin/attractions.php

Input

{
  "attraction_id": 1,
  "zone_id": 1,
  "name": "Updated Coaster",
  "description": "Faster",
  "image_url": "coaster2.jpg"
}


Delete

DELETE /api/admin/attractions.php

Input

{ "id": 1 }



🏞 Zones API

Get all

GET /api/admin/zones.php

Get by ID

GET /api/admin/zones.php?id=1

Create

POST /api/admin/zones.php

Input

{
  "zone_name": "Adventure Zone",
  "description": "Thrill rides",
  "zone_type": "adventure"
}


Update

PUT /api/admin/zones.php

Input

{
  "zone_id": 1,
  "zone_name": "Updated Zone",
  "description": "Updated desc",
  "zone_type": "family"
}


Delete

DELETE /api/admin/zones.php

Input

{ "id": 1 }

💳 Payments API

Get all

GET /api/admin/payments.php

Get by ID

GET /api/admin/payments.php?id=1