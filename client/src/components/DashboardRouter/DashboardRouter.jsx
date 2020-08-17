import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UnderConstruction from '../UnderConstruction/UnderConstruction';

const DashboardRouter = () => (
  <div>
    <Switch>
      <Route exact strict path="/dashboard" component={UnderConstruction} />
      <Route exact strict path="/dashboard/testing" component={UnderConstruction} />
      {/* Fallback Route */}
      <Route path="/dashboard" component={UnderConstruction} />
    </Switch>
  </div>
);

export default DashboardRouter;
