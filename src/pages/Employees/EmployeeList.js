import React, { useState } from 'react';
import './EmployeeList.css';

const EmployeeList = ({ employees, onDelete }) => {
  const [activeTab, setActiveTab] = useState(null);

  const toggleTab = (id) => {
    setActiveTab(activeTab === id ? null : id);
  };

  return (
    <div className="employee-list-container">
      <h2 className="employee-list-title">Employee List</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-data">No employees available</td>
            </tr>
          ) : (
            employees.map(emp => (
              <React.Fragment key={emp.id}>
                <tr className="employee-row">
                  <td>{emp.name}</td>
                  <td>{emp.position}</td>
                  <td>{emp.email}</td>
                  <td>
                    <button
                      className="action-btn view-btn"
                      onClick={() => toggleTab(emp.id)}
                      aria-label={activeTab === emp.id ? `Hide details for ${emp.name}` : `View details for ${emp.name}`}
                    >
                      {activeTab === emp.id ? 'Hide' : 'View More'}
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => onDelete(emp.id)}
                      aria-label={`Delete employee ${emp.name}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>

                {activeTab === emp.id && (
                  <tr className="details-row">
                    <td colSpan="4">
                      <div className="details-content">
                        <div className="details-section">
                          <h4>Performance</h4>
                          <p><strong>Rating:</strong> {emp.performanceRating || 'Not set'}</p>
                          <p><strong>Note:</strong> {emp.performanceNote || 'No notes yet'}</p>
                        </div>
                        <div className="details-section">
                          <h4>Leave</h4>
                          <p><strong>Available:</strong> {emp.leaveDays ?? 14} days</p>
                          <p><strong>Status:</strong> {emp.leaveStatus || 'None'}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;