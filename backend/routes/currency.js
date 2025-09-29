const express = require('express');
const router = express.Router();
const { convertCurrency } = require('../controllers/currencyController');

router.post('/convert', convertCurrency);

module.exports = router;
