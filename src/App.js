import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Employees from './pages/Employees';
import Performance from './pages/Performance';
import Leaves from './pages/Leaves';
import Attendance from './pages/Attendance';
import Development from './pages/Development';
import Templates from './pages/Templates';
import Documents from './pages/Documents';
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
            <Route path="/performance" element={<Performance />} />
            <Route path="/leaves" element={<Leaves />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/development" element={<Development />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/documents" element={<Documents />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;
