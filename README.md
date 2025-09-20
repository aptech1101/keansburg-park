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

