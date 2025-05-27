import React from 'react';
import './Dashboard.css';
import Widget from './Widget';
import { FaUsers, FaFileAlt, FaCalendarCheck, FaUserPlus } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';

const Dashboard = () => {
  const data = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        label: 'Attendance',
        data: [80, 20],
        backgroundColor: ['#3b2659', '#b91e1c'],
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="widgets-row">
        <Widget title="Total Employees" value="56" icon={<FaUsers />} />
        <Widget title="Pending Leaves" value="4 Requests" icon={<FaFileAlt />} />
        <Widget title="Today's Attendance" value="80% Present" icon={<FaCalendarCheck />} />
        <Widget title="Quick Action" value="Add Employee" icon={<FaUserPlus />} />
      </div>

      <div className="chart-section">
        <h3>Attendance Overview</h3>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
