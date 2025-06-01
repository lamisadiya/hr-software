import React, { useState } from 'react';
import './Attendance.css';

const Attendance = () => {
  const [schedules, setSchedules] = useState([
    { id: 1, employee: 'John Doe', shift: '9 AM - 5 PM', date: '2025-05-27', status: 'Upcoming' },
  ]);
  const [form, setForm] = useState({ id: null, employee: '', shift: '', date: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.employee) newErrors.employee = 'Employee name is required';
    if (!form.shift) newErrors.shift = 'Shift is required';
    else if (!/^\d{1,2}\s?(AM|PM)\s?-\s?\d{1,2}\s?(AM|PM)$/i.test(form.shift)) {
      newErrors.shift = 'Shift must be in format "9 AM - 5 PM"';
    }
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
    const status = new Date(form.date) < new Date() ? 'Missed' : 'Upcoming';
    if (isEditing) {
      setSchedules(schedules.map(s => s.id === form.id ? { ...form, status } : s));
      setIsEditing(false);
    } else {
      const newSchedule = { ...form, id: Date.now(), status };
      setSchedules([...schedules, newSchedule]);
    }
    setForm({ id: null, employee: '', shift: '', date: '' });
    setErrors({});
  };

  const handleEdit = (schedule) => {
    setForm(schedule);
    setIsEditing(true);
    setErrors({});
  };

  const handleDelete = (id) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  return (
    <div className="attendance-container">
      <h2 className="attendance-title">Time & Attendance Management</h2>

      {/* Schedule Form */}
      <form onSubmit={handleSubmit} className="attendance-form">
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
          <label htmlFor="shift">Shift</label>
          <input
            id="shift"
            type="text"
            placeholder="e.g., 9 AM - 5 PM"
            value={form.shift}
            onChange={(e) => setForm({ ...form, shift: e.target.value })}
            aria-required="true"
            className={errors.shift ? 'input-error' : ''}
          />
          {errors.shift && <span className="error-message">{errors.shift}</span>}
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

        <button type="submit" aria-label={isEditing ? 'Update Shift' : 'Add Shift'}>
          {isEditing ? 'Update Shift' : 'Add Shift'}
        </button>
      </form>

      {/* Schedule Table */}
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Shift</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">No schedules available</td>
            </tr>
          ) : (
            schedules.map(s => (
              <tr key={s.id}>
                <td>{s.employee}</td>
                <td>{s.shift}</td>
                <td>{s.date}</td>
                <td className={s.status === 'Missed' ? 'status-missed' : 'status-upcoming'}>
                  {s.status}
                </td>
                <td>
                  <button
                    className="action-btn edit-btn"
                    onClick={() => handleEdit(s)}
                    aria-label={`Edit schedule for ${s.employee}`}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(s.id)}
                    aria-label={`Delete schedule for ${s.employee}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;