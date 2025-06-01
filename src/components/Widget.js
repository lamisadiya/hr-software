import React from 'react';
import './Widget.css';

const Widget = ({ title, value, icon }) => {
  return (
    <div className="widget">
      <div className="widget-icon">{icon}</div>
      <div className="widget-info">
        <h4>{title}</h4>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default Widget;