/*import React from 'react';
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
*/

import React from 'react';
import './Dashboard.css';
import Widget from './Widget';
import { FaUsers, FaFileAlt, FaCalendarCheck, FaUserPlus } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Dashboard = () => {
  const attendanceData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        label: 'Attendance',
        data: [80, 20],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: "'Inter', sans-serif",
          },
        },
      },
      title: {
        display: true,
        text: 'Attendance Distribution',
        font: {
          size: 16,
          family: "'Inter', sans-serif",
        },
      },
    },
  };

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">HR Dashboard</h2>
      <div className="widgets-row">
        <Widget title="Total Employees" value="56" icon={<FaUsers />} />
        <Widget title="Pending Leaves" value="4 Requests" icon={<FaFileAlt />} />
        <Widget title="Today's Attendance" value="80% Present" icon={<FaCalendarCheck />} />
        <Widget title="Quick Action" value="Add Employee" icon={<FaUserPlus />} />
      </div>

      <div className="chart-section">
        <h3>Attendance Overview</h3>
        <Pie data={attendanceData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
