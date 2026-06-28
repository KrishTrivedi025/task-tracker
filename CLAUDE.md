# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Task Tracker** is a full-stack MERN task-management web app with JWT auth — each user has a private task list with CRUD, filtering, search, and sorting. (Replaces the earlier Peblo Flutter project.)

## Architecture

Monorepo with two independent apps:

- **`client/`** — React 18 + Vite SPA. Tailwind CSS, React Router, Framer Motion, Axios, react-hot-toast, lucide-react.
- **`server/`** — Express REST API. Mongoose + MongoDB, JWT auth (bcryptjs), express-validator.

**Request flow:** React pages → `client/src/api/*` (axios instance in `api/axios.js` injects the JWT from localStorage and auto-logs-out on 401) → Express routes (`server/routes`) → `protect` middleware (`server/middleware/auth.js`) → controllers → Mongoose models. Auth state lives in `client/src/context/AuthContext.jsx`; route access is gated by `client/src/components/RouteGuards.jsx`.

**Key conventions:**
- All task routes are user-scoped — controllers always filter by `req.user._id`, so users can never see each other's tasks.
- Shared task metadata (status/priority labels, colors, sort options, due-date formatting) lives in `client/src/lib/taskMeta.js` — the single source of truth for both forms and badges. Status values: `todo | in-progress | done`. Priority: `low | medium | high`.
- Reusable UI primitives are in `client/src/components/ui/` (Button, Input, Select, Modal, Badge, Spinner, Logo).
- Filtering/search/sort are **server-side** via query params on `GET /api/tasks`; the dashboard refetches (silently) after mutations so the view stays consistent with active filters.

## Development Commands

**Backend** (`cd server`):
- `npm run dev` — nodemon, connects to `MONGO_URI` from `.env`
- `npm run dev:mem` — nodemon with a throwaway in-memory MongoDB (no DB install needed; uses `mongodb-memory-server`)
- `npm start` — production

**Frontend** (`cd client`):
- `npm run dev` — Vite dev server (port 5173)
- `npm run build` — production build
- `npm run lint` — ESLint

## Environment Variables

- **server/.env**: `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `PORT`, `CLIENT_URL` (comma-separated CORS origins)
- **client/.env**: `VITE_API_URL` (backend API base, e.g. `http://localhost:5000/api`)

## Deployment

Client → Vercel (`client/vercel.json` has SPA rewrites). Server → Render (`render.yaml` blueprint). DB → MongoDB Atlas. After deploying, set the backend's `CLIENT_URL` to the Vercel domain. See README.md for full steps.

## Design Approach
- Use the `ui-ux-master-designer` skill for UI work. (CLAUDE.md previously referenced design-taste-frontend / high-end-visual-design / minimalist-ui / emil-design-eng / review-animations / impeccable — those aren't installed; `ui-ux-master-designer` is the available equivalent.)
- Visual system: warm-neutral canvas, near-black ink, indigo (`brand`) accent; Sora (display) + Plus Jakarta Sans (body) fonts; Framer Motion for modal spring, card hover-lift, list stagger.
