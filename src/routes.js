import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import Login from './pages/Login';

export default function routes() {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/login" exact component={Login} />
    </Switch>
  );
}
