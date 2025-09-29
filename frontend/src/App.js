
import React, { useState } from 'react';
import './App.css';
import CurrencyConverter from './components/CurrencyConverter';
import UnitConverter from './components/UnitConverter';

function App() {
  const [view, setView] = useState('calculator');

  return (
    <div className="main-dashboard">
      <nav className="main-nav">
        <button className={view === 'calculator' ? 'active' : ''} onClick={() => setView('calculator')}>Calculator</button>
        <button className={view === 'unit' ? 'active' : ''} onClick={() => setView('unit')}>Unit Converter</button>
        <button className={view === 'currency' ? 'active' : ''} onClick={() => setView('currency')}>Currency Converter</button>
      </nav>
      <div className="main-content">
        {view === 'calculator' && <Calculator />}
        {view === 'unit' && <UnitConverter />}
        {view === 'currency' && <CurrencyConverter />}
      </div>
    </div>
  );
}

function Calculator() {
  const scientificButtons = [
    'sin', 'cos', 'tan', 'log', 'sqrt', 'pow', '(', ')', 'PI', 'E', 'abs'
  ];
  const basicButtons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '+',
  ];
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  const handleClick = (val) => {
    setExpression(expression + val);
  };

  const handleClear = () => {
    setExpression('');
    setResult('');
  };

  const handleDelete = () => {
    setExpression(expression.slice(0, -1));
  };

  const handleCalculate = async () => {
    try {
      // TODO: Update API endpoint if needed
      const res = await fetch('http://localhost:5000/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression })
      });
      const data = await res.json();
      setResult(data.result);
      fetchHistory();
    } catch (e) {
      setResult('Error');
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/history');
      const data = await res.json();
      setHistory(data);
    } catch (e) {
      setHistory([]);
    }
  };

  React.useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="calculator-container">
      <h2>Scientific Calculator</h2>
      <input
        type="text"
        value={expression}
        onChange={e => setExpression(e.target.value)}
        className="calc-input"
        placeholder="Enter expression"
      />
      <div className="button-grid">
        {basicButtons.map(btn => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
        <button className="equals" onClick={handleCalculate}>=</button>
        <button className="clear" onClick={handleClear}>C</button>
        <button className="delete" onClick={handleDelete}>DEL</button>
      </div>
      <div className="scientific-grid">
        {scientificButtons.map(btn => (
          <button key={btn} onClick={() => handleClick(btn + (btn === 'PI' ? '' : '('))}>{btn}</button>
        ))}
      </div>
      <div className="result">Result: {result}</div>
      <div className="history">
        <h3>History</h3>
        <ul>
          {history.map((item, idx) => (
            <li key={item.id || idx}>{item.expression} = {item.result}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
