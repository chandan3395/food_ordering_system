# Bites

Bites is a production-ready MERN food ordering website with a premium React frontend, secure JWT auth, persistent cart behavior, and a full Express/MongoDB backend.

## What’s included

- Modern responsive home page with hero, featured foods, categories, popular picks, testimonials, CTA, navbar, and footer
- Dynamic menu browsing with search, category filters, sorting, pagination, loading states, and empty states
- Persistent cart with quantity updates, totals, validation, and refresh-safe local storage
- Secure auth with register, login, logout, cookie-based JWT sessions, and protected routes
- Checkout flow that validates input, creates orders on the backend, calculates totals server-side, and stores order history
- Seeded MongoDB data for categories and food items on first boot

## Tech stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Context API
- React Hot Toast
- Framer Motion

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Project structure

```text
dbms/
  client/
    public/
    src/
      components/
      context/
      hooks/
      layouts/
      pages/
      routes/
      services/
      utils/
  server/
    config/
    controllers/
    data/
    middleware/
    models/
    routes/
    utils/
```

## Environment setup

### Server

Copy [`server/.env.example`](/C:/Users/gchan/Desktop/dbms/server/.env.example) to `server/.env` and update the values if needed.

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/bites
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Client

Copy [`client/.env.example`](/C:/Users/gchan/Desktop/dbms/client/.env.example) to `client/.env`.

```env
VITE_API_URL=/api
```

## Install

From the project root:

```bash
npm install
npm install --prefix server
npm install --prefix client
```

Or use the combined helper after root dependencies are installed:

```bash
npm run install:all
```

## Run locally

Make sure MongoDB is running locally on `127.0.0.1:27017`.

Then start the full stack:

```bash
npm run dev
```

This runs:

- Frontend at `http://localhost:5173`
- Backend at `http://localhost:5000`

### Alternative individual commands

```bash
npm run dev --prefix server
npm run dev --prefix client
```

## Production build

```bash
npm run build
```

The frontend production output is written to [`client/dist`](/C:/Users/gchan/Desktop/dbms/client/dist).

## API routes

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### Foods

- `GET /api/foods`
- `GET /api/foods/:id`
- `GET /api/foods/category/:categoryId`
- `GET /api/foods/search?q=`

### Categories

- `GET /api/categories`

### Orders

- `POST /api/orders`
- `GET /api/orders/my-orders`
- `GET /api/orders/:id`

## Notes

- Authentication uses an HTTP-only cookie-based JWT session.
- Cart persistence is handled in the frontend with local storage.
- Order totals are recalculated on the backend and never trusted from the client.
- Seed data is inserted automatically only when the categories and food collections are empty.

## Verified locally

- Frontend production build succeeds with `npm run build --prefix client`
- Backend app module loads successfully
- Backend health endpoint responds at `/api/health`
- Seeded categories and foods are returned correctly
- Register, logout, login, `/api/auth/me`, order creation, search, category filters, and order history all succeeded against the live local MongoDB instance
