import React from 'react';
import { Route } from 'react-router-dom';
import UnderConstruction from '../UnderConstruction/UnderConstruction';

const DashboardRouter = () => (
  <div>
    <Route exact strict path="/dashboard" component={UnderConstruction} />
    <Route exact strict path="/dashboard/testing" component={UnderConstruction} />
  </div>
);

export default DashboardRouter;
