import React, { useState } from 'react';
import EmployeeList from './EmployeeList';
import AddEmployeeForm from './AddEmployeeForm';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <div>
      <h2>Employee Management</h2>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Employee'}
      </button>
      {showForm && <AddEmployeeForm onAdd={handleAdd} />}
      <EmployeeList employees={employees} onDelete={handleDelete} />
    </div>
  );
};

export default Employees;
