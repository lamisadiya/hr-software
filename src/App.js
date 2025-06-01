import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance/Attendance';
import Development from './pages/Professional/ProfessionalDevelopment';
import Templates from './pages/Templates/Templates';
import Documents from './pages/Documents/DocumentManagement';
import PerformanceTracking from './pages/Employees/PerformanceTracking';
import LeaveManagement from './pages/Employees/LeaveManagement';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  
import './App.css';
function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/development" element={<Development />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/employees/performance" element={<PerformanceTracking />} />
            <Route path="/employees/leave" element={<LeaveManagement />} />

          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </main>
      </div>
    </Router>
  );
}
export default App;
