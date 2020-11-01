import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import UnderConstruction from '../UnderConstruction/UnderConstruction';
import DashboardComponentRoutes from './DashboardComponentRoutes';

const DashboardRouter = () => (
  <div>
    <Switch>
      <Route exact strict path="/dashboard" component={UnderConstruction} />
      {
        DashboardComponentRoutes.map((item) => (<Route exact strict path={`/dashboard/${item.key}`} component={item.component} key={item.key} />))
      }
      <Route path="*" component={NotFound} />
    </Switch>
  </div>
);

export default DashboardRouter;
