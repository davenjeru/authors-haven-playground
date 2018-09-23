import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import LandingPage from './LandingPage';
import SignUp from './SignUp';
import * as routes from '../routes';

const App = () => (
  <Switch>
    <Route path={routes.INDEX_ROUTE} exact component={LandingPage} />
    <Route path={routes.SIGN_UP_ROUTE} exact component={SignUp} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default App;
