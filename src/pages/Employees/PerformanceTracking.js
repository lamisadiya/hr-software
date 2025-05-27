import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PerformanceTracking.css'; // Optional styling

const PerformanceTracking = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [kpi, setKpi] = useState('');
  const [rating, setRating] = useState(1);
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/get_employees.php')
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/save_performance.php', {
      employee_id: selectedEmployee,
      kpi,
      rating,
      notes
    })
    .then(res => setMessage('Performance record saved.'))
    .catch(err => {
      setMessage('Failed to save performance record.');
      console.error(err);
    });
  };

  return (
    <div className="performance-container">
      <h2>Performance Tracking</h2>
      <form onSubmit={handleSubmit} className="performance-form">
        <label>Employee:</label>
        <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} required>
          <option value="">Select</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
          ))}
        </select>

        <label>KPI/Goal:</label>
        <input type="text" value={kpi} onChange={(e) => setKpi(e.target.value)} required />

        <label>Rating (1–5):</label>
        <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required />

        <label>Notes:</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />

        <button type="submit">Save Performance</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PerformanceTracking;
