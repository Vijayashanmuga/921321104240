import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:9876/numbers/e';

const AverageCalculator = () => {
  const [numberId, setNumberId] = useState('');
  const [response, setResponse] = useState(null);

  const handleChange = (event) => {
    setNumberId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.get(API_BASE_URL + numberId);
      setResponse(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse(null);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h1 style={{ color: 'blue' }}>Average Calculator</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>
          Select Number Type:
          <select
            value={numberId}
            onChange={handleChange}
            style={{ marginLeft: '10px' }}
          >
            <option value="p">Prime</option>
            <option value="f">Fibonacci</option>
            <option value="e">Even</option>
            <option value="r">Random</option>
          </select>
        </label>
        <button type="submit" style={{ marginLeft: '10px' }}>Calculate</button>
      </form>
      {response && (
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
          <h2>Previous State:</h2>
          <pre>{JSON.stringify(response.windowPrevState)}</pre>
          <h2>Current State:</h2>
          <pre>{JSON.stringify(response.windowCurrState)}</pre>
          <h2>Numbers:</h2>
          <pre>{JSON.stringify(response.numbers)}</pre>
          <h2>Average:</h2>
          <p>{response.avg}</p>
        </div>
      )}
    </div>
  );
};

export default AverageCalculator;
