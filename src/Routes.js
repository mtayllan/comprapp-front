import React from 'react';
import { Switch } from 'react-router-dom';

import { Main as MainLayout, Minimal as MinimalLayout, RouteWithLayout } from './layouts';

// Pages
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import AdminsPage from './pages/Admins';

export default function Routes() {
  return (
    <Switch>
      <RouteWithLayout
        component={HomePage}
        exact
        layout={MainLayout}
        path="/"
        auth
      />
      <RouteWithLayout
        component={AdminsPage}
        exact
        layout={MainLayout}
        path="/admins"
        auth
      />
      <RouteWithLayout
        component={LoginPage}
        exact
        layout={MinimalLayout}
        path="/login"
      />
    </Switch>
  );
}
