
const ConversionHistory = require('../models/ConversionHistory');

const conversions = {
  length: {
    meter: 1,
    kilometer: 1000,
    mile: 1609.34,
    yard: 0.9144,
    foot: 0.3048,
    inch: 0.0254,
    centimeter: 0.01,
  },
  mass: {
    kilogram: 1,
    gram: 0.001,
    pound: 0.453592,
    ounce: 0.0283495,
  },
  temperature: {
    celsius: {
      to: {
        fahrenheit: c => c * 9/5 + 32,
        kelvin: c => c + 273.15,
      },
    },
    fahrenheit: {
      to: {
        celsius: f => (f - 32) * 5/9,
        kelvin: f => (f - 32) * 5/9 + 273.15,
      },
    },
    kelvin: {
      to: {
        celsius: k => k - 273.15,
        fahrenheit: k => (k - 273.15) * 9/5 + 32,
      },
    },
  },
};

exports.convertUnit = async (req, res) => {
  const { type, amount, from, to } = req.body;
  let result = 0;
  try {
    if (type === 'temperature') {
      const fn = conversions.temperature[from]?.to[to];
      if (!fn) throw new Error('Invalid temperature conversion');
      result = fn(Number(amount));
    } else {
      const base = Number(amount) * conversions[type][from];
      result = base / conversions[type][to];
    }
    // Save to MongoDB
    await ConversionHistory.create({
      type: 'unit',
      input: { type, amount, from, to },
      result: { result },
    });
    res.json({ result });
  } catch (err) {
    res.status(400).json({ error: 'Unit conversion failed' });
  }
};