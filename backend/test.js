// Simple backend test for calculation API
const axios = require('axios');

async function testCalculate() {
  try {
    const res = await axios.post('http://localhost:5000/api/calculate', { expression: 'sin(1)' });
    console.log('Result:', res.data.result);
  } catch (e) {
    console.error('Error:', e.message);
  }
}

testCalculate();
