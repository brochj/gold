import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import ShowRecipe from '../pages/ShowRecipe';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/recipes/:id" component={ShowRecipe} isPrivate />

      <Route path="/" component={() => <h1>404 Page Not Found</h1>} />
    </Switch>
  );
}
