/*import React from 'react';
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

export default Sidebar; */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { FaHome, FaUsers, FaChartLine, FaCalendarAlt, FaClipboardList, FaFileAlt, FaBook, FaBars } from 'react-icons/fa';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h2 className="logo">{isCollapsed ? 'HR' : 'HR Portal'}</h2>
        <FaBars className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)} />
      </div>
      <nav>
        <ul>
          <li><Link to="/"><FaHome /> {!isCollapsed && 'Dashboard'}</Link></li>
          <li><Link to="/employees"><FaUsers /> {!isCollapsed && 'Employees'}</Link></li>
          <li><Link to="employees/performance"><FaChartLine /> {!isCollapsed && 'Performance'}</Link></li>
          <li><Link to="/employees/leave"><FaCalendarAlt /> {!isCollapsed && 'Leave Management'}</Link></li>
          <li><Link to="/attendance"><FaClipboardList /> {!isCollapsed && 'Time & Attendance'}</Link></li>
          <li><Link to="/development"><FaChartLine /> {!isCollapsed && 'Development'}</Link></li>
          <li><Link to="/templates"><FaFileAlt /> {!isCollapsed && 'Templates'}</Link></li>
          <li><Link to="/documents"><FaBook /> {!isCollapsed && 'Documents'}</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;