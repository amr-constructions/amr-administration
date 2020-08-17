import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="*" component={() => '404 NOT FOUND'} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
