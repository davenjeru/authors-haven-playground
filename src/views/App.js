import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './NotFound/index';
import LandingPage from './LandingPage/index';
import SignUpPage from './SignUp/index';
import * as routes from '../routes';

const App = () => (
  <Switch>
    <Route path={routes.INDEX_ROUTE} exact component={LandingPage} />
    <Route path={routes.SIGN_UP_ROUTE} exact component={SignUpPage} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default App;
