import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import LandingPage from './LandingPage';
import SignUp from './SignUp';

const App = () => (
  <Switch>
    <Route path="/" exact component={LandingPage} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default App;
