import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { FaHome, FaUsers, FaChartLine, FaCalendarAlt, FaClipboardList, FaFileAlt, FaBook } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="logo">HR Portal</h2>
      <nav>
        <ul>
          <li><Link to="/"><FaHome /> Dashboard</Link></li>
          <li><Link to="/employees"><FaUsers /> Employees</Link></li>
          <li><Link to="employees/performance"><FaChartLine /> Performance</Link></li>
          <li><Link to="/employees/leave"><FaCalendarAlt /> Leave Management</Link></li>
          <li><Link to="/attendance"><FaClipboardList /> Time & Attendance</Link></li>
          <li><Link to="/development"><FaChartLine /> Development</Link></li>
          <li><Link to="/templates"><FaFileAlt /> Templates</Link></li>
          <li><Link to="/documents"><FaBook /> Documents</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
