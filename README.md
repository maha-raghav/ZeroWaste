# ZeroWaste
<<<<<<< HEAD
<<<<<<< HEAD
A web project to reduce food waste through donation and geo-intelligence.
# ZeroWaste

ZeroWaste is a food donation/rescue platform connecting donors (restaurants, bakeries, individuals) with recipients (NGOs, shelters, communities). This repository contains a Node/Express backend and a React frontend (Material UI).

This README gives a quick overview and the commands to get the project running locally.

Quick links
- Backend: `backend/`
- Frontend: `frontend/`
# ZeroWaste

ZeroWaste is a food donation/rescue platform connecting donors (restaurants, bakeries, and individuals) with recipients (NGOs, shelters, and community groups). It helps reduce food waste by matching surplus donations with nearby receivers using geo-intelligence.

This repository contains a Node/Express backend and a React frontend (Create React App + Material UI).

Quick links
- Backend: `backend/`
- Frontend: `frontend/`

Prerequisites
- Node.js (16+ recommended)
- npm (or yarn)
- MongoDB (local or Atlas)

Getting started

1) Clone

```bash
git clone <your-repo-url> zerowaste
cd zerowaste
```

2) Backend - install, env and run

Copy the example env file and provide your MongoDB connection string and a JWT secret:

```bash
cd backend
cp .env.example .env
# edit .env and set MONGODB_URI and JWT_SECRET
npm install
npm run dev   # or npm start
```

Seed the database with example data (optional):

```bash
npm run seed
```

3) Frontend - install and run

Open a new terminal and run:

```bash
cd frontend
npm install
npm start
```

The frontend will open at http://localhost:3000 by default.

Notes & next steps
- Use a secure JWT secret in production and never commit `.env` files.
- Consider running the backend behind a reverse proxy and enabling HTTPS in production.
- For production refresh-token storage, prefer httpOnly cookies instead of localStorage.

Contributing
- Please open issues or PRs. Consider adding a `CONTRIBUTING.md` if you intend to accept external contributions.

License
- This project is licensed under the MIT License - see the `LICENSE` file.
