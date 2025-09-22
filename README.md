# Keansburg Park Monorepo

Monorepo with Vite + React frontend and PHP + MySQL backend.

## Structure
- frontend/: Vite app (HashRouter). Netlify _redirects present.
- backend/: PHP API (public/index.php)
- docs/: Project docs placeholders

## Frontend
cd keansburg-park/frontend
npm install
npm run dev

## Backend
cd keansburg-park/backend
php -S 127.0.0.1:8000 -t public

Env vars (optional): DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS

## API Routes
- /api/users
- /api/orders
- /api/tickets

## Pricing source of truth (BE re-calc)

The backend is the source of truth for pricing and discounts at booking creation time.

- Tickets table provides `weekday_price` and `weekend_price` per zone.
- BE should calculate unit price based on visit date (weekday vs weekend) and apply group discount when the total quantity across the cart is ≥10 at a rate of 10%.
- Frontend mirrors these rules only for display; backend must re-calculate and persist `subtotal`, `discount_total`, and `grand_total` in `bookings`/`bookingdetails`.

Alignment notes for BE implementation:
- Weekend surcharge: 20% (weekday $10 → weekend $12 per seed data)
- Group discount: 10% when total quantity ≥ 10
- Affected tables: `tickets` (pricing), `bookings`, `bookingdetails`, `payments` (booking flow and ticket_code issuance)