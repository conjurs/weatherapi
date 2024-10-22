import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <div className="app">
      {!token ? <Login setToken={setToken} /> : <Dashboard token={token} />}
    </div>
  );
};

export default App;
