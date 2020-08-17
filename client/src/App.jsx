import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
