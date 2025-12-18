# Backend (ZeroWaste)

This folder contains the Express backend for ZeroWaste, using Mongoose to connect to MongoDB.

Quick start

1. Install dependencies

```bash
cd backend
npm install
```

2. Configure environment

Copy `.env.example` to `.env` and set the following variables:

- `MONGODB_URI` - MongoDB connection string (local or Atlas)
- `JWT_SECRET` - JWT signing secret

3. Start the server

```bash
npm run dev   # uses nodemon
# or
npm start
```

4. Seed the database (optional)

```bash
npm run seed
```

Notes
- The server exposes endpoints under `/api/auth` and `/api/food`.
- See `backend/models` for Mongoose schemas.
