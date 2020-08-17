import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UnderConstruction from '../UnderConstruction/UnderConstruction';
import NotFound from '../NotFound/NotFound';

const DashboardRouter = () => (
  <div>
    <Switch>
      <Route exact strict path="/dashboard" component={UnderConstruction} />
      <Route exact strict path="/dashboard/testing" component={UnderConstruction} />
      {/* Fallback Route */}
      <Route path="/dashboard" component={NotFound} />
    </Switch>
  </div>
);

export default DashboardRouter;
