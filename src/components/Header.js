import React from 'react';
import './Header.css';
import { FaBell } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="header">
      <h1>Dashboard</h1>
      <div className="user-area">
        <FaBell className="bell" />
        <img src="https://i.pravatar.cc/40" alt="Profile" className="profile-pic" />
      </div>
    </header>
  );
};

export default Header;
