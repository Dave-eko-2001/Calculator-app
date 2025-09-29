
import React, { useState, useEffect } from 'react';

const unitTypes = {
  length: ['meter', 'kilometer', 'mile', 'yard', 'foot', 'inch', 'centimeter'],
  mass: ['kilogram', 'gram', 'pound', 'ounce'],
  temperature: ['celsius', 'fahrenheit', 'kelvin'],
};

function UnitConverter() {
  const [type, setType] = useState('length');
  const [from, setFrom] = useState('meter');
  const [to, setTo] = useState('kilometer');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFrom(unitTypes[type][0]);
    setTo(unitTypes[type][1]);
  }, [type]);

  const handleConvert = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/unit/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, amount, from, to })
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
      const res = await fetch('http://localhost:5000/api/history?type=unit');
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
    <div className="unit-converter">
      <h2>Unit Converter</h2>
      <div className="unit-form">
        <select value={type} onChange={e => setType(e.target.value)}>
          {Object.keys(unitTypes).map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
        </select>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <select value={from} onChange={e => setFrom(e.target.value)}>
          {unitTypes[type].map(u => <option key={u} value={u}>{u}</option>)}
        </select>
        <span style={{margin: '0 8px'}}>to</span>
        <select value={to} onChange={e => setTo(e.target.value)}>
          {unitTypes[type].map(u => <option key={u} value={u}>{u}</option>)}
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

export default UnitConverter;
