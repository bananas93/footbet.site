import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import Home from './views/Home';
import Matches from './views/Home';

import App from '../App';

export const renderRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/matches" component={Matches} />
      <Route component={App} />
    </Switch>
  </BrowserRouter>
);
