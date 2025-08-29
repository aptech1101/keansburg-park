# Database Notes

## Quy ước đặt tên
- Bảng: snake_case, số nhiều (vd: `users`, `order_items`)
- Khóa chính: `id` BIGINT AUTO_INCREMENT
- Khóa ngoại: `{singular}_id` (vd: `user_id`)

## Engine & Charset
- ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

## Gợi ý thực thể
- users, attractions, tickets, orders, order_items, payments, reviews

## Ghi chú thay đổi chuẩn hóa
- Nếu phi chuẩn (denormalize) để tối ưu truy vấn, nêu rõ lí do tại đây.
