# Design Guidelines

## Màu sắc (gợi ý)
- Primary Blue (#3CBEEE) – màu chủ đạo, dùng cho button, highlight, background section.
- Dark (#021016) – dùng cho text tiêu đề đậm, footer, header topbar.
- White (#FFFFFF) – nền chính, tạo cảm giác sạch sẽ, thoáng.
- Gray (#666666) – nền phụ, border, placeholder input.
- Red (#dc3545) – nhấn mạnh các action quan trọng (ví dụ “Buy Ticket”).

## Typography
- Heading:
    +Font: Montserrat (bold/semibold)
    + Cỡ chữ:
        + H1: 48px
        + H2: 32px
        + H3: 24px
    + Màu: Chủ yếu Dark (#021016).
- Body text:
    + Font: Open Sans (regular, dễ đọc).
    + Size: 16px – 18px.
    + Màu: #ffffff hoặc #666666.
- Button & Link:
    + Font bold, chữ in hoa hoặc capitalize.
    + Giữ độ tương phản mạnh (white text trên nền xanh hoặc đỏ).

## Layout & Component
- Header:
    + Thanh top bar chứa logo, menu, login/cart.
    + CTA “Buy Ticket” nổi bật (đỏ).
- Hero section:
    + Background hình công viên nước.
    + Form booking (input + button) đặt ở góc phải, bo góc tròn, nền trắng mờ.
- About section:
    + Chia 2 cột: text + hình ảnh.
    + Có highlight box (100+ years, 150K visitors, 50+ attractions).
- Attractions section:
    + Grid/slider hiển thị card.
    + Hover effect: tối mờ + hiện tên attraction.
- Restaurant & Dining:
    + 2 cột: list text menu + hình ảnh “Taste the Fun”.
- Gallery:
    + Grid ảnh (3x2).
    + Giữ khoảng cách đều, bo góc nhẹ.
- Team Section:
    + Card đơn giản (tên + vai trò).
    + Nền xanh (#3CBEEE).
- Feedback & Reviews:
    + Form feedback (input + star rating).
    + Section review slider với quote.
- Footer:
    + Chia 3 cột: Quick Links, Support, Opening Hours.
    + Nền dark (#003366), chữ trắng.
## Export Figma
- Tất cả component (header, button, card, form, footer) nên được tạo Component Figma để tái sử dụng.
- Style Guide trong Figma:
    + Color Styles: Primary, Secondary, Accent, Neutral.
    + Text Styles: H1, H2, H3, Body, Button.
    + Grid Layout: 12 cột (desktop), 4 cột (mobile).
- Spacing chuẩn 8px system (4/8/16/24/32px).
- Responsive breakpoint:
    + Desktop ≥ 1200px
    + Tablet 768px – 1199px
    + Mobile ≤ 767px