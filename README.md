# Task Tracker

A full-stack **MERN** task management app — create, organize, filter, and track tasks with JWT authentication so each user has their own private list.

> Built for the COLL-EDGE CONNECT Full Stack Developer assignment.

## ✨ Features

**Core**
- 🔐 JWT authentication (register / login) — per-user private tasks
- ✅ Full task CRUD (create, read, update, delete)
- ⚡ Dynamic updates — no page reloads (optimistic UI)
- 📝 Client- and server-side form validation
- 🌐 REST API + MongoDB integration
- 📱 Fully responsive (mobile → desktop)

**Bonus**
- 🔎 Live debounced search
- 🎚️ Filter by status & priority
- ↕️ Sort by date / title
- 🔔 Toast notifications on every action
- 🚩 Priority badges + overdue due-date highlighting
- ♻️ Reusable component library + environment variables

## 🧱 Tech Stack

| Layer    | Tech                                                            |
| -------- | -------------------------------------------------------------- |
| Frontend | React 18 (Vite), React Router, Tailwind CSS, Framer Motion, Axios, react-hot-toast, lucide-react |
| Backend  | Node.js, Express, Mongoose, JWT, bcryptjs, express-validator   |
| Database | MongoDB (Atlas)                                                |
| Deploy   | Vercel (client) · Render (server) · MongoDB Atlas (db)         |

## 📁 Structure

```
TaskTracker/
├── client/   # React + Vite frontend
└── server/   # Express REST API
```

## 🚀 Local Setup

### Prerequisites
- Node.js 18+
- A MongoDB connection string (Atlas), **or** use the built-in in-memory DB for quick local dev.

### 1. Backend

```bash
cd server
npm install
cp .env.example .env     # then fill in MONGO_URI and JWT_SECRET
npm run dev              # uses MONGO_URI from .env
# — or, with no MongoDB installed, run a throwaway in-memory DB:
npm run dev:mem
```

Backend runs on `http://localhost:5000`.

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env     # VITE_API_URL=http://localhost:5000/api
npm run dev
```

Frontend runs on `http://localhost:5173`.

## 🔑 Environment Variables

**server/.env**
| Var            | Description                                  |
| -------------- | -------------------------------------------- |
| `MONGO_URI`    | MongoDB Atlas connection string              |
| `JWT_SECRET`   | Secret used to sign JWTs                      |
| `JWT_EXPIRES_IN` | Token lifetime (e.g. `7d`)                 |
| `PORT`         | Server port (default 5000)                   |
| `CLIENT_URL`   | Allowed CORS origin(s), comma-separated      |

**client/.env**
| Var            | Description                                  |
| -------------- | -------------------------------------------- |
| `VITE_API_URL` | Base URL of the backend API                  |

## 📡 API Reference

All `/api/tasks` routes require an `Authorization: Bearer <token>` header.

| Method | Endpoint              | Description                              |
| ------ | --------------------- | ---------------------------------------- |
| POST   | `/api/auth/register`  | Register, returns user + token           |
| POST   | `/api/auth/login`     | Login, returns user + token              |
| GET    | `/api/auth/me`        | Current user (protected)                 |
| GET    | `/api/tasks`          | List tasks — `?status=&priority=&search=&sort=` |
| POST   | `/api/tasks`          | Create task                              |
| GET    | `/api/tasks/:id`      | Get one task                             |
| PUT    | `/api/tasks/:id`      | Update task                              |
| DELETE | `/api/tasks/:id`      | Delete task                             |

## ☁️ Deployment

**Database — MongoDB Atlas**
1. Create a free cluster, a DB user, and allow network access (`0.0.0.0/0`).
2. Copy the connection string for `MONGO_URI`.

**Backend — Render**
1. New → Web Service → connect this repo, root directory `server`.
2. Build: `npm install` · Start: `npm start`.
3. Env vars: `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN=7d`, `CLIENT_URL` (your Vercel URL).
4. Note the public API URL (e.g. `https://task-tracker-api.onrender.com`).

**Frontend — Vercel**
1. New Project → import this repo, root directory `client`.
2. Env var: `VITE_API_URL=https://<your-render-url>/api`.
3. Deploy, then add the resulting Vercel URL to the backend's `CLIENT_URL`.

## 📄 License

MIT
