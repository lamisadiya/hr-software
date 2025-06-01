import React, { useState } from 'react';
import './ProfessionalDevelopment.css';

const ProfessionalDevelopment = () => {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    id: null,
    employee: '',
    program: '',
    date: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.employee) newErrors.employee = 'Employee name is required';
    if (!form.program) newErrors.program = 'Training/Certification is required';
    if (!form.date) newErrors.date = 'Date is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const newRecord = { ...form, id: Date.now() };
    setRecords([...records, newRecord]);
    setForm({ id: null, employee: '', program: '', date: '', notes: '' });
    setErrors({});
  };

  return (
    <div className="professional-development-container">
      <h2 className="professional-development-title">Professional Development</h2>

      <form onSubmit={handleSubmit} className="professional-development-form">
        <div className="form-group">
          <label htmlFor="employee">Employee Name</label>
          <input
            id="employee"
            type="text"
            placeholder="Enter employee name"
            value={form.employee}
            onChange={(e) => setForm({ ...form, employee: e.target.value })}
            aria-required="true"
            className={errors.employee ? 'input-error' : ''}
          />
          {errors.employee && <span className="error-message">{errors.employee}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="program">Training/Certification</label>
          <input
            id="program"
            type="text"
            placeholder="Enter training or certification"
            value={form.program}
            onChange={(e) => setForm({ ...form, program: e.target.value })}
            aria-required="true"
            className={errors.program ? 'input-error' : ''}
          />
          {errors.program && <span className="error-message">{errors.program}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            aria-required="true"
            className={errors.date ? 'input-error' : ''}
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            placeholder="Enter additional notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>

        <button type="submit" aria-label="Add Development Record">
          Add Record
        </button>
      </form>

      <table className="professional-development-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Program</th>
            <th>Date</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-data">No professional development records available</td>
            </tr>
          ) : (
            records.map(r => (
              <tr key={r.id}>
                <td>{r.employee}</td>
                <td>{r.program}</td>
                <td>{r.date}</td>
                <td>{r.notes || '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProfessionalDevelopment;