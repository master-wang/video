import React from 'react';
import { Switch } from 'react-router-dom';
import AuthRoute from './AuthRoute';

function Routes({
  routes = []
}) {
  return (
    <Switch>
      {
        routes.map(({
          id,
          exact = true,
          ...rest
        }) => <AuthRoute key={id} exact={exact} {...rest} />)
      }
    </Switch>
  );
}

export default Routes;
