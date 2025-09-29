# Scientific Calculator Web App

A full-featured scientific calculator web application with:
- Standard and scientific calculations
- Live currency conversion (using exchangerate.host)
- Unit conversion (length, mass, temperature)
- Persistent history for all operations
- Modern, responsive React UI
- Backend with Node.js, Express, MongoDB (for conversions), and SQLite (for calculator)

## Features

### 1. Scientific Calculator
- Supports basic arithmetic and scientific functions (sin, cos, tan, log, sqrt, pow, abs, PI, E, etc.)
- Calculation history is stored in SQLite and displayed in the UI

### 2. Currency Converter
- Live conversion between major currencies (USD, EUR, GBP, NGN, JPY, CAD, AUD, INR)
- Uses exchangerate.host API (no API key required)
- Conversion history is stored in MongoDB

### 3. Unit Converter
- Convert between units of length, mass, and temperature
- Supported units: meter, kilometer, mile, yard, foot, inch, centimeter, kilogram, gram, pound, ounce, celsius, fahrenheit, kelvin
- Conversion history is stored in MongoDB

## Tech Stack
- **Frontend:** React, CSS, Webpack
- **Backend:** Node.js, Express
- **Database:**
  - MongoDB (for currency/unit conversions)
  - SQLite (for calculator history)

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB (see `backend/README_DB_SETUP.md` for setup)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd ScientificCalculator
   ```
2. **Install backend dependencies:**
   ```sh
   cd backend
   npm install
   ```
3. **Install frontend dependencies:**
   ```sh
   cd ../frontend
   npm install
   ```
4. **Start MongoDB** (see backend/README_DB_SETUP.md)

### Running the App

1. **Start the backend:**
   ```sh
   cd backend
   node server.js
   ```
2. **Start the frontend:**
   ```sh
   cd frontend
   npm start
   ```
3. Open your browser to [http://localhost:3000](http://localhost:3000)

## Folder Structure

```
backend/
  controllers/
  models/
  routes/
  server.js
  .env
frontend/
  src/
    components/
    services/
    App.js
    App.css
    index.js
    index.html
```

## API Endpoints
- `POST /api/calculate` — Calculate an expression (calculator)
- `POST /api/currency/convert` — Convert currency
- `POST /api/unit/convert` — Convert units
- `GET /api/history` — Get calculator history (SQLite)
- `GET /api/history?type=currency` — Get currency conversion history (MongoDB)
- `GET /api/history?type=unit` — Get unit conversion history (MongoDB)

## Database Setup
See `backend/README_DB_SETUP.md` for MongoDB setup instructions.

## License
MIT
