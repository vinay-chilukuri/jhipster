import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Customers from './customers';
import CustomersDetail from './customers-detail';
import CustomersUpdate from './customers-update';
import CustomersDeleteDialog from './customers-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CustomersUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CustomersUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CustomersDetail} />
      <ErrorBoundaryRoute path={match.url} component={Customers} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CustomersDeleteDialog} />
  </>
);

export default Routes;
