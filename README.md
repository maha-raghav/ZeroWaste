# ZeroWaste

[![CI](https://github.com/maha-raghav/ZeroWaste/actions/workflows/ci.yml/badge.svg)](https://github.com/maha-raghav/ZeroWaste/actions/workflows/ci.yml)

ZeroWaste is a practical food donation and rescue platform that connects donors (restaurants, bakeries, retailers and individuals) with recipients (NGOs, shelters and community groups). The project uses a modern React frontend and a Node.js + Express backend with MongoDB.

Core highlights
---------------
- Donor listing and receiver request flows
- Receiver discovery with location-aware filtering
- JWT authentication with refresh token support
- Seed script and backend integration tests

Tech stack
----------
- Frontend: React (Create React App), Material UI, axios
- Backend: Node.js, Express, Mongoose (MongoDB)
- Tests/CI: Jest, Supertest, GitHub Actions

Repository structure (top-level)
------------------------------
- `frontend/` — Active React application (components, hooks, pages)
- `backend/` — Express API, Mongoose models, controllers, middleware, tests
- `.github/` — CI workflows
- `README.md`, `LICENSE`, `.gitignore` — repo metadata

Quick start (developer)
-----------------------
Prerequisites: Node.js 16+, npm, MongoDB (local or Atlas)

Backend (API)

```powershell
cd backend
copy .env.example .env
# Edit .env: set MONGODB_URI and JWT_SECRET (and optionally JWT_REFRESH_SECRET)
npm install
npm run seed   # optional
npm run dev
```

Frontend (UI)

```powershell
cd frontend
npm install
npm start
```

Notes
-----
- The current UI is the React app under `frontend/`. Legacy static prototype files that previously lived at the repo root have been removed to keep the project focused and recruiter-friendly.
- For production, store refresh tokens in secure httpOnly cookies and keep secrets in CI/CD platform secrets.

Contributing
------------
Open an issue or PR. For quick reviewer guidance I can add a short CONTRIBUTING checklist and a CI badge placement if you want.

License
-------
MIT — see `LICENSE`.
