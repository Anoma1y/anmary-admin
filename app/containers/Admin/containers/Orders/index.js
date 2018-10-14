import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Grid,
  CircularProgress
} from '@material-ui/core';
import List from './containers/List';
import Single from './containers/Single';
import './style.scss';

export default class User extends Component {

  state = {
    ready: true
  };

  renderLoader = () => <CircularProgress size={24} className={'admin_loading'} />;

  renderContent = () => (
    <Grid container className={'admin orders'}>
      <Switch>
        <Route exact path={`${this.props.match.url}`} component={List} />
        <Route exact path={`${this.props.match.url}/:id`} component={Single} />
      </Switch>
    </Grid>
  )

  render() {
    return this.state.ready ? this.renderContent() : this.renderLoader();
  }
}
