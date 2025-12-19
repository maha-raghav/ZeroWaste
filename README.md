# ZeroWaste

Overview
--------
ZeroWaste is an open-source food donation and rescue platform that connects surplus-food donors (restaurants, bakeries, retailers and individuals) with recipients (NGOs, shelters and community groups). The project provides a modern React frontend and a Node.js + Express backend with MongoDB persistence to support real-time donation listings, requests, and basic admin workflows.

Why this project
-----------------
Food waste is a major global problem. ZeroWaste reduces waste by making it easy for donors to list surplus food and for receivers to discover and claim available donations nearby. The platform focuses on practical features for discovery, matching and safe transfer of surplus food.

Features
--------
- Donor-facing listing creation (food type, quantity, pickup details, images)
- Receiver search and request flow (filter by type, distance)
- Simple admin endpoints for managing posts and pickup requests
- JWT-based authentication with refresh token flow
- Seed data and integration tests for core auth flows

Tech stack
----------
- Frontend: React (Create React App), Material UI, Leaflet (maps), axios
- Backend: Node.js, Express, Mongoose (MongoDB)
- Auth: JSON Web Tokens (access + refresh), bcrypt for password hashing
- Testing & CI: Jest, Supertest, GitHub Actions

Repository layout
-----------------
Top-level layout (relevant):

- `frontend/` — The current React application (new UI). This is the primary UI for the project and contains all React sources, components, hooks and pages.
- `backend/` — Express API, Mongoose models, controllers, middleware, and tests. The server exposes `/api` routes used by the frontend.
- `.github/` — CI workflows and other GitHub automation.
- `README.md`, `LICENSE`, `.gitignore` — repository metadata and project docs.

Notes about legacy UI
---------------------
Older static prototype files (standalone HTML/CSS/JS) that used to live at the repository root have been removed from the root and are no longer part of the main project tree. The active frontend is the React app in `frontend/`. If you need the old prototype for reference, check the repository history or ask for a copy — it is intentionally not part of the main branch to avoid confusion.

Getting started (developer)
---------------------------
Prerequisites: Node.js (16+), npm (or yarn), MongoDB (local or Atlas)

Backend

1. Open a terminal and change into the backend folder:

```powershell
cd backend
```

2. Copy the example environment, edit values and install dependencies:

```powershell
copy .env.example .env
# Edit .env: set MONGODB_URI and JWT_SECRET (and optionally JWT_REFRESH_SECRET)
npm install
```

3. Seed the database (optional) and run the dev server:

```powershell
npm run seed
npm run dev
```

The backend server listens on the port defined in `.env` (default in the codebase).

Frontend

1. In a new terminal, change into the frontend folder and install:

```powershell
cd frontend
npm install
npm start
```

2. The React app runs on http://localhost:3000 by default and communicates with the backend API at `/api`.

Notes on security
-----------------
- For production deployments, store refresh tokens in secure httpOnly cookies and configure CORS/credentials on the server.
- Use strong, randomly generated `JWT_SECRET` and `JWT_REFRESH_SECRET` values and keep them in CI/CD or platform secrets.

Contributing & evaluation
-------------------------
This repository is structured to be review-friendly for recruiters and open-source contributors. Key points for reviewers:

- The `frontend/` directory contains a full React application with clear components, hooks and pages.
- The `backend/` directory contains Express controllers, middleware and Mongoose models with a centralized DB connection and a seed script to bootstrap sample data.
- CI checks include backend integration tests and frontend tests (see `.github/workflows`).

If you'd like a guided tour for reviewers, I can add a short developer checklist, runbook, and a CI badge in the README.

License
-------
This project is licensed under the MIT License. See `LICENSE` for details.

Contact
-------
For questions or contributions, open an issue or submit a pull request. If you prefer direct contact, include a short message in the issue describing your intent.
