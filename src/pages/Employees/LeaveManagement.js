import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LeaveManagement.css'; // Optional for styling


const LeaveManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [leaveType, setLeaveType] = useState('Sick');
  const [employeeId, setEmployeeId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');


  useEffect(() => {
    axios.get('http://localhost:8000/api/get_employees.php')
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/save_leave.php', {
      employee_id: employeeId,
      leave_type: leaveType,
      from_date: fromDate,
      to_date: toDate,
      reason
    })
    .then(() => setMessage('Leave request submitted.'))
    .catch(() => setMessage('Failed to submit leave request.'));
  };


  return (
    <div className="leave-container">
      <h2>Leave Management</h2>
      <form onSubmit={handleSubmit} className="leave-form">
        <label>Employee:</label>
        <select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required>
          <option value="">Select</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
          ))}
        </select>


        <label>Leave Type:</label>
        <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
          <option value="Sick">Sick</option>
          <option value="Vacation">Vacation</option>
          <option value="Personal">Personal</option>
        </select>


        <label>From Date:</label>
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />


        <label>To Date:</label>
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} required />


        <label>Reason:</label>
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} />


        <button type="submit">Submit Leave Request</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};


export default LeaveManagement;
