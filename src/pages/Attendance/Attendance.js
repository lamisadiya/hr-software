import React, { useState } from 'react';

const Attendance = () => {
  const [schedules, setSchedules] = useState([
    { id: 1, employee: 'John Doe', shift: '9 AM - 5 PM', date: '2025-05-27', status: 'Upcoming' },
  ]);
  const [form, setForm] = useState({ id: null, employee: '', shift: '', date: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const status = new Date(form.date) < new Date() ? 'Missed' : 'Upcoming';
    if (isEditing) {
      setSchedules(schedules.map(s => s.id === form.id ? { ...form, status } : s));
      setIsEditing(false);
    } else {
      const newSchedule = { ...form, id: Date.now(), status };
      setSchedules([...schedules, newSchedule]);
    }
    setForm({ id: null, employee: '', shift: '', date: '' });
  };

  const handleEdit = (schedule) => {
    setForm(schedule);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  return (
    <div>
      <h2>Time & Attendance Management</h2>

      {/* Schedule Form */}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Employee Name" value={form.employee}
          onChange={(e) => setForm({ ...form, employee: e.target.value })} required />
        <input type="text" placeholder="Shift (e.g. 9 AM - 5 PM)" value={form.shift}
          onChange={(e) => setForm({ ...form, shift: e.target.value })} required />
        <input type="date" value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })} required />
        <button type="submit">{isEditing ? 'Update' : 'Add'} Shift</button>
      </form>

      {/* Schedule Table */}
      <table>
        <thead>
          <tr>
            <th>Employee</th><th>Shift</th><th>Date</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map(s => (
            <tr key={s.id}>
              <td>{s.employee}</td>
              <td>{s.shift}</td>
              <td>{s.date}</td>
              <td style={{ color: s.status === 'Missed' ? 'red' : 'green' }}>
                {s.status}
              </td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
