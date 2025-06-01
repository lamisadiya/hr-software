import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LeaveManagement.css';

const LeaveManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [leaveType, setLeaveType] = useState('Sick');
  const [employeeId, setEmployeeId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/api/get_employees.php')
      .then(res => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setMessage('Failed to load employees.');
        setLoading(false);
      });
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!employeeId) newErrors.employeeId = 'Employee selection is required';
    if (!fromDate) newErrors.fromDate = 'From date is required';
    if (!toDate) newErrors.toDate = 'To date is required';
    else if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
      newErrors.toDate = 'To date must be after from date';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:8000/api/save_leave.php', {
        employee_id: employeeId,
        leave_type: leaveType,
        from_date: fromDate,
        to_date: toDate,
        reason
      });
      setMessage('Leave request submitted successfully.');
      setEmployeeId('');
      setLeaveType('Sick');
      setFromDate('');
      setToDate('');
      setReason('');
      setErrors({});
    } catch (err) {
      setMessage('Failed to submit leave request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="leave-container">
      <h2 className="leave-title">Leave Management</h2>
      {loading ? (
        <div className="spinner">Loading...</div>
      ) : (
        <form onSubmit={handleSubmit} className="leave-form">
          <div className="form-group">
            <label htmlFor="employee">Employee</label>
            <select
              id="employee"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              aria-required="true"
              className={errors.employeeId ? 'input-error' : ''}
            >
              <option value="">Select Employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
            {errors.employeeId && <span className="error-message">{errors.employeeId}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="leaveType">Leave Type</label>
            <select
              id="leaveType"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
            >
              <option value="Sick">Sick</option>
              <option value="Vacation">Vacation</option>
              <option value="Personal">Personal</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="fromDate">From Date</label>
            <input
              id="fromDate"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              aria-required="true"
              className={errors.fromDate ? 'input-error' : ''}
            />
            {errors.fromDate && <span className="error-message">{errors.fromDate}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="toDate">To Date</label>
            <input
              id="toDate"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              aria-required="true"
              className={errors.toDate ? 'input-error' : ''}
            />
            {errors.toDate && <span className="error-message">{errors.toDate}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="reason">Reason</label>
            <textarea
              id="reason"
              placeholder="Enter reason for leave"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <button
            type="submit"
            aria-label="Submit Leave Request"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Leave Request'}
          </button>
        </form>
      )}
      {message && <p className={`message ${message.includes('Failed') ? 'error' : 'success'}`}>{message}</p>}
    </div>
  );
};

export default LeaveManagement;