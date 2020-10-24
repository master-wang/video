import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function AuthRoute({
  path,
  redirect,
  exact = true,
  component: Comp,
  routes = []
}) {
  return (
    redirect
      ? <Redirect exact={exact} from={path} to={redirect} />
      : <Route
        exact={exact}
        path={path}
        render={(props) => {
          if (Comp) {
            return <Comp {...props} routes={routes} />;
          }
        }}
      />
  );
}

export default AuthRoute;
