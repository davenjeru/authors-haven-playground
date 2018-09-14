import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import LandingPage from './LandingPage';
import TestReduxPage from './TestReduxPage';

const App = () => (
  <Switch>
    <Route path="/" exact component={LandingPage} />
    <Route path="/redux" exact component={TestReduxPage} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default App;
