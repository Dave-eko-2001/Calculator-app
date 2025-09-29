
import React, { useState, useEffect } from 'react';

const currencies = ['USD', 'EUR', 'GBP', 'NGN', 'JPY', 'CAD', 'AUD', 'INR'];

function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/currency/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, from, to })
      });
      const data = await res.json();
      setResult(data.result);
      fetchHistory();
    } catch (e) {
      setResult('Error');
    }
    setLoading(false);
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/history?type=currency');
      const data = await res.json();
      setHistory(data);
    } catch (e) {
      setHistory([]);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      <div className="currency-form">
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <select value={from} onChange={e => setFrom(e.target.value)}>
          {currencies.map(cur => <option key={cur} value={cur}>{cur}</option>)}
        </select>
        <span style={{margin: '0 8px'}}>to</span>
        <select value={to} onChange={e => setTo(e.target.value)}>
          {currencies.map(cur => <option key={cur} value={cur}>{cur}</option>)}
        </select>
        <button className="equals" onClick={handleConvert} disabled={loading}>
          {loading ? 'Converting...' : 'Convert'}
        </button>
      </div>
      <div className="result">Result: {result}</div>
      <div className="history">
        <h3>Conversion History</h3>
        <ul>
          {history.map((item, idx) => (
            <li key={item._id || idx}>
              {item.input?.amount} {item.input?.from} → {item.input?.to} = {item.result?.result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CurrencyConverter;
