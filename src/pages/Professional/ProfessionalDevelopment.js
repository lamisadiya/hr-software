import React, { useState } from 'react';

const ProfessionalDevelopment = () => {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    id: null,
    employee: '',
    program: '',
    date: '',
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = { ...form, id: Date.now() };
    setRecords([...records, newRecord]);
    setForm({ id: null, employee: '', program: '', date: '', notes: '' });
  };

  return (
    <div>
      <h2>Professional Development</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Employee Name" value={form.employee}
          onChange={(e) => setForm({ ...form, employee: e.target.value })} required />
        <input type="text" placeholder="Training/Certification" value={form.program}
          onChange={(e) => setForm({ ...form, program: e.target.value })} required />
        <input type="date" value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })} required />
        <textarea placeholder="Notes" value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}></textarea>
        <button type="submit">Add Record</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Employee</th><th>Program</th><th>Date</th><th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {records.map(r => (
            <tr key={r.id}>
              <td>{r.employee}</td>
              <td>{r.program}</td>
              <td>{r.date}</td>
              <td>{r.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfessionalDevelopment;
