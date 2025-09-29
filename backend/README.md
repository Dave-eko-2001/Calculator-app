# Scientific Calculator Backend

Node.js/Express backend for the scientific calculator. Provides calculation and history APIs, and uses SQLite for persistent storage.

## Endpoints
- `POST /api/calculate` — Calculate an expression and store in history
- `GET /api/history` — Retrieve calculation history

## Setup
1. Run `npm install`
2. Start server: `npm start`

## Database
SQLite file: `calculator.db` (auto-created)
