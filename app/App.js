import React, { Fragment } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import Admin from './containers/Admin';
import Auth from './containers/Auth';
import NotFound from './containers/NotFound';
import Notification from './containers/Notification';
import './style.scss';

export default () => (
  <Fragment>
    <Notification />
    <Switch>
      <Route exact path={'/'} component={Admin} />
      <Route path={'/admin'} component={Admin} />
      <Route path={'/auth'} component={Auth} />
      <Route component={NotFound} />
    </Switch>
  </Fragment>
);
