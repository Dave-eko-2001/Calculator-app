const mongoose = require('mongoose');
const currencyRoutes = require('./routes/currency');
const unitRoutes = require('./routes/unit');
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/scientific_calculator', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API routes
app.use('/api/currency', currencyRoutes);
app.use('/api/unit', unitRoutes);
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Database setup
const dbPath = path.join(__dirname, 'calculator.db');
const db = new sqlite3.Database(dbPath);
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    expression TEXT,
    result TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Calculation logic
function calculate(expression) {
  try {
    // Only allow safe math functions
    const math = {
      sin: Math.sin,
      cos: Math.cos,
      tan: Math.tan,
      log: Math.log,
      sqrt: Math.sqrt,
      abs: Math.abs,
      pow: Math.pow,
      PI: Math.PI,
      E: Math.E
    };
    // eslint-disable-next-line no-new-func
    const fn = new Function('math', `with(math) { return ${expression}; }`);
    return fn(math);
  } catch (e) {
    return 'Error';
  }
}

// API endpoints
app.post('/api/calculate', (req, res) => {
  const { expression } = req.body;
  const result = calculate(expression);
  db.run(
    'INSERT INTO history (expression, result) VALUES (?, ?)',
    [expression, String(result)],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ result });
    }
  );
});


const ConversionHistory = require('./models/ConversionHistory');

// Unified history endpoint
app.get('/api/history', async (req, res) => {
  const { type } = req.query;
  try {
    if (type === 'currency' || type === 'unit') {
      // Get from MongoDB
      const history = await ConversionHistory.find(type ? { type } : {}).sort({ date: -1 }).limit(20);
      res.json(history);
    } else {
      // Calculator history from SQLite
      db.all('SELECT * FROM history ORDER BY timestamp DESC LIMIT 20', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
