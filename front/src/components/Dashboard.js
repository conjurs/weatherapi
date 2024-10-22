import React from 'react';
import WeatherApp from './WeatherApp';
import TodoApp from './TodoApp';

const Dashboard = ({ token }) => {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <WeatherApp token={token} />
        <TodoApp token={token} />
      </div>
    </div>
  );
};

export default Dashboard;
