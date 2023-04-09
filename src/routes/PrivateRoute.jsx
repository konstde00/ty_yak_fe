import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import routes from './routes.json';
import PrivateRouteWrapper from '../components/wrappers/PrivateRouteWrapper/PrivateRouteWrapper';

const TOKEN = 'token'; // TODO change token

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = TOKEN;

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <PrivateRouteWrapper>
            <Component {...props} />
          </PrivateRouteWrapper>
        ) : (
          <Redirect to={routes.LOGIN_PAGE} />
        )
      }
    />
  );
};

export default PrivateRoute;
