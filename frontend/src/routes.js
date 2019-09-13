import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import SignUp from './pages/SignUp';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/signup" component={SignUp} />
      {/* <Route path="/cart" component={Cart} /> */}
    </Switch>
  );
}