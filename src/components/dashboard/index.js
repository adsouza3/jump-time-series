import React from 'react';

import Controls from './controls';
import Stats from './stats';

import './styles.css';

export const Dashboard = () => {

  return <div className="dashboard-container">
    <Stats />
    <Controls />
  </div>;
};

export default Dashboard;