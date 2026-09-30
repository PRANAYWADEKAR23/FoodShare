# FoodShare — Backend Enabled Version

This project keeps the original FoodShare HTML/CSS design and adds an Express + SQLite backend.

## Requirements
- Node.js 18 or newer
- npm

## Start
1. Open this folder in a terminal.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Change `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in `.env`.
5. Run `npm start`.
6. Open `http://localhost:3000`.

## API
- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/registrations/donors`
- `POST /api/registrations/ngos`
- `GET /api/registrations/donors` (admin token)
- `GET /api/registrations/ngos` (admin token)
- `PATCH /api/registrations/donors/:id/status` (admin token)
- `PATCH /api/registrations/ngos/:id/status` (admin token)
- `GET /api/food/listings`

The SQLite database is automatically created at `data/foodshare.db`.

## Next phase
The backend is structured so we can add food listings, pickup requests, user dashboards, email notifications, and a proper admin dashboard without changing the core API layout.
