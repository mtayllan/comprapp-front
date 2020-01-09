import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated } from '../utils/storage';

const RouteWithLayout = (props) => {
  const {
    layout: Layout, component: Component, auth, ...rest
  } = props;

  if (auth && !isAuthenticated()) {
    return <Redirect to="/login" />;
  }

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.elementType.isRequired,
  layout: PropTypes.elementType.isRequired,
  auth: PropTypes.bool,
};

RouteWithLayout.defaultProps = {
  auth: false,
};

export default RouteWithLayout;
