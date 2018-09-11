import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound';
import LandingPage from './components/LandingPage';

const App = () => (
  <Switch>
    <Route path="/" exact component={LandingPage} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default App;
