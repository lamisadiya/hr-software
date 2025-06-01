import React, { useState } from 'react';
import './EmployeeList.css'; // Optional for styling

const EmployeeList = ({ employees, onDelete }) => {
  const [activeTab, setActiveTab] = useState(null);

  const toggleTab = (id) => {
    setActiveTab(activeTab === id ? null : id);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Position</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <React.Fragment key={emp.id}>
              <tr>
                <td>{emp.name}</td>
                <td>{emp.position}</td>
                <td>{emp.email}</td>
                <td>
                  <button onClick={() => toggleTab(emp.id)}>
                    {activeTab === emp.id ? 'Hide' : 'View More'}
                  </button>
                  <button onClick={() => onDelete(emp.id)}>Delete</button>
                </td>
              </tr>

              {activeTab === emp.id && (
                <tr>
                  <td colSpan="4">
                    <strong>Performance:</strong>
                    <p>Rating: {emp.performanceRating || 'Not set'}</p>
                    <p>Note: {emp.performanceNote || 'No notes yet'}</p>
                    
                    <strong>Leave:</strong>
                    <p>Available: {emp.leaveDays ?? 14} days</p>
                    <p>Status: {emp.leaveStatus || 'None'}</p>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EmployeeList;
