import React, { useState } from 'react';
import './AddEmployeeForm.css';

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
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.position) newErrors.position = 'Position is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (formData.performanceRating && (formData.performanceRating < 0 || formData.performanceRating > 5)) {
      newErrors.performanceRating = 'Rating must be between 0 and 5';
    }
    if (formData.leaveDays < 0) newErrors.leaveDays = 'Leave days cannot be negative';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
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
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter employee name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          aria-required="true"
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="position">Position</label>
        <input
          id="position"
          type="text"
          placeholder="Enter position"
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          aria-required="true"
          className={errors.position ? 'input-error' : ''}
        />
        {errors.position && <span className="error-message">{errors.position}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          aria-required="true"
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="performanceRating">Performance Rating (0-5)</label>
        <input
          id="performanceRating"
          type="number"
          step="0.1"
          min="0"
          max="5"
          placeholder="e.g., 4.5"
          value={formData.performanceRating}
          onChange={(e) => setFormData({ ...formData, performanceRating: e.target.value })}
          className={errors.performanceRating ? 'input-error' : ''}
        />
        {errors.performanceRating && <span className="error-message">{errors.performanceRating}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="performanceNote">Performance Note</label>
        <textarea
          id="performanceNote"
          placeholder="Enter performance notes"
          value={formData.performanceNote}
          onChange={(e) => setFormData({ ...formData, performanceNote: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="leaveDays">Leave Days</label>
        <input
          id="leaveDays"
          type="number"
          min="0"
          placeholder="Enter leave days"
          value={formData.leaveDays}
          onChange={(e) => setFormData({ ...formData, leaveDays: e.target.value })}
          className={errors.leaveDays ? 'input-error' : ''}
        />
        {errors.leaveDays && <span className="error-message">{errors.leaveDays}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="leaveStatus">Leave Status</label>
        <select
          id="leaveStatus"
          value={formData.leaveStatus}
          onChange={(e) => setFormData({ ...formData, leaveStatus: e.target.value })}
        >
          <option value="None">None</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <button type="submit" aria-label="Add Employee">Add Employee</button>
    </form>
  );
};

export default AddEmployeeForm;