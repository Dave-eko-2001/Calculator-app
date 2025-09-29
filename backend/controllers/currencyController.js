
const axios = require('axios');
const ConversionHistory = require('../models/ConversionHistory');

exports.convertCurrency = async (req, res) => {
  const { amount, from, to } = req.body;
  try {
    // Use exchangerate.host (free, no API key required)
    const url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
    const response = await axios.get(url);
    const result = response.data.result;

    // Save to MongoDB
    await ConversionHistory.create({
      type: 'currency',
      input: { amount, from, to },
      result: { result },
    });

    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'Currency conversion failed' });
  }
};