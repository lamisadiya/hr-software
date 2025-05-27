import React, { useState } from 'react';

const AddEmployeeForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    position: '',
    email: '',
    performanceRating: '',
    performanceNote: '',
    leaveDays: 14,
    leaveStatus: 'None',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.position || !formData.email) return;
    onAdd({ ...formData, id: Date.now() });
    setFormData({
      id: '',
      name: '',
      position: '',
      email: '',
      performanceRating: '',
      performanceNote: '',
      leaveDays: 14,
      leaveStatus: 'None',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })} />
      <input type="text" placeholder="Position" value={formData.position}
        onChange={e => setFormData({ ...formData, position: e.target.value })} />
      <input type="email" placeholder="Email" value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })} />
      
      <input type="text" placeholder="Performance Rating (e.g. 4.5)"
        value={formData.performanceRating}
        onChange={e => setFormData({ ...formData, performanceRating: e.target.value })} />

      <input type="text" placeholder="Performance Note"
        value={formData.performanceNote}
        onChange={e => setFormData({ ...formData, performanceNote: e.target.value })} />

      <input type="number" placeholder="Leave Days" value={formData.leaveDays}
        onChange={e => setFormData({ ...formData, leaveDays: e.target.value })} />
      <select value={formData.leaveStatus}
        onChange={e => setFormData({ ...formData, leaveStatus: e.target.value })}>
        <option value="None">None</option>
        <option value="Approved">Approved</option>
        <option value="Pending">Pending</option>
      </select>

      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployeeForm;
