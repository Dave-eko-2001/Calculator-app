const express = require('express');
const router = express.Router();
const { convertUnit } = require('../controllers/unitController');

router.post('/convert', convertUnit);

module.exports = router;
