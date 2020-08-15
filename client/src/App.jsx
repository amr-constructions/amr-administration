import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';

function App() {
  return (
    <div className="App">
      <Login />
      <Dashboard />
    </div>
  );
}

export default App;
