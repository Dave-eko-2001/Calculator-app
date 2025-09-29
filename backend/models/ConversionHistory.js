const mongoose = require('mongoose');

const ConversionHistorySchema = new mongoose.Schema({
  type: String, // 'currency' or 'unit'
  input: Object,
  result: Object,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ConversionHistory', ConversionHistorySchema);
